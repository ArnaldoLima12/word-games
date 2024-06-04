import Container from "@/components/Container";
import FormNewGame from "@/components/FormNewGame";
import Header from "@/components/Header";
import ProtectedRouter from "@/components/ProtectedRouter";


export default async function Page() {

    const loadCategories = async () => {

        let res = await fetch(`${process.env.BASE_URL}/api/list/categories`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        });

        return await res.json();
   }

   let categorias = await loadCategories();

    return (
        <ProtectedRouter>
            <Container>
                <Header auth={true} />

                <main>
                    <div className="bg-white rounded-lg shadow  m-10">

                        <div className="flex items-start justify-between p-2 border-b rounded-t">
                            <h3 className="text-xl font-semibold">
                                Novo Jogo
                            </h3>
                        </div>

                        <div className="p-6 space-y-6">
                           <FormNewGame categorias={categorias}></FormNewGame>
                        </div>
                      
                    </div>
                </main>
            </Container>
        </ProtectedRouter>
    )
}