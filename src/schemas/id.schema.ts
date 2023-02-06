import Joi from "joi"

interface Id {
    id: number
}

const idSchema = Joi.object<Id>({
    id: Joi.number().required()
})

export { idSchema }