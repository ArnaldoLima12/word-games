import Container from "@/components/Container";
import Header from "@/components/Header";
import Link from "next/link";

export default async function Categorias()
{   

    const loadCategories = async () =>  {

        try
        {
            let res = await fetch(`${process.env.BASE_URL}/api/list/categories`, {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            });

            if(!res.ok) {

                console.log('Failed to fetch data');
                return null;
            }

            const result = await res.json();
            return result;
        }
        catch(error)
        {
            console.log('Failed to fetch data:', error);
            return null;
        }
    }

    let data = await loadCategories();
    let categorias;
    if(data)
    {   
        categorias = data.categorias;
    }
    else
    {
        categorias = null;
    }

    return(

        <Container>
            <Header auth={false}/>
            <main className="flex gap-2 flex-grow p-3 flex-wrap justify-center max-w-5xl m-auto">
                {categorias ? (categorias.map(categoria => (<Link className="text-white no-underline" href={`/game/categorias/${categoria.categoria}`} key={categoria.categoria}>{categoria.categoria}</Link>))) : (<p>Sem categorias</p>)}
            </main>
        </Container>
    )
}