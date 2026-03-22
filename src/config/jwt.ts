import {env} from "@/config/env";

export const jwtConfig = {
    secret :env.JWT_SECRET,
    expiresIn: "7d"
}