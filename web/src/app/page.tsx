import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    // Hello from Preben :)
    <div className='bg-whitesmoke w-screen h-screen flex justify-center items-center flex-col '> 
      <Link href="/logg_inn" className='bg-blue-500 w-fit rounded-lg p-5 text-5xl text-white mb-5 hover:bg-blue-700'>Logg inn</Link> 
      <Link href="/registrer" className='bg-blue-500 w-fit rounded-lg p-5 text-5xl text-white mb-5 hover:bg-blue-700'>Registrer deg</Link>
    </div>
  )
}
