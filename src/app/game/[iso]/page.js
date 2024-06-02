import Container from '@/components/Container';
import Header from '@/components/Header';
import Image from 'next/image';
import Link from 'next/link';

import { TbCategory } from "react-icons/tb";
import { LuGamepad } from "react-icons/lu";
import { FaFile } from "react-icons/fa6";
import { MdFileDownload } from "react-icons/md";


export default async function Game({ params }) { 
  

  const getgame = async iso =>
  {
      let res = await fetch(`${process.env.BASE_URL}/api/list/item`, {
        method: 'post',
        body: JSON.stringify(iso),
        headers: { "Content-Type": "application/json" }
      });

      let result = await res.json();
      return result;
  }

  let data = await getgame(params.iso);
  let jogo = data.games;
  
  
  

  return (
    <Container>
      <Header auth={false} />
      <main>
       
       {jogo.map((gm => (
        <div key={gm.id} className='flex gap-2 p-2 max-sm:flex-col'>
          <Image src={gm.capa} height={300} width={300}></Image>
          <div className='flex text-white flex-grow flex-col gap-2 p-2'>
            <h2 className=' tracking-wide'>{gm.titulo}</h2>
            <p>{gm.descricao}</p>
            <div className='flex flex-col gap-1'>
              <p className='m-0 flex items-center gap-1'> <LuGamepad fontSize={20} color='green'/> Platafoma: {gm.plataforma}</p>
              <p className='m-0 flex items-center gap-1'> <TbCategory fontSize={20} color='green'/> Categoria: {gm.categoria}</p>
              <p className='m-0 flex items-center gap-1'> <MdFileDownload fontSize={20} color='green'/> Tamanho: {gm.tamanho}GB</p>
              <p className='m-0 flex items-center gap-1'> <FaFile fontSize={20} color='green'/> Formato: {gm.formato}</p>
            </div>
            <Link className='p-2 mt-4 bg-green-500 rounded-md no-underline text-white w-32 text-center' href={gm.download}>Download</Link>
          </div>
        </div>
       )))}
        
      </main>
    </Container>
  );
}