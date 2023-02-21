import { Request, Response } from "express";
import { validate } from "../utils/validate";
import { idSchema } from "../schemas/id.schema";
import { getAllCustomersRequest, getCpfCustomerRequest, getOneCustomerRequest, modifyCustomerRequest, registerRequest } from "../services/customer.service";
import { modifyCustomerSchema, registerSchema } from "../schemas/customer.schema";

async function getAllCustomers(req: Request, res: Response) {
    return res.status(200).json(await getAllCustomersRequest())
}

async function getTopCustomers(req: Request, res: Response) {
    const customers = await getAllCustomersRequest() as any[]
    customers.sort((a, b) => {
        if (a.account.balance > b.account.balance) return -1
        if (a.account.balance < b.account.balance) return 1
        return 0
    })
    return res.status(200).json(customers.slice(0, 5))
}

async function getOneCustomer(req: Request, res: Response) {
    const params = validate(req.params, idSchema)
    const customer = await getOneCustomerRequest(params.id)
    return res.status(200).json(customer)
}


// this function uses the orchestrator and its using a queue
async function register(req: Request, res: Response) {
    const body = validate(req.body, registerSchema)
    await registerRequest(body)
    return res.status(200).json({ data: 'Added to the queue' })
}

// this function uses the orchestrator and its using a queue
async function modifyCustomer(req: Request, res: Response) {
    const body = validate(req.body, modifyCustomerSchema)
    const params = validate(req.params, idSchema)
    await modifyCustomerRequest(params.id, body)
    return res.status(200).json({ data: 'Added to the queue' })
}

async function getCpfCustomer(req: Request, res: Response) {
    const params = validate(req.params, idSchema)
    const customer = await getCpfCustomerRequest(params.id)
    return res.status(200).json(customer)
}


async function getAllCustomersOfManager(req: Request, res: Response) {
    const params = validate(req.params, idSchema)
    const customers = await getAllCustomersRequest()
    console.log(customers)
    const filteredCustomers = customers?.filter(customer => {
        console.log(customer.account.manager, params.id)
        return customer.account.manager === params.id;
    })
    return res.status(200).json(filteredCustomers)
}
// async function deleteCustomer(req: Request, res: Response) {
//     const params = validate(req.params, idSchema)
//     await deleteCustomerRequest(params.id)
//     return res.status(200).json('Deleted')
// }

export { getAllCustomers, getOneCustomer, register, modifyCustomer, getCpfCustomer, getTopCustomers, getAllCustomersOfManager }



