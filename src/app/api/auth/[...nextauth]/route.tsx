import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";;
import { compare } from "bcrypt";
import { connection } from "@/app/model/database";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;
        const response = await connection.query(`SELECT * FROM user WHERE email = ?`, [email]);
        const res = JSON.stringify(response);
        const user = JSON.parse(res);
        const passwordCorrect = await compare(password || "", user[0].password);
        if (passwordCorrect) {
          return {
            id: user[0].id,
            email: user[0].email,
          };
        } 
        return null;        
      },
    }),
  ],
});

export { handler as GET, handler as POST };