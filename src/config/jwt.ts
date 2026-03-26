import { env } from "./env.js";

export const jwtConfig = {
  secret: env.JWT_SECRET,
  access_token_expire_in: env.ACCESS_TOKEN_EXPIRE_IN,
  refresh_token_expire_in: env.REFRESH_TOKEN_EXPIRE_IN,
};
