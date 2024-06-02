import connect from "@/lib/db";
import { NextResponse } from "next/server";


export async function listAll() {
    
    try
    {
        let query = 'SELECT * FROM games';
        const result = await connect.query(query);

        console.log(result.rows);
        return NextResponse.json({games: result.rows}, {status: 200});
    }
    catch(error)
    {
        return NextResponse.json({erro: error}, { status: 400 });
    }
  

}


export {listAll as GET, listAll as POST}