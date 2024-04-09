"use client"
import { error } from "console";
import { useState,useEffect } from "react"
import { json } from "stream/consumers";

export default function agario(){
    const [highscore,setHighscore] = useState<string>("")
    const [username,setUsername] = useState<string>("")
    
    async function getuser() {
        const token = localStorage.getItem('token');
        console.log(token)
        if (token) {
            return fetch(`http://127.0.0.1:5000/protected_route`, {
                    method: "GET",
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                .then(response => response.json())
                .then(json => {
                    console.log("helo", json)
                    console.log("bruker", json["bruker"])
                    return json["bruker"]
                })
                .catch(error => {
                    console.log("error", error)
                    return "feil"
                })
        }
    }
    
    async function gethighscore() {
        try {
            const bruker = await getuser(); // Wait for the user to be retrieved
            console.log("shoom", bruker);
            const req = {
                method: "GET",
                headers: { "content-type": "application/string" }
            };
            const response = await fetch(`http://127.0.0.1:5000/highscore?username=${bruker}`, req);
            const data = await response.json();
            console.log(data); // Log the fetched data
            if (data && data.melding === "no") {
                setHighscore(data.highscore); // Update the high score state
            } else {
                console.log("User not found or other error occurred:", data.melding);
            }
        } catch (error) {
            console.error('Error fetching highscore:', error);
        }
    }
    
    useEffect(()=>{
        gethighscore()

    },[]);



    
    


    return(
        <div className="flex h-screen w-screen bg-white items-center justify-center">
            <canvas className="w-4/6 h-4/6 border-black border-lg border-4">
            </canvas>
            <div className="h-2/6 w/6 p-4">
                <p>Highscore:</p>
                <p>{highscore}</p>
            </div>
 
        </div>

    )
}