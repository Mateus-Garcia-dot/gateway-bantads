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
    telephone: string,
    income: number
}

const customerSchema = Joi.object<CustomerDb>({
    id: Joi.number(),
    name: Joi.string().required(),
    cpf: Joi.string().required(),
    address: Joi.number().required(),
    telephone: Joi.string().required(),
    income: Joi.number().required()
})

const customerComposition = Joi.object<CustomerComposition>({
    id: Joi.number(),
    name: Joi.string().required(),
    cpf: Joi.string().required(),
    address: addressSchema.required(),
    telephone: Joi.string().required(),
    income: Joi.number().required()
})

export { customerSchema }
export { CustomerDb, CustomerComposition, customerComposition }
