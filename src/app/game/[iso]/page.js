import Container from '@/components/Container';
import Header from '@/components/Header';
import Image from 'next/image';
import Link from 'next/link';
import { exchangeNpssoForCode, exchangeCodeForAccessToken, getTitleTrophies } from 'psn-api';

import { TbCategory } from "react-icons/tb";
import { LuGamepad } from "react-icons/lu";
import { FaFile } from "react-icons/fa6";
import { MdFileDownload } from "react-icons/md";

export default async function Game({ params }) { 
  
  const npsso = process.env.PSN;

  const accessCode = await exchangeNpssoForCode(npsso);

  const authorization = await exchangeCodeForAccessToken(accessCode);

  const splitIso = (iso) => {
    
    if(iso.includes('-'))
    {
        const [part1, part2] = iso.split('-');
        return [part1, part2];
    }
    else
    {
      return iso;
    }
  } 

  const getgame = async iso => {

      const gameRequest = fetch(`${process.env.BASE_URL}/api/list/item`, {
        method: 'post',
        body: JSON.stringify(iso),
        headers: { "Content-Type": "application/json" }
      });

      const split = splitIso(iso);

      if(Array.isArray(split))
      {
          const trophiesRequest1 = getTitleTrophies(authorization, split[0], 'all', { npServiceName: 'trophy' });
          const trophiesRequest2 = getTitleTrophies(authorization, split[1], 'all', { npServiceName: 'trophy' });
          const [gameResponse, trophiesResponse1, trophiesResponse2] = await Promise.all([gameRequest, trophiesRequest1, trophiesRequest2]);
          const gameData = await gameResponse.json();
          return { gameData, trophiesData: [...trophiesResponse1.trophies, ...trophiesResponse2.trophies] };

      }
      else
      {
          const trophiesRequest = getTitleTrophies(authorization, iso, 'all', { npServiceName: 'trophy' });
          const [gameResponse, trophiesResponse] = await Promise.all([gameRequest, trophiesRequest]);
          const gameData = await gameResponse.json();
          return { gameData, trophiesData: trophiesResponse.trophies};
      }
  };



  let { gameData, trophiesData } = await getgame(params.iso);
  let trophies = trophiesData;
  let jogo = gameData.games;

  return (
    <Container>
      <Header auth={false} />
      <main>
        {jogo.map(gm => (
          <div key={gm.id} className='flex gap-2 p-2 pb-3 max-sm:flex-col border-b border-white'>
            <Image src={gm.capa} height={300} width={300}></Image>
            <div className='flex text-white flex-grow flex-col gap-2 p-2'>
              <h2 className=' tracking-wide'>{gm.titulo}</h2>
              <p>{gm.descricao}</p>
              <div className='flex flex-col gap-1'>
                <p className='m-0 flex items-center gap-1'>
                  <LuGamepad fontSize={20} color='green'/> Platafoma: {gm.plataforma}
                </p>
                <p className='m-0 flex items-center gap-1'>
                  <TbCategory fontSize={20} color='green'/> Categoria: {gm.nome}
                </p>
                <p className='m-0 flex items-center gap-1'>
                  <MdFileDownload fontSize={20} color='green'/> Tamanho: {gm.tamanho}GB
                </p>
                <p className='m-0 flex items-center gap-1'>
                  <FaFile fontSize={20} color='green'/> Formato: {gm.formato}
                </p>
              </div>
              <Link className='p-2 mt-4 bg-green-500 rounded-md no-underline text-white w-32 text-center' href={gm.download}>Download</Link>
            </div>
          </div>
        ))}

        <div className='mt-2 p-2 flex flex-col gap-2 max-w-2xl m-auto'>
          <h2 className='text-white'>Troféus</h2>
          {trophies.map( trophie => (
            <div key={trophie.trophyId} className='flex flex-col gap-1 items-start border p-1 rounded-sm'>
              <div className='flex items-center w-full justify-between'>
                <div className='flex items-center gap-2'>
                  <Image src={trophie.trophyIconUrl} width={40} height={40}></Image>
                  <span className='text-white m-0'>{trophie.trophyName}</span>
                </div> 

                
                {(() => {
                    switch (trophie.trophyType) {
                      case 'gold':
                        return <Image className='mr-2' src={'/ouro.png'} width={30} height={30} alt='ouro'></Image>;
                      case 'silver':
                        return <Image className='mr-2' src={'/prata.png'} width={30} height={30} alt='prata'></Image>;
                      case 'bronze':
                        return <Image className='mr-2' src={'/bronze.png'} width={30} height={30} alt='bronze'></Image>;
                      case 'platinum':
                        return <Image className='mr-2' src={'/favicon.png'} width={30} height={30} alt='platina'></Image>;
                      default:
                        return <div className='unknown-trophy '></div>;
                    }
                  })()}
                
              </div>
              <p className='text-green-300'>{trophie.trophyDetail}</p>
            </div>
          ))}
        </div>
      </main>
    </Container>
  );
}
