import Container from '@/components/Container'
import Header from '@/components/Header'
import ListGame from '@/components/ListGame';


export default async function Home() {

  const loadGame = async e =>
  {
    let res = await fetch('https://word-games-seven.vercel.app/api/list/all');
    let result = await res.json();
    return result;
  }
  
  const data = await loadGame();

  return (
    <Container>
      <Header auth={false}/>
      <ListGame games={data.games}>

      </ListGame>
    </Container>
  )
}
