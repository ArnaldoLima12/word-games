import Container from "@/components/Container";
import Header from "@/components/Header";
import ListGame from "@/components/ListGame";
import Pagination from "@/components/Pagination";

export default async function Categoria({params, searchParams})
{   
    const page = parseInt(searchParams?.page || 1);
    const limit = parseInt(searchParams?.limit || 10);
    
    const loadGames = async (categoria, page, limit) => {

        let res = await fetch(`${process.env.BASE_URL}/api/list/categories/games?page=${page}&&limit=${limit}`, {
            method: 'POST',
            body: JSON.stringify(categoria),
            headers: { "Content-Type": "application/json" }
        });

        if(!res.ok) {
            console.log('Falha na fetch')
            return null
        }

        let result = await res.json();
        return result;
    }

    let data = await loadGames(params.categoria, page, limit);
    
    return(
        <Container>
            <Header auth={false}/>
            {data ? (
                <>
                    <ListGame games={data.games} />
                    <Pagination page={data.page} totalPages={data.totalPages} items={data.totalGames} limit={data.limit} />
                </>
            ) : (
                <p className='text-white text-center mt-44'>Falha ao tentar carregar informações.</p>
            )}
        </Container>
    )
}