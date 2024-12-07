import { JWT } from "next-auth/jwt";
import { API_ROUTES } from "./apiRoutes";
import axios from "axios";
import { User } from "next-auth";

export type loginApiParams = {
  mobile: string;
  password: string;
};

export const login = async ({ mobile, password }: loginApiParams) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}${API_ROUTES.LOGIN}`,
      { mobile, password }
    );
    const data = response;
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const updateToken = (token: JWT, user: User) => {
  if (token) {
    token._id = user._id;
    token.name = user?.name;
    token.email = user?.email;
    token.isMobileVerified = user.isMobileVerified;
    token.role = user?.role;
    token.mobile = user?.mobile;
    token.token = user?.token;
  }
  return token;
};

// export const updateSingUpUserSession = (
//   session: any,
//   _updateSession: any,
// ) => {
//   _updateSession({
//     ...session,
//     user: {
//       ...session?.user
//
//     },
//   });
// };
