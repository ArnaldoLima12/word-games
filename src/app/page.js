'use server'

import Container from '@/components/Container'
import Header from '@/components/Header'
import ListGame from '@/components/ListGame';
import Navegation from '@/components/Navegation'

export default async function Home() {

  const loadGame = async e =>
  {
    let res = await fetch('http://localhost:3000/api/list/all');
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
