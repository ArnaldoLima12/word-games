import { NextResponse } from 'next/server';
import connect from '@/lib/db';

export async function Create(req) {
    
    try {

        const { titulo, descricao, download, categoria, capa, iso, plataforma } = await req.json();

        if (titulo && descricao && download && categoria && iso && plataforma && capa) {


            let res = await fetch(process.env.IMG_URL_UPLOAD, {
                method: 'POST',
                body: new URLSearchParams({image: capa})
            });

            const photo = await res.json();
            let img = photo.data.url;
       

            let query = `INSERT INTO games (titulo, descricao, download, categoria, capa, iso, plataforma) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
            const values = [titulo, descricao, download, categoria, img, iso, plataforma];
            const result = await connect.query(query, values);

            if (result.rows.length > 0) {

                return NextResponse.json({ message: 'Game created successfully', game: result.rows[0] });
            } 
            else {

                return NextResponse.json({ message: 'Failed to create game' }, { status: 500 });
            }

        } 
        else {

            return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
        }

    } catch (error) {
        
        return NextResponse.json({ message: 'Error processing request', error: error.message }, { status: 500 });
    }
}

export { Create as POST };
