import Joi from "joi"

interface Manager {
    id: number,
    name: string,
    cpf: string,
    address: string,
    phone: string,
    salary: number
}

const managerSchema = Joi.object<Manager>({
    id: Joi.number(),
    name: Joi.string().required(),
    cpf: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.string().required(),
    salary: Joi.number().required()
})