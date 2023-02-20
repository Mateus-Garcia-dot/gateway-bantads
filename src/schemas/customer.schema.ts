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
        password: Joi.string()
    }).required()
})

const modifyCustomerSchema = Joi.object<Partial<Register>>({
    name: Joi.string().optional(),
    cpf: Joi.string().optional(),
    phone: Joi.string().optional(),
    salary: Joi.number().optional(),
    address: addressSchema,
    authentication: Joi.object({
        login: Joi.string().optional(),
        password: Joi.string().optional()
    }).optional()
})

export { customer, registerSchema, modifyCustomerSchema }
export { Customer, Register }