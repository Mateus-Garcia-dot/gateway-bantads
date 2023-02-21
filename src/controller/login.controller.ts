import { Request, Response } from "express";
import { validate } from "../utils/validate";
import { loginSchema } from "../schemas/authentication.schema";
import { loginRequest } from "../services/login.service";

async function login(req: Request, res: Response) {
    const body = validate(req.body, loginSchema)
    const response = await loginRequest(body.login, body.password)
    if (!response.data) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    return res.status(200).json(response.data)
}


export { login }