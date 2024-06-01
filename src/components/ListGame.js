'use client'
import Link from "next/link";

export default function ListGame({ games }) {

    return (
       
        <main className="flex gap-2 flex-grow p-3 flex-wrap border border-white justify-center">
            {games ? (games.map( game => (
              <div key={game.id} className="relative h-fit flex max-w-[22rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg ">
                
                <div className="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40 flex justify-center">
                    <img src={game.capa} alt={game.titulo} className="w-3/4"/>
                </div>

                <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                    <h5 className="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                       {game.titulo}
                    </h5>
                    
                    </div>
                    <p className="block font-sans text-sm antialiased font-light leading-relaxed text-gray-700">
                       {game.descricao} 
                    </p>
                </div>

                <div className="p-6 pt-1">
                    <Link href={`/game/${game.iso}`}
                    className=" no-underline block w-full select-none rounded-lg bg-green-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                    Download
                    </Link>
                </div>
            </div> 
            ))) : (<h2>Indisponivel</h2>)}
            
        </main>
    )
}
