import connect from "@/lib/db";
import { NextResponse } from "next/server";

export async function listAll(request) {
    try {
        const { searchParams } = new URL(request.url);
        let page = parseInt(searchParams.get('page') || '1', 10);
        if (page < 1) page = 1;
        let limit = parseInt(searchParams.get('limit') || '9', 10);
        if (limit < 1) limit = 9;
        const offset = (page - 1) * limit;
        console.log(offset);

        let item = searchParams.get('item');


        let query;
        let queryParams;

        // Se um item de pesquisa foi fornecido na URL
        if (item) {
            // Construa a consulta com um filtro LIKE para pesquisar o item
            query = `SELECT * FROM games WHERE titulo ILIKE $1 LIMIT $2 OFFSET $3`;
            // Adicione os parâmetros de consulta para a pesquisa
            queryParams = [`%${item}%`, limit, offset];
        } else {
            // Se nenhum item de pesquisa foi fornecido, use a consulta padrão sem filtro
            query = `SELECT * FROM games LIMIT $1 OFFSET $2`;
            queryParams = [limit, offset];
        }

        // Execute a consulta para obter os jogos
        const result = await connect.query(query, queryParams);
        console.log(result);

        // Se a pesquisa estiver sendo realizada, precisamos contar o número total de resultados
        let totalGames;

        if (item) {
            // Consulta para contar o número total de jogos correspondentes à pesquisa
            const countQuery = `SELECT COUNT(*) FROM games WHERE titulo ILIKE $1`;
            // Execute a consulta de contagem
            const countResult = await connect.query(countQuery, [`%${item}%`]);
            // Obtenha o total de jogos correspondentes à pesquisa
            totalGames = parseInt(countResult.rows[0].count, 10);
        } else {
            // Se não houver pesquisa, o total de jogos é o número total na tabela
            const countQuery = 'SELECT COUNT(*) FROM games';
            const countResult = await connect.query(countQuery);
            totalGames = parseInt(countResult.rows[0].count, 10);
        }

        // Calcule o número total de páginas com base no número total de jogos e limite por página
        const totalPages = Math.ceil(totalGames / limit);

        // Retorne os resultados da consulta e as informações de paginação
        return NextResponse.json({
            games: result.rows,
            page,
            totalPages,
            totalGames,
            limit
        }, { status: 200 });


    } catch (error) {
        // Em caso de erro, retorne uma resposta de erro com o status 400
        return NextResponse.json({ erro: error.message }, { status: 400 });
    }
}

export { listAll as GET, listAll as POST };
