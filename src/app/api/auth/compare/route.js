import { NextResponse } from 'next/server';
import connect from '@/lib/db';

export async function POST(req) {

    try {

        const { email, password } = await req.json();
    
        const query = 'SELECT id, name, email FROM users WHERE email = $1 AND password = $2';
        const values = [email, password];
        const result = await connect.query(query, values);
    
        if (result.rows.length > 0) {

          const user = result.rows[0];
          return NextResponse.json(user);

        } 
        else {
          return NextResponse.json({ message: 'Credenciais inválidas' }, { status: 401 });
        }
      } 
      catch (error) {

        console.error('Erro ao consultar o banco de dados:', error);
        return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });

      }
}
