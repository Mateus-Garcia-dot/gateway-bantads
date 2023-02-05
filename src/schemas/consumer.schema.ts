import Joi from "joi"

interface Consumer {
    id: number,
    name: string,
    cpf: string,
    address: number,
    telephone: string,
    income: number
}

const consumerSchema = Joi.object<Consumer>({
    id: Joi.number(),
    name: Joi.string().required(),
    cpf: Joi.string().required(),
    address: Joi.number().required(),
    telephone: Joi.string().required(),
    income: Joi.number().required()
})

export { consumerSchema }
