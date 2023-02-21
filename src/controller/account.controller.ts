import { Request, Response } from "express";
import { idSchema } from "../schemas/id.schema";
import { validate } from "../utils/validate";
import { moneySchema, transferSchema } from "../schemas/account.schema";
import { getAccountByConsumer, getAccountByCpf, patchAccount } from "../services/account.service";


async function deposit(req: Request, res: Response) {
    const params = validate(req.params, idSchema)
    const body = validate(req.body, moneySchema)
    const account = await getAccountByConsumer(params.id)
    const newBalance = account.balance + body.amount
    await patchAccount(params.id, { balance: newBalance })
    return res.status(200).json({ message: "Deposit successful" })
}

async function withdraw(req: Request, res: Response) {
    const params = validate(req.params, idSchema)
    const body = validate(req.body, moneySchema)
    const account = await getAccountByConsumer(params.id)
    const newBalance = account.balance - body.amount
    if (newBalance < -account.limitAmount) {
        return res.status(400).json({ message: "Limit is not enough" })
    }
    await await patchAccount(params.id, { balance: newBalance })
    return res.status(200).json({ message: "Withdraw successful" })
}

async function transfer(req: Request, res: Response) {
    const params = validate(req.params, idSchema)
    const body = validate(req.body, transferSchema)
    const account = await getAccountByConsumer(params.id)
    const accountToTransfer = await getAccountByCpf(body.cpf)
    if (!accountToTransfer) {
        return res.status(404).json({ message: "Account not found" })
    }
    const newBalance = account.balance - body.amount
    if (newBalance < -account.limitAmount) {
        return res.status(400).json({ message: "Limit is not enough" })
    }
    await patchAccount(account.customer, { balance: newBalance })
    await patchAccount(accountToTransfer.customer, { balance: accountToTransfer.balance + body.amount })
    return res.status(200).json({ message: "Transfer successful" })
}

export { deposit, withdraw, transfer }
