import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Your Username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your Password",
        },
      },
      authorize: async (credentials) => {
        const user = {
          id: "1",
          name: "Organizer",
          email: "organizer@gmail.com",
          password: "organizer1234",
        };
        if (
          credentials?.email === user.email &&
          credentials?.password === user.password
        ) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
};
