import Joi from "joi"

interface Id {
    id: string
}

const idSchema = Joi.object<Id>({
    id: Joi.string().required()
})

export { idSchema }