import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthAdapter } from "./authAdapter";
import db from "./prismadb";
import { compare } from "bcrypt";
import { getByEmail } from "../server/handler/customer/getByEmail";
import { getByEmail as getAdminByEmail } from "../server/handler/admin/getByEmail";
import { randomUUID } from "crypto"
import { cookies } from 'next/headers'
import { encode, decode } from "next-auth/jwt"
import { adminAuthAdapter } from "./adminAuthAdapter";

const session = {
  // strategy: "database",
  maxAge: 30 * 24 * 60 * 60, // 30 days
  updateAge: 24 * 60 * 60, // 24 hours
}

export const authOptions = (req, res) => {
  const { pathname } = req.nextUrl;
  return {
    secret: process.env.NEXTAUTH_SECRET,
    adapter: AuthAdapter(db),
    session,
    providers: [
      FacebookProvider({
          clientId: process.env.FACEBOOK_CLIENT_ID,
          clientSecret: process.env.FACEBOOK_CLIENT_SECRET
      }),
      GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      CredentialsProvider({
        credentials: {
          email: {},
          password: {},
          store_id: null,
          supreme: null,
        },
        async authorize(credentials, req) {
          let response = null;
          if(credentials.hasOwnProperty('supreme') && parseInt(credentials.supreme) === 1){
            response = await getAdminByEmail(credentials.email);
          }else{
            response = await getByEmail(credentials.email,parseInt(credentials.store_id));
          }
          const passwordCorrect = await compare(
            credentials?.password || '',
            response.password
          );
          if (passwordCorrect) {
            return {
              id: response.id,
              email: response.email,
              supreme: credentials.supreme
            };
          }
          return null;
        },
      }),
    ],
    pages: {
      signIn: '',
    },
    jwt: {
      encode(params) {
        if (pathname?.includes("callback") && pathname?.includes("credentials") && req.method === "POST") {
          const cookie = cookies().get("next-auth.session-token")?.value;
          if (cookie) return cookie
          else return ""
        }
        return encode(params)
      },
      async decode(params) {
        if (pathname?.includes("callback") && pathname?.includes("credentials") && req.method === "POST") {
          return null
        }
        return decode(params)
      },
    },
    callbacks: {
      async signIn({ user, account }) {
        if(account.type === 'credentials'){
          const sessionToken = randomUUID();
          const sessionExpiry = new Date(Date.now() + session.maxAge * 1000);
          if(user.hasOwnProperty('supreme') && parseInt(user.supreme) === 1){
            const admin_id = user.id;
            await adminAuthAdapter(db).deleteSession(admin_id)
            await adminAuthAdapter(db).createSession({
              sessionToken,
              userId:admin_id,
              expires: sessionExpiry,
            })
            cookies().set('next-auth.session-admin-token', sessionToken,{
              expires: sessionExpiry,
            })
          }else{
            const customer_id = user.id;
            await AuthAdapter(db).createSession({
              sessionToken,
              userId:customer_id,
              expires: sessionExpiry,
            })
            cookies().set('next-auth.session-token', sessionToken,{
              expires: sessionExpiry,
            })
          }
        }
        return true
      },
      async sessionAdmin({ session, token, user }) {
          if (session?.admin) {
              session.admin.id = user.id;
              session.admin.avatar = user.avatar;
              session.admin.first_name = user.first_name;
              session.admin.last_name = user.last_name;
              session.admin.email = user.email;
              session.admin.phone = user.phone;
              session.admin.birthday = user.birthday;
          }
          return session
      },
      async session({ session, token, user }) {
          if (session?.user) {
              session.user.id = user.id;
              session.user.avatar = user.avatar;
              session.user.first_name = user.first_name;
              session.user.last_name = user.last_name;
              session.user.email = user.email;
              session.user.store_id = user.store_id;
              session.user.phone = user.phone;
              session.user.birthday = user.birthday;
              session.user.store_name = user.store_name;
          }
          return session
      },
    },
  }
}

export default authOptions;