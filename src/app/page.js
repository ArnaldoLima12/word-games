import Container from '@/components/Container';
import Header from '@/components/Header';
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
      return null;
    }
  }

  const data = await loadGame();
  console.log(data);

  return (
    <Container>
      <Header auth={false} />
      {data ? (
        <ListGame games={data.games} />
      ) : (
        <p>No games available.</p>
      )}
    </Container>
  );
}
