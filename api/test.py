import requests

Base = "http://127.0.0.1:5000"



# Send GET request
response = requests.get(Base + "/Lukas")
print(response.text)

# Send PUT request
response = requests.put(Base + "/Lukas", json={"Brukernavn": "Alvar" ,"Passord": "Henriko"})
print(response.json())  