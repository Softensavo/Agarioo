"use client"
import { error } from "console";
import { useEffect, useState } from "react"
import { text } from "stream/consumers";
import Link from "next/link";

export default function Registrer() {
  const [data, setData] = useState<string>("");

  const [brukernavn, setBrukernavn] = useState<string>("");
  const [passord, setPassord] = useState<string>("");
  const [loggetinn, setLoggetInn] = useState<boolean>(false);
  const [likbruker, setLikBruker] = useState<boolean>(false);


  function getsom() {
    const requestOptions = {
      method: "GET",
      headers: {"content-Type": "application/json"},
      body: JSON.stringify(brukernavn)
    }
    fetch("http://127.0.0.1:5000/",requestOptions)
      .then(response => response.text())
      .then(text => {
        setData(text
);
      })
      return data
  }
// Hello from Preben :)
  function putsom() {
    // Simple PUT request with a JSON body using fetch
    if (brukernavn == ""){
      alert("Brukernavn må skrives")
    }
    if (passord == ""){
      alert("Passord må skrives")
    }

    if (likbruker == false){
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({Brukernavn: brukernavn, Passord: passord})
    };
      fetch('http://127.0.0.1:5000/lukas', requestOptions)
        .then(response => response.json())
        .then(json => {
          console.log(json["message"])
        })
        setBrukernavn("")
        setPassord("")
        setLoggetInn(true)
        }
    

}
  return (
    <div className='bg-whitesmoke w-screen h-screen flex justify-center items-center flex-col'>
     {!loggetinn ? (
        <div className="bg-white rounded-lg w-2/6 h-3/6 flex justify-center items-center flex-col text-2xl">
          {/* Your existing registration form */}
          <div className=" mb-10">
            <p className=" flex justify-start items-start">Navn</p>
            <input
              type="text"
              className="bg-blue-500 rounded-sm text-white pl-2"
              id="navn"
              value={brukernavn}
              onChange={(event) => setBrukernavn(event.target.value)}
            />
          </div>
          <div className="mb-10">
            <p>Passord</p>
            <input
              type="password"
              className="bg-blue-500 rounded-sm text-white pl-2"
              id="passord"
              value={passord}
              onChange={(event) => setPassord(event.target.value)}
            />
          </div>
          <button onClick={() => putsom()}>Registrer</button>
        </div>
      ) : (
        <div>
          {/* Your logged-in content */}
          <Link href="/logg_inn" className='bg-blue-500 w-fit rounded-lg p-5 text-5xl text-white mb-5 hover:bg-blue-700'>Logg Inn</Link>
        </div>
      )}
    </div>
    
  )
}
