import { Request, Response } from "express"
import { validate } from "../utils/validate"
import { idSchema } from "../schemas/id.schema"
import { getAuthenticationRequest } from "../services/auth.service"

async function getAuthentication(req: Request, res: Response) {
    const params = validate(req.params, idSchema)
    const auth = await getAuthenticationRequest(params.id)
    return res.status(200).json(auth.data)
}

export { getAuthentication }