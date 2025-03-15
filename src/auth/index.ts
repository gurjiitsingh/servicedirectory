import NextAuth, { User, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const BASE_PATH = "/api/auth";

type sessionType = {
 session:{user:{user:User}}
}


type tokenType = {
   id:string;
  name:string;
  email:string;
  role:string;
  picture:string;
}




const authOptions: NextAuthConfig = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        const users = [
          {
            id: "test-user-1",
            userName: "jack",
            name: "jack",
            password: "pass",
            email: "test1@donotreply.com",
            role:"admin",
          },
          {
            id: "test-user-2",
            userName: "jim",
            name: "jim",
            password: "pass",
            email: "test2@donotreply.com",
            role:"user",
          },
        ];
        const user = users.find(
          (user) =>
            user.userName === credentials.username &&
            user.password === credentials.password
        );
        return user
          ? { id: user.id, name: user.name, email: user.email, role:user.role }
          : null;
      },
      
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if(user) token.role = user.role
      return token
    },
    session({ session, token }) {
      const tR = token.role as string;
      session.user.role = tR;
      return session
    }
  },
  basePath: BASE_PATH,
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
