import Joi from "joi"

interface Authentication {
    id: string,
    customer?: number,
    login?: string,
    password?: string,
    type?: number,
    isApproved?: boolean,
    isPending?: boolean
}

interface login {
    login: string,
    password: string
}

const loginSchema = Joi.object<login>({
    login: Joi.string().required(),
    password: Joi.string().required()
})

const authenticationSchema = Joi.object<Authentication>({
    id: Joi.string(),
    customer: Joi.number().required(),
    login: Joi.string().required(),
    password: Joi.string().required(),
    type: Joi.number().required(),
    isApproved: Joi.boolean().required(),
    isPending: Joi.boolean().required()
})

export { authenticationSchema, loginSchema }
export { Authentication }