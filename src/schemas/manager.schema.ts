import Joi from "joi"
import { Authentication } from "./authentication.schema"

interface Manager {
    uuid: number,
    name: string
    cpf: string,
    telephone: string
}

interface ManagerWithAuthentication extends Manager {
    authentication: Authentication
}

const managerSchema = Joi.object<ManagerWithAuthentication>({
    uuid: Joi.string(),
    name: Joi.string().required(),
    cpf: Joi.string().required(),
    telephone: Joi.string().required(),
    authentication: Joi.object<Authentication>({
        login: Joi.string().required(),
        password: Joi.string().optional()
    })
})

export { managerSchema }
export { Manager, ManagerWithAuthentication }