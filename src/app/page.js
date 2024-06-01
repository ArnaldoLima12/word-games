import Container from '@/components/Container'
import Header from '@/components/Header'
import ListGame from '@/components/ListGame';

export default async function Home() {

    async function loadGame() {
      try {

          let res = await fetch('https://word-games-seven.vercel.app/api/list/all', {
              method: 'GET',
              headers: { "Content-Type": "application/json" }
          });
  
          if (!res.ok) {
              console.log('Failed to fetch data');
              return null;
          }
  
          let result = await res.json();
          return result;
      } 
      catch (error) 
      {
          console.error('Error fetching data:', error);
          return null; // ou lance um novo erro se preferir
      }
  }
  
  const data = await loadGame();

  return (
    <Container>
      <Header auth={false}/>
      {data && (<ListGame games={data.games}></ListGame>)}
    </Container>
  )
}
