import { Request, Response } from "express";
import { createManagerRequest, getAllManagersRequest, getManagerRequest, updateManagerRequest } from "../services/manager.service";
import { idSchema } from "../schemas/id.schema";
import { validate } from "../utils/validate";
import { managerSchema } from "../schemas/manager.schema";
import { postAuthenticationRequest } from "../services/auth.service";


async function getAllManagers(req: Request, res: Response) {
    const managers = await getAllManagersRequest()
    return res.status(200).json(managers)
}

async function getManager(req: Request, res: Response) {
    const param = validate(req.params, idSchema)
    const managers = await getManagerRequest(param.id)
    return res.status(200).json(managers)
}

async function createManager(req: Request, res: Response) {
    const body = validate(req.body, managerSchema)
    const manager = await createManagerRequest(body)
    body.authentication.type = 2
    body.authentication.isApproved = true
    body.authentication.customer = manager.data.uuid
    const authentication = await postAuthenticationRequest(body.authentication)
    return res.status(200).json("added")
}

async function updateManager(req: Request, res: Response) {
    const param = validate(req.params, idSchema)
    const body = validate(req.body, managerSchema)
    const manager = await updateManagerRequest(param.id, body)
    return res.status(200).json(manager)
}

export { getAllManagers, createManager, getManager, updateManager }