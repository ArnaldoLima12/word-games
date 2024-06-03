import connect from "@/lib/db";
import { NextResponse } from "next/server";

async function listCategories()
{
    try
    {
        let query = 'SELECT categoria FROM games';
        let result = await connect.query(query);

        return NextResponse.json({categorias: result.rows}, {status: 200});
        
    }
    catch(erro)
    {
        return NextResponse.json({erro: erro}, {status: 500});
    }
}

export {listCategories as GET}