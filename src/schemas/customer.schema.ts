import Joi from "joi"
import { Address, addressSchema } from "./address.schema"

interface CustomerDb {
    id: number,
    name: string,
    cpf: string,
    address: number,
    telephone: string,
    income: number
}

interface CustomerComposition {
    id: number,
    name: string,
    cpf: string,
    address: Address,
    phone: string,
    salary: number
}

const customerComposition = Joi.object<CustomerComposition>({
    id: Joi.number(),
    name: Joi.string().required(),
    cpf: Joi.string().required(),
    address: addressSchema.required(),
    phone: Joi.string().required(),
    salary: Joi.number().required()
})

export { CustomerDb, CustomerComposition, customerComposition }
