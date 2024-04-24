import { sql } from "@vercel/postgres";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { QueryResultRow } from "@vercel/postgres";

export const options: NextAuthOptions = {
  providers: [
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
      authorize: async (credentials,req) => {
        try {
          const url = new URL(req?.headers?.referer);
          const path = url.searchParams.get("callbackUrl");
          console.log(path);
          if(path=="/organiserlogin"){
          const { rows }: { rows: QueryResultRow } = await sql<QueryResultRow[]>`
            SELECT * FROM auth WHERE email = ${credentials?.email} AND password = ${credentials?.password}
          `;
          if (rows.length > 0) {
            return Promise.resolve({
              id: rows.id,
              name: rows.email,
              password: rows.password,
            });
          } else {
            return Promise.resolve(null);
          }
        }
        else {
          const { rows }: { rows: QueryResultRow } = await sql<QueryResultRow[]>`
            SELECT * FROM player_login WHERE email = ${credentials?.email} AND password = ${credentials?.password}
          `;
          if (rows.length > 0) {
            return Promise.resolve({
              id: rows.id,
              name: rows.email,
              password: rows.password,
            });
          } else {
            return Promise.resolve(null);
          }
        }
        } catch (error) {
          console.error("Error authenticating user:", error);
          return Promise.resolve(null);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
};
