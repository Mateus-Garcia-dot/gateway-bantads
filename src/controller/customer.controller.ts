import { Request, Response } from "express";
import { addCustomerRequest, deleteCustomerRequest, getAllCustomersRequest, getOneCostumerRequest, modifyCustomerRequest } from "../services/customer.service";
import { validate } from "../utils/validate";
import { idSchema } from "../schemas/id.schema";
import { customerSchema } from "../schemas/customer.schema";


async function getAllCustomers(req: Request, res: Response) {
    return res.status(200).json(await getAllCustomersRequest())
}

async function getOneCustomer(req: Request, res: Response) {
    const params = validate(req.params, idSchema)
    const customer = await getOneCostumerRequest(params.id)
    return res.status(200).json(customer)
}

async function addCustomer(req: Request, res: Response) {
    const body = validate(req.body, customerSchema)
    const newCostumer = await addCustomerRequest(body)
    return res.status(200).json(newCostumer)
}

async function modifyCustomer(req: Request, res: Response) {
    const body = validate(req.body, customerSchema)
    const params = validate(req.params, idSchema)
    const customer = await modifyCustomerRequest(params.id, body)
    return customer
}

async function deleteCustomer(req: Request, res: Response) {
    const params = validate(req.params, idSchema)
    await deleteCustomerRequest(params.id)
    return res.status(200).json('Deleted')
}

export { getAllCustomers, getOneCustomer, modifyCustomer, deleteCustomer, addCustomer }



