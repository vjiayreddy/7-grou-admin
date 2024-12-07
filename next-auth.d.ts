import NextAuth, { DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    _id?: string;
    name?: string;
    mobile?: string;
    role?: string;
    isMobileVerified?: boolean;
    token?: string;
  }

  interface Session {
    user: {
      _id?: string;
      name?: string;
      mobile?: string;
      role?: string;
      isMobileVerified?: boolean;
      token?: string;
    };
  }
}
