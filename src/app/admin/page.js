import ButtonLogout from "@/components/ButtonLogout";
import Container from "@/components/Container";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Admin()
{ 
  const session = await getServerSession();
  
  if(!session)
  {
    redirect('/')
  }

  return(
    <Container>
      <h1>Olá {session?.user?.email}</h1>
      <ButtonLogout></ButtonLogout>
    </Container>
  )
}