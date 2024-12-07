import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login, updateToken } from "./redux/actions";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {},
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const response: any = await login({
            mobile: credentials?.mobile as string,
            password: credentials?.password as string,
          });
          if(response?.status==="failure"){
            return null;
          }
          return {
            _id: response?.data?.data?.user?._id,
            name: response?.data?.data?.user?.name,
            email: response?.data?.data?.user?.email,
            mobile: response?.data?.data?.user?.mobile,
            token: response?.data?.data?.token,
            isMobileVerified: response?.data?.data?.user?.isMobileVerified,
            role: response?.data?.data?.user?.role,
          } as User;
        } catch (error) {
          return new Error(error as any);
        }
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        token = updateToken(token, user);
      }
      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user._id = token?._id as string;
        session.user.name = token?.name as string;
        session.user.token = token?.token as string;
        session.user.email = token.email as string;
        session.user.isMobileVerified = token?.isMobileVerified as boolean;
      }
      return Promise.resolve(session);
    },
  },
});
