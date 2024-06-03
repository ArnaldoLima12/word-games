import { NextResponse } from "next/server";
import connect from "@/lib/db";

async function loadGamesCategories(req)
{
    const categoria = await req.json();

    const { searchParams } = new URL(req.url);
    let page = parseInt(searchParams.get('page') || '1', 10);
    if (page < 1) page = 1;
    let limit = parseInt(searchParams.get('limit') || '9', 10);
    if (limit < 1) limit = 9;
    const offset = (page - 1) * limit;
    
    try
    {
        let query = 'SELECT * FROM games WHERE categoria = $1 LIMIT $2 OFFSET $3';
        let result = await connect.query(query, [categoria, limit, offset]);

        const countQuery = `SELECT COUNT(*) FROM games WHERE categoria = $1`;
        const countResult = await connect.query(countQuery, [categoria]);
        let totalGames = parseInt(countResult.rows[0].count, 10);
        const totalPages = Math.ceil(totalGames / limit);

        return NextResponse.json({
            games: result.rows,
            categoria: categoria,
            page,
            totalPages,
            totalGames,
            limit
        }, {status: 200});
    }
    catch(error)
    {
        return NextResponse.json({erro: error}, {status: 500})
    }
}

export {loadGamesCategories as POST}