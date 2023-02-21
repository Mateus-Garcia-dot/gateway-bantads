import Joi from "joi"

interface Authentication {
    uuid: string,
    customer?: string,
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
    uuid: Joi.string(),
    customer: Joi.number(),
    login: Joi.string(),
    password: Joi.string(),
    type: Joi.number(),
    isApproved: Joi.boolean(),
    isPending: Joi.boolean()
})

export { authenticationSchema, loginSchema }
export { Authentication }