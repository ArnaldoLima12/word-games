import Container from '@/components/Container';
import Header from '@/components/Header';
import Image from 'next/image';
import Link from 'next/link';


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
        <div key={gm.id} className='border border-white flex gap-2 p-2'>
          <Image src={gm.capa} height={350} width={350}></Image>
          <div className='flex border border-red-500 text-white flex-grow flex-col gap-2 p-2'>
            <h2>{gm.titulo}</h2>
            <p>{gm.descricao}</p>
            <p>Platafoma: {gm.plataforma}</p>
            <p>Categoria: {gm.categoria}</p>
            <Link className='p-2 bg-green-500 rounded-md no-underline text-white w-32 text-center' href={gm.download}>Download</Link>
          </div>
        </div>
       )))}
        
      </main>
    </Container>
  );
}