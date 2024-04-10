from flask import Flask, request, jsonify, Response
from flask_restful import Api, Resource, reqparse, abort
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from typing import Callable
import mariadb
import sys
from mariadb import Cursor


app = Flask(__name__)
api = Api(app)
bcrypt = Bcrypt(app)
CORS(app)

app.config["JWT_SECRET_KEY"] = "super-secret"
app.config["JWT_ALGORITHM"] = "HS256"
jwt = JWTManager(app)


# Connect to MariaDB Platforms
try:
    conn = mariadb.connect(     
        user="root",
        password="Lukasnoob",
        host="localhost",
        port=3306,
        database="brukernettside"

    )
except mariadb.Error as e:
    print(f"Error connecting to MariaDB Platform: {e}")
    sys.exit(1)
cur = conn.cursor()

@app.route('/highscore', methods=['GET'])
def highscore():
    try:
        bruker = request.args.get("bruker")
        print("bruker",bruker)
        cur.execute(
            "SELECT Highscore FROM brukere WHERE Brukernavn=(?);",(bruker,)
        )
        data = cur.fetchone()
        if data:
            highscore = data[0]
            return {"highscore":highscore, "melding":"highscore funnet"}
        else:
            print("data",data)
            return {"melding": "fant ikke highscore"}
    except mariadb.Error as e:
        print("feil under henting av highscore",e)
        return {"melding": "Noe gikk galt"}



@app.route('/add_user', methods=['PUT','GET'])
def finninfoomnavn(navn):
    try:
        cur.execute(
            "select * from brukere where brukernavn=(?);", (navn,))
        brukerdata = cur.fetchone()
        if brukerdata:
            return (f"Uid: {brukerdata[0]}, Brukernavn: {brukerdata[1]}, Passord: {brukerdata[2]}")
        else:
            print("feil")
        
    except mariadb.Error as e:
        print(f"Error fetching {e}")
        sys.exit(1)
    
    return "well fuck 404"


@app.route('/logginn', methods=['PUT'])
def login():
    data = request.json
    username = data.get("Brukernavn")
    passord = data.get("Passord")
    print("data: ", data)
    try:
        cur.execute(
            "select * from brukere where brukernavn=(?)", [data["Brukernavn"]])
        brukerdata = cur.fetchone()
        if brukerdata:
            hashed_password = brukerdata[2]
            if bcrypt.check_password_hash(hashed_password,passord):
                access_token = create_access_token(identity=username)
                print(access_token,"yay")
                return {"token":access_token,"message":"yay nå har du logget inn!!!","navn": username }
            else:
                print(f"feil_passord data {hashed_password} og database{brukerdata[2]}")
                return {"message": "wrong"}
        else:
           print("finner ikke brukeren")
           return {"message":"brukeren finnes ikke"}
    except mariadb.Error as e:
        print(f"shit {e}")

    return "well fuck 404"
@app.route('/protected_route', methods=['GET'])
@jwt_required() 
def protected():
    print("BAOMBAAOCMAVBOASODJAKCMO")
    current_user = get_jwt_identity()
    print(current_user)
    return jsonify(bruker=current_user), 200


def legginnbrukere():
    try:  
        data = request.get_json()
        print("data:", data)
        username = data.get('Brukernavn')
        password = data.get('Passord')
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        print("Brukernavn:", username)
        cur.execute("SELECT Brukernavn FROM brukere WHERE Brukernavn = ?;", (username,))
        print("brukernavn check")
        if len(cur.fetchall()) > 0: 
            print("samme brukernavn")
            return {"message": "Allerede i bruk"}
        else:      
            cur.execute("INSERT INTO brukere (Brukernavn, Passord) VALUES (?, ?);", (username, hashed_password))
            conn.commit()
            return {"message": "Bruker lagt til"}
    
    except mariadb.Error as e:
        print("error")
        return {"message": (f"Feil: {str(e)}")}, 500

navn_req = reqparse.RequestParser()
navn_req.add_argument("Passord", type=str, help="Passordet ditt er nodvendig    ")

navn = {}

class Helloworld(Resource):
    def get(self,name):
        print("navnet",name)
        brukerinfo = finninfoomnavn(name)
        print ("brukerinfo",brukerinfo)
        return brukerinfo
    

    def put(self, name):
        print("Put")
        result = legginnbrukere()
        return result, 201


api.add_resource(Helloworld, "/" + "<string:name>")

if __name__ == "__main__":
    app.run(debug=True)
    conn.close()

