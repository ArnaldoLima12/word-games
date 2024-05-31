import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  pages: {signIn: '/auth'},
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" }
      },
      
      
      async authorize(credentials, req) {
        
        try
        {
          const res = await fetch('http://localhost:3000/api/auth/compare', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          });

          const data = await res.json();

         
          if (!res.ok) {
            throw new Error(data.message || 'Credenciais inválidas');
          }

          return data;
        }
        catch(error)
        { 
          throw new Error(error || 'Erro de autenticação');
        }
      }
    })
  ]
});

export { handler as GET, handler as POST }