import connect from "@/lib/db";
import { NextResponse } from "next/server";

async function listItem(req) {
    try {

        let iso = await req.json();

        const query = `SELECT * FROM games WHERE iso = $1`;
        const result = await connect.query(query, [iso]);

        return NextResponse.json({
            games: result.rows,
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ erro: error.message }, { status: 400 });
    }
}

export { listItem as GET, listItem as POST };