"use client"
import Link from "next/link"

// Create a new instance of Blob with position { x: 10, y: 20 }
export default function spill(){

    return (
        <div className="flex w-screen h-screen bg-white align items-center justify-center">

           <div className="flex text-2xl w-3/6 mt-3 items-center justify-center flex-col p-10 border-blue-500 border-4 rounded-xl" >

             <p className=" text-3xl pb-10  font-bold">Hvordan spille Agario</p>
             <p>I Agario spiller du som en blob som har lyst til å vokse mest mulig <br /> For å bli større må du spise mindre blobber <br /> For å spise en annen blob må din blobb kjøre over en annen blob <br /> Blobber som er større enn din blob vil spise deg hvis du kommer for nærme <br /> <br />Du kan også splitte din blob i to <br /> Dette vil gjøre at du styrer to mindre blobber istedet</p>
             <h1 className=" text-2xl pt-16 font-bold"> Controls</h1>
             <p>Movement: WASD</p>
             <p>Split: Space</p>
             <Link href="/spill" className='bg-blue-500 w-fit rounded-lg p-2 mt-10 text-2xl text-white mb-5 hover:bg-blue-700'>Tilbake</Link>
             </div>



        </div>


    )
}