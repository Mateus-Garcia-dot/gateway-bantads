import Joi from "joi"
import { Address, addressSchema } from "./address.schema"

interface Customer {
    uuid: string,
    name: string,
    cpf: string,
    address: number,
    phone: string,
    salary: number
}

interface Register {
    customer: Customer,
    address: Address,
    authentication: {
        email: string,
        password: string
    }
}

const customer = Joi.object<Customer>({
    uuid: Joi.number(),
    name: Joi.string().required(),
    cpf: Joi.string().required(),
    phone: Joi.string().required(),
    salary: Joi.number().required()
})

const registerSchema = Joi.object<Register>({
    customer: customer.required(),
    address: addressSchema.required(),
    authentication: Joi.object({
        login: Joi.string().required(),
        password: Joi.string().required()
    }).required()
})

export { customer, registerSchema }
export { Customer, Register }