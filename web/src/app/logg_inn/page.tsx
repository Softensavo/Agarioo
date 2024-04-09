"use client"
import { error } from "console";
import { useEffect, useState } from "react"
import { text } from "stream/consumers";



export default function Registrer() {
  const [data, setData] = useState<string>("");
  const [Brukernavn, setBrukernavn] = useState<string>("");
  const [Passord, setPassord] = useState<string>("");
  const [feilpassord, setFeilPassord] = useState<boolean>(false);
  let navn = ""

  const jwt = require("jsonwebtoken")

  
  function saveTokenToLocalStorage(token:string) {
    localStorage.setItem('token', token);
}
  
  
  function gettoken(){
    return localStorage.getItem("token")
  }

  function tokencheck(token:string) {
    try {
        const decodedToken = jwt.decode(token, { complete: true });

        if (!decodedToken) {
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error decoding token:', error);
        return false;
    }
} // Hello from Preben :)

  function logout(){
    localStorage.removeItem("token");
  }
  

  useEffect(() => {
    const token = gettoken();
    if (token && tokencheck(token)) {
      console.log("du har logget inn fra før av");


    } else {
      console.log("ikke logget inn");
      console.log(token)
    }
  }, []);

  
  
  function getsom() {
    const req = {
        method: "GET",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({  
            Brukernavn: Brukernavn,
            Passord: Passord,
        })
    }
    fetch(`http://127.0.0.1:5000/${Brukernavn}`)
        .then(response => response.text())
        .then(text =>{
            setData(text)})
            console.log(data)
    return "you logged in!!";
  }
  function putsom() {
    // Simple PUT request with a JSON body using fetch
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({Brukernavn: Brukernavn, Passord: Passord})
        
    };
    fetch('http://127.0.0.1:5000/logginn', requestOptions)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        navn = json["navn"]
      
        if (json["message"] == "wrong"){
            setFeilPassord(true)
        }
        else if(json["message"] == "brukeren finnes ikke"){
          alert("brukeren finnes ikke")
          setFeilPassord(false)
          setBrukernavn("")
          setPassord("")
        }
        else if(json["message"] == "yay nå har du logget inn!!!"){
          console.log(navn)
          alert(`hei ${navn} `)
            setFeilPassord(false)
            saveTokenToLocalStorage(json["token"])
            console.log("boom",json["token"])
            console.log(localStorage.getItem("token"))
        }
        else{
          alert("noe gikk galt")
        }
      })
    }
function fetchData() {
  const token = localStorage.getItem('token'); 
  if (token) {
    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` } // Include token in the request headers
    };

    fetch('http://example.com/protected_route', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
    } else {
    // Handle case where token is not found (user is not logged in)
    }

  }

 

  return (
    <div className='bg-whitesmoke w-screen h-screen flex justify-center items-center flex-col'>
    <div className="bg-white rounded-lg w-2/6 h-3/6 flex justify-center items-center flex-col text-2xl">
  <div className=" mb-10">
    <p className=" flex justify-start items-start">Navn</p>
    <input type="text" className="bg-blue-500 rounded-sm text-white pl-2" value={Brukernavn} onChange={event => setBrukernavn(event.target.value)}/> 
    </div>
    <div className="mb-10">
    <p>Passord</p>
    <input type="password" className="bg-blue-500 rounded-sm text-white pl-2" value={Passord} onChange={event => setPassord(event.target.value)}/>
    { feilpassord && <p id="feilpass" className="text-red-700"> Feil passord, prøv igjen</p> }
    
    </div>
    <button onClick={() => putsom()}> Logg inn</button>
    </div>
  </div>
  )


  }
