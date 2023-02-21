import { accountApi, addressApi, authenticationApi, customerApi, orchestratorApi } from "../databases/axiosConnections"
import { Account } from "../schemas/account.schema"
import { Address } from "../schemas/address.schema"
import { Authentication } from "../schemas/authentication.schema"
import { Customer, Register } from "../schemas/customer.schema"

async function getAllCustomersRequest() {
    const customers = await customerApi.get<Customer[]>('')
    if (customers.data.length === 0) return null
    const customerWithAddress = await Promise.all(customers.data.map(async (customer) => {
        const address = await addressApi.get<Address>(`/${customer.address}`)
        const auth = await authenticationApi.get<Authentication>(`/customer/${customer.uuid}`)
        const account = await accountApi.get<Account>(`/customer/${customer.uuid}`)
        delete auth.data.customer
        delete auth.data.password
        return { ...customer, address: address.data, authentication: auth.data, account: account.data }
    }))
    return customerWithAddress
}

async function getOneCustomerRequest(id: string) {
    const customer = await customerApi.get<Customer>(`/${id}`)
    const address = await addressApi.get<Address>(`/${customer.data.address}`)
    const auth = await authenticationApi.get(`/customer/${customer.data.uuid}`)
    const account = await accountApi.get(`/customer/${customer.data.uuid}`)
    delete auth.data.password
    delete auth.data.customer
    return { ...customer.data, address: address.data, authentication: auth.data, account: account.data }
}

async function registerRequest(register: Register) {
    await orchestratorApi.post('/bl/register', register)
}

async function modifyCustomerRequest(id: string, modifyCustomer: Partial<Register>) {
    await orchestratorApi.patch(`/bl/customer/${id}`, modifyCustomer)
}

async function getCpfCustomerRequest(cpf: string) {
    const customers = await customerApi.get<Customer[]>(`/cpf/${cpf}`)
    const customerWithAddress = await Promise.all(customers.data.map(async (customer) => {
        const address = await addressApi.get<Address>(`/${customer.address}`)
        const auth = await authenticationApi.get(`/customer/${customer.uuid}`)
        const account = await accountApi.get(`/customer/${customer.uuid}`)
        delete auth.data.customer
        delete auth.data.password
        return { ...customer, address: address.data, authentication: auth.data, account: account.data }
    }))
    return customerWithAddress
}


export { getAllCustomersRequest, getOneCustomerRequest, registerRequest, modifyCustomerRequest, getCpfCustomerRequest }