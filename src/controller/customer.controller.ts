import { Request, Response } from "express";
import { validate } from "../utils/validate";
import { idSchema } from "../schemas/id.schema";
import { getAllCustomersRequest, getOneCostumerRequest, modifyCustomerRequest, registerRequest } from "../services/customer.service";
import { modifyCustomerSchema, registerSchema } from "../schemas/customer.schema";


async function getAllCustomers(req: Request, res: Response) {
    return res.status(200).json(await getAllCustomersRequest())
}

async function getOneCustomer(req: Request, res: Response) {
    const params = validate(req.params, idSchema)
    const customer = await getOneCostumerRequest(params.id)
    return res.status(200).json(customer)
}


// this function uses the orchestrator and is using a queue
async function register(req: Request, res: Response) {
    const body = validate(req.body, registerSchema)
    await registerRequest(body)
    return res.status(200).json({ data: 'Added to the queue' })
}

async function modifyCustomer(req: Request, res: Response) {
    const body = validate(req.body, registerSchema)
    const params = validate(req.params, idSchema)
    const customer = await modifyCustomerRequest(params.id, body)
    return res.status(200).json({ data: 'Added to the queue' })
}

// async function deleteCustomer(req: Request, res: Response) {
//     const params = validate(req.params, idSchema)
//     await deleteCustomerRequest(params.id)
//     return res.status(200).json('Deleted')
// }

export { getAllCustomers, getOneCustomer, register, modifyCustomer }



