import Container from '@/components/Container'
import Header from '@/components/Header'
import ListGame from '@/components/ListGame';

export default async function Home() {

  try
  {  
    
    async function loadGame() {

      let res = await fetch('https://word-games-seven.vercel.app/api/list/all', {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
      });
  
      let result = await res.json();
      return result;
    }
    
    const data = await loadGame();
  }
  catch(error)
  { 
    console.log('Falha na fecth')
  }
  
 

  return (
    <Container>
      <Header auth={false}/>
      {data && (<ListGame games={data.games}></ListGame>)}
    </Container>
  )
}
