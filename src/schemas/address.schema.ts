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

export { addressSchema, Address }
