import Joi from "joi"

interface Address {
    uuid: number,
    type: string,
    street: string,
    number: number,
    city: string,
    complement: string,
    cep: string,
    state: string
}


const addressSchema = Joi.object<Address>({
    uuid: Joi.number(),
    type: Joi.string().required(),
    street: Joi.string().required(),
    number: Joi.number().required(),
    city: Joi.string().required(),
    complement: Joi.string().required(),
    cep: Joi.string().required(),
    state: Joi.string().required()
})

const optionalAddressSchema = Joi.object<Partial<Address>>({
    uuid: Joi.number().optional(),
    type: Joi.string().optional(),
    street: Joi.string().optional(),
    number: Joi.number().optional(),
    city: Joi.string().optional(),
    complement: Joi.string().optional(),
    cep: Joi.string().optional(),
    state: Joi.string().optional()
})

export { addressSchema, Address, optionalAddressSchema }
