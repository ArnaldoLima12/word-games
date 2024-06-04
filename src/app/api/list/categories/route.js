import connect from "@/lib/db";
import { NextResponse } from "next/server";

async function listCategories()
{
    try
    {
        let query = 'SELECT DISTINCT id, nome FROM categorias';
        let result = await connect.query(query);
        

        return NextResponse.json({categorias: result.rows}, {status: 200});
        
    }
    catch(error)
    {
        return NextResponse.json({erro: error.message}, {status: 400});
    }
}

export { listCategories as GET }