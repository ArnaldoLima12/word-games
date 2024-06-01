import connect from "@/lib/db";
import { NextResponse } from "next/server";


export async function listAll() {
    
    try
    {
        let query = 'SELECT * FROM games';
        const result = await connect.query(query);
       

        return NextResponse.json({games: result.rows})
    }
    catch(error)
    {
        return NextResponse.json({erro: error});
    }
    

  

}


export {listAll as GET}