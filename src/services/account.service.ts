import { accountApi, customerApi } from "../databases/axiosConnections"
import { Account } from "../schemas/account.schema"


async function getAccountByConsumer(consumer: string) {
    const account = await accountApi.get<Account>(`/customer/${consumer}`)
    return account.data
}

async function getAccountByCpf(cpf: string) {
    const customers = await customerApi.get(`/cpf/${cpf}`)
    return customers.data.account?.[0]
}


async function patchAccount(id: string, body: Partial<Account>) {
    const account = await accountApi.patch(`/${id}`, body)
    return account.data
}


export { getAccountByConsumer, patchAccount, getAccountByCpf }