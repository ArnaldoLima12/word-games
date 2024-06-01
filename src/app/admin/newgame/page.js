import Container from "@/components/Container";
import FormNewGame from "@/components/FormNewGame";
import Header from "@/components/Header";
import ProtectedRouter from "@/components/ProtectedRouter";


export default function Page() {

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
                           <FormNewGame></FormNewGame>
                        </div>
                      
                    </div>
                </main>
            </Container>
        </ProtectedRouter>
    )
}