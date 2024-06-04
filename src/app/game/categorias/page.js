import Container from "@/components/Container";
import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";

export default async function Categorias() {

    const loadCategories = async () => {

        try {
            let res = await fetch(`${process.env.BASE_URL}/api/list/categories`, {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            });

            let result = await res.json();
            return result;
        }
        catch (error) {
            console.log('Failed to fetch data:', error);
            return null;
        }
    }

    let data = await loadCategories();
    let categorias;

    if (data) {
        categorias = data.categorias;
    }
    else {
        categorias = null;
    }


    return (

        <Container>
            <Header auth={false} />
            <main className="flex gap-2 flex-grow p-3 flex-wrap justify-center max-w-5xl m-auto">
                {categorias ? (
                    categorias.map(categoria => (

                        <Link className=" no-underline text-white" key={categoria.id} href={`/game/categorias/${categoria.id}`}>

                            <div className="p-2 transform transition duration-300 hover:scale-110 rounded-lg shadow-lg h-52 w-56 hover:shadow-xl bg-zinc-500 flex items-center justify-center">

                                {/* <div className="bg-gradient-to-br from-rose-100 via-purple-200 to-purple-200 m-2 h-3/6 rounded-lg">
                               
                                </div> */}

                                <div className="px-2 pt-2 flex flex-col">
                                    <h3 className="font-semibold no-underline">{categoria.nome}</h3>
                                </div>
                            </div>
                        </Link>


                    ))) : (<p>Sem categorias</p>)}
            </main>
        </Container>
    )
}