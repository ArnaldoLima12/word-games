import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProtectedRouter({children})
{   
    const session = await getServerSession();
  
    if(!session)
    {
      redirect('/')
    }

    return (
        <>
            {children}
        </>
    )
}