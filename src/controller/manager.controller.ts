import { Request, Response } from "express";
import { createManagerRequest, deleteManagerRequest, getAllManagersRequest, getManagerRequest, managerConsumerRequest, updateManagerRequest } from "../services/manager.service";
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
    body.authentication.type = 3
    body.authentication.isApproved = true
    body.authentication.customer = manager.data.uuid
    await postAuthenticationRequest(body.authentication)
    return res.status(200).json("added")
}

async function updateManager(req: Request, res: Response) {
    const param = validate(req.params, idSchema)
    const body = validate(req.body, managerSchema)
    const manager = await updateManagerRequest(param.id, body)
    return res.status(200).json(manager)
}

async function deleteManager(req: Request, res: Response) {
    const param = validate(req.params, idSchema)
    await deleteManagerRequest(param.id)
    return res.status(200).json("deleted")
}

async function managerConsumer(req: Request, res: Response) {
    const managers = await managerConsumerRequest()
    return res.status(200).json(managers)
}


export { getAllManagers, createManager, getManager, updateManager, deleteManager, managerConsumer }