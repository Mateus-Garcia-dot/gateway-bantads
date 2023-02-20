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

interface Register extends Omit<Customer, 'address'> {
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
    name: Joi.string().required(),
    cpf: Joi.string().required(),
    phone: Joi.string().required(),
    salary: Joi.number().required(),
    address: addressSchema.required(),
    authentication: Joi.object({
        login: Joi.string().required(),
        password: Joi.string().required()
    }).required()
})

const modifyCustomerSchema = Joi.object<Partial<Register>>({
    name: Joi.string(),
    cpf: Joi.string(),
    phone: Joi.string(),
    salary: Joi.number(),
    address: addressSchema,
    authentication: Joi.object({
        login: Joi.string(),
        password: Joi.string()
    })
})

export { customer, registerSchema, modifyCustomerSchema }
export { Customer, Register }