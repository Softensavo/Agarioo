"use client"
import { useEffect, useState } from "react";


export default function Start() {


  const [data, setData] = useState<string>("");
  const [brukernavn, setBrukernavn] = useState<string>("");
  const [passord, setPassord] = useState<string>("");
  const [loggetinn, setLoggetInn] = useState<boolean>(false);
  const [likbruker, setLikBruker] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);
// Hello from Preben :)
  function fetchData() {
    fetch(`http://127.0.0.1:5000/${brukernavn}`)
      .then(response => response.text())
      .then(text => {
        setData(text);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  console.log(data);

  return (
    <div>
      Hello
    </div>
  );
}
