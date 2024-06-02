import connect from "@/lib/db";
import { NextResponse } from "next/server";

export async function listItem(request) {
    try {

        const { searchParams } = new URL(request.url);
        let page = parseInt(searchParams.get('page') || '1', 10);
        if(page < 1) page = 1;
        let limit = parseInt(searchParams.get('limit') || '9', 9);
        if(limit < 1) limit = 9;
        const offset = (page - 1) * limit;

        let item = searchParams.get('item');



        // Query to get the total count of games
        const countQuery = 'SELECT COUNT(*) FROM games';
        const countResult = await connect.query(countQuery);
        const totalGames = parseInt(countResult.rows[0].count, 10);

        // Query to get the paginated games
        const query = `SELECT * FROM games LIKE %$1% LIMIT $2 OFFSET $3 `;
        const result = await connect.query(query, [item, limit, offset]);

        const totalPages = Math.ceil(totalGames / limit);

        return NextResponse.json({
            games: result.rows,
            page,
            totalPages,
            totalGames,
            limit
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ erro: error.message }, { status: 400 });
    }
}

export { listAll as GET, listAll as POST };