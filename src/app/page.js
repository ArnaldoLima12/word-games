import Container from '@/components/Container';
import Header from '@/components/Header';
import ListGame from '@/components/ListGame';
import Pagination from '@/components/Pagination';


export const fetchCache = 'force-no-store';

export default async function Home({ searchParams }) { 
  
  const page = parseInt(searchParams?.page || 1);
  const limit = parseInt(searchParams?.limit || 10);
  const item = searchParams?.item || null;

  async function loadGame(page, limit, item) {
    try {

      let res;

      if (item) {
        res = await fetch(`https://platinum-games.vercel.app/api/list/all?page=${page}&limit=${limit}&item=${item}`, {
          method: 'GET',
          headers: { "Content-Type": "application/json" }
        });
      } else {
        res = await fetch(`https://platinum-games.vercel.app/api/list/all?page=${page}&limit=${limit}`, {
          method: 'GET',
          headers: { "Content-Type": "application/json" }
        });
      }

      if (!res.ok) {
        console.log('Failed to fetch data');
        return null;
      }

      const result = await res.json();
      return result;

    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }


  let data = await loadGame(page, limit, item);

  return (
    <Container>
      <Header auth={false} />
      {data ? (
        <>
          <ListGame games={data.games} />
          <Pagination page={data.page} totalPages={data.totalPages} items={data.totalGames} limit={data.limit} seach = {item} />
        </>
      ) : (
        <p className='text-white text-center mt-44'>Falha ao tentar carregar informações.</p>
      )}
    </Container>
  );
}