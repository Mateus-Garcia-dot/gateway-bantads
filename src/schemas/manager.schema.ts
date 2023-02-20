import Joi from "joi"

interface Manager {
    id: number,
    cpf: string,
    telephone: string
}

const managerSchema = Joi.object<Manager>({
    id: Joi.number(),
    cpf: Joi.string().required(),
    telephone: Joi.string().required()
})

export { managerSchema }