import Joi from "joi";

interface Account {
    uuid: string;
    customer: string;
    manager: string;
    limitAmount: number;
    balance: number;
}

interface money {
    amount: number;
}

interface Transfer {
    cpf: string;
    amount: number;
}

const moneySchema = Joi.object<money>({
    amount: Joi.number().required(),
});

const transferSchema = Joi.object<Transfer>({
    cpf: Joi.string().required(),
    amount: Joi.number().required(),
});

export { moneySchema, transferSchema }
export type { money, Account }