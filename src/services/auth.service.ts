import { getPendingAuthentication } from "../controller/auth.controller";
import { authenticationApi } from "../databases/axiosConnections";
import { Authentication } from "../schemas/authentication.schema";

async function getAuthenticationRequest(id: string) {
    return authenticationApi.get<Authentication>(`/${id}`)
}

async function postAuthenticationRequest(authentication: Authentication) {
    return authenticationApi.post<Authentication>('', authentication)
}

async function getPendingAuthenticationRequest() {
    return authenticationApi.get<Authentication[]>(`/pending`)
}

async function patchAuthenticationRequest(id: string, authentication: Partial<Authentication>) {
    return authenticationApi.patch<Authentication>(`/${id}`, authentication)
}

export { getAuthenticationRequest, postAuthenticationRequest, getPendingAuthenticationRequest, patchAuthenticationRequest }