import { accountApi, customerApi } from "../databases/axiosConnections"
import { Account } from "../schemas/account.schema"


async function getAccountByConsumer(consumer: string) {
    const account = await accountApi.get<Account>(`/customer/${consumer}`)
    return account.data
}

async function getAccountByCpf(cpf: string) {
    const customers = await customerApi.get(`/cpf/${cpf}`)
    if (customers.data.length === 0) return null
    const account = await accountApi.get<Account>(`/customer/${customers.data[0].uuid}`)
    return account.data
}


async function patchAccount(id: string, body: Partial<Account>) {
    const account = await accountApi.patch(`/${id}`, body)
    return account.data
}


export { getAccountByConsumer, patchAccount, getAccountByCpf }