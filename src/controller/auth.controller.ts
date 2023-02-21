import { Request, Response } from "express"
import { validate } from "../utils/validate"
import { idSchema } from "../schemas/id.schema"
import { getAuthenticationRequest, getPendingAuthenticationRequest, patchAuthenticationRequest } from "../services/auth.service"
import { getOneCustomerRequest as getOneCustomerRequest } from "../services/customer.service"
import { authenticationSchema } from "../schemas/authentication.schema"
import { notify } from "node-notifier"

async function getAuthentication(req: Request, res: Response) {
    const params = validate(req.params, idSchema)
    const auth = await getAuthenticationRequest(params.id)
    return res.status(200).json(auth.data)
}

async function getPendingAuthentication(req: Request, res: Response) {
    const auth = await getPendingAuthenticationRequest()
    const authWithConsumers = await Promise.all(auth.data.map(async (auth) => {
        console.log(auth)
        return getOneCustomerRequest(auth.customer!)
    }))
    return res.status(200).json(authWithConsumers)
}

async function patchAuthentication(req: Request, res: Response) {
    const params = validate(req.params, idSchema)
    const body = validate(req.body, authenticationSchema)
    const auth = await patchAuthenticationRequest(params.id, body)
    return res.status(200).json(auth.data)
}

async function approveAuthentication(req: Request, res: Response) {
    const params = validate(req.params, idSchema)
    const randomPassword = String(Math.floor(Math.random() * 1000))
    notify(randomPassword)
    const auth = await patchAuthenticationRequest(params.id, { isApproved: true, isPending: false, password: randomPassword, type: 2 })
    return res.status(200).json(auth.data)
}

async function rejectAuthentication(req: Request, res: Response) {
    const params = validate(req.params, idSchema)
    const auth = await patchAuthenticationRequest(params.id, { isApproved: false, isPending: false })
    return res.status(200).json(auth.data)
}

export { getAuthentication, getPendingAuthentication, patchAuthentication, approveAuthentication, rejectAuthentication }