"use client"
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { json } from "stream/consumers";
import { error } from "console";

function AgarioSpill() {
    const canvasRef = useRef(null);
    const [position, setPosition] = useState({ x: 100, y: 100 });

    useEffect(function canvasstartup(){
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        function drawCircle() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(position.x, position.y, 10, 0, 2 * Math.PI);
            ctx.fill();
        }
        function handleKey(event){
            switch (event.key){
                case "ArrowUp":
                    setPosition(prevPosition => {
                        return {
                          x: prevPosition.x,
                          y: prevPosition.y - 5 
                        };
                      });
                    break;
                case "ArrowDown":
                    setPosition(prevPosition => {
                        return {
                          x: prevPosition.x, 
                          y: prevPosition.y + 5
                        };
                      });
                    break;
                case "ArrowLeft":
                    setPosition(prevPosition => {
                        return {
                          x: prevPosition.x -5,
                          y: prevPosition.y  
                        };
                      });
                    break;
                case "ArrowRight":
                    setPosition(prevPosition => {
                        return {
                          x: prevPosition.x + 5,
                          y: prevPosition.y
                        };
                      });
                    break;
                default:
                    break;
            }
        }
        drawCircle();
        window.addEventListener("keydown",handleKey);

        return function cleanup(){
            window.removeEventListener("keydown",handleKey)
        }

    }, [position]);

    return <canvas ref={canvasRef} className="w-4/6 h-4/6 border-black border-lg border-4"></canvas>;
}

export default function Agario() {
    const [highscore,SetHighscore] = useState<string>("")

    useEffect(()=>{
        henthighscore()
    },[])

    async function henthighscore(){
        const bruker = await finnbruker()
        console.log(bruker)
        const req = {
            method:'GET',
            headers:{'Content-Type': 'application/json'}

        }
        fetch(`http://127.0.0.1:5000/highscore?bruker=${bruker}`)
        .then(response => response.json())
        .then(json =>{
            console.log("helo",json)
            SetHighscore(json["highscore"])
        })

    }
    function finnbruker() {
        const token = localStorage.getItem("token");
        console.log(token);
    
        return fetch("http://127.0.0.1:5000/protected_route", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            return json["bruker"];
        });
    }
    



    return (
        <div className="flex h-screen w-screen bg-white items-center justify-center">
            <AgarioSpill />
            <div className="flex flex-col items-center">
            <div className=" p-4">
                <p className="text-xl">Highscore:</p>
                <p className="text-xl">{highscore}</p>
            </div>
            <Link href="/Spilltutorial" className='bg-blue-500 w-fit rounded-lg p-2 text-2xl text-white mb-5 hover:bg-blue-700'>Tutorial</Link>
            </div>
        </div>
    );
}
