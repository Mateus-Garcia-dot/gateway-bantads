import { ObjectSchema } from "joi";

class ValidationError extends Error {
    message: string
    constructor(msg: string) {
        super(msg)
        this.message = msg
    }
}

function validate<T>(input: unknown, schema: ObjectSchema<T>): T {
    const { error, value } = schema.validate(input)
    if (error != null) {
        throw new ValidationError(error.message)
    }
    return value
}


export { validate }