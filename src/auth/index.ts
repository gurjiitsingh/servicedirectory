import NextAuth, { User, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const BASE_PATH = "/api/auth";

type User1 = {
  id: string | null
  userName: string | null
  name: string | null
  password: string | null
  email: string | null
  role: string | null
}

export interface User2 {
  id?: string
  name?: string | null
  email?: string | null
  image?: string | null
  role?: string  | null
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
      async authorize(credentials): Promise<User2 | null> {
        const users = [
          {
            id: "test-user-1",
            userName: "test1",
            name: "Test 1",
            password: "pass",
            email: "test1@donotreply.com",
            role:"admin",
          },
          {
            id: "test-user-2",
            userName: "test2",
            name: "Test 2",
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
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
       return false;
        // Or you can return a URL to redirect to:
      //   return '/unauthorized'
      }
    },

    async redirect({ url, baseUrl }) {
    //  baseUrl =  process.env.NEXT_PUBLIC_BASE_PATH as string;
    //  console.log("in redirect ---",url,"baseurl", baseUrl )
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async jwt({ token, user, session }:any) {
    //   console.log("in jwt --------",user,"session--------", session,"token ----- ",token )
       // call stack 1
        // you can get user values from databas directly here
        if (user) {
         // User is available during sign-in
         // can take value from user to assing to token
          return {
            id: user.id,
            name: user.name,
            role: user.role,
            email: user.email,
            picture: user.image,
          };
        }
        return token;
      },
      async session({ session, token }:any) {
        // call stack 2
       //token pocess all values, assign value to session
       
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.image = token.picture;
      // console.log("in session --------", session, token )
        return session;
      },
  },
  basePath: BASE_PATH,
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
