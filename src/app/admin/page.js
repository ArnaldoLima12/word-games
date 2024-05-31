import Link from "next/link";
import Container from "@/components/Container";
import { BsController } from "react-icons/bs";
import Header from "@/components/Header";
import ProtectedRouter from "@/components/ProtectedRouter";

export default async function Admin()
{ 
  

  return(
    
    <ProtectedRouter>
       <Container>
        <Header auth={true}/>

        <main className="mx-auto mt-20 gap-3 flex items-center justify-center max-w-3xl">
          <div className="cards">
              <Link href={'/admin/newgame'}>
                <BsController fontSize={50}/>
                <p>Novo Jogo</p>
              </Link>
          </div>

          <div className="cards">

          </div>

          <div className="cards">

          </div>
        </main>
      </Container>
    </ProtectedRouter>
   
  )
}