import { authenticationApi } from "../databases/axiosConnections";
import { Authentication } from "../schemas/authentication.schema";

async function loginRequest(login: string, password: string) {
    return authenticationApi.post<Authentication>("/login", {
        login,
        password
    })
}

export { loginRequest }