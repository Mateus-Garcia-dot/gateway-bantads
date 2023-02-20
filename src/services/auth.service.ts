import { authenticationApi } from "../databases/axiosConnections";
import { Authentication } from "../schemas/authentication.schema";

async function getAuthenticationRequest(id: string) {
    return authenticationApi.get<Authentication>(`/${id}`)
}

async function postAuthenticationRequest(authentication: Authentication) {
    return authenticationApi.post<Authentication>('', authentication)
}

export { getAuthenticationRequest, postAuthenticationRequest }