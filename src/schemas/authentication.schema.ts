import Joi from "joi"

interface Authentication {
    id: string,
    account: number,
    login: string,
    password: string,
    type: number,
    isApproved: boolean,
    isPending: boolean
}


const authenticationSchema = Joi.object<Authentication>({
    id: Joi.string(),
    account: Joi.number().required(),
    login: Joi.string().required(),
    password: Joi.string().required(),
    type: Joi.number().required(),
    isApproved: Joi.boolean().required(),
    isPending: Joi.boolean().required()
})

export { authenticationSchema }