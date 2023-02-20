import { addressApi, authenticationApi, customerApi, orchestratorApi } from "../databases/axiosConnections"
import { Address } from "../schemas/address.schema"
import { Customer, Register } from "../schemas/customer.schema"

async function getAllCustomersRequest() {
    const customers = await customerApi.get<Customer[]>('')
    if (customers.data.length === 0) return customers.data
    const customerWithAddress = await Promise.all(customers.data.map(async (customer) => {
        const address = await addressApi.get<Address>(`/${customer.address}`)
        const auth = await authenticationApi.get(`/customer/${customer.uuid}`)
        delete auth.data.customer
        delete auth.data.password
        return { ...customer, address: address.data, authentication: auth.data }
    }))
    console.log(customerWithAddress)
    return customerWithAddress
}

async function getOneCostumerRequest(id: string) {
    const customer = await customerApi.get<Customer>(`/${id}`)
    const address = await addressApi.get<Address>(`/${customer.data.address}`)
    const auth = await authenticationApi.get(`/customer/${customer.data.uuid}`)
    delete auth.data.password
    delete auth.data.customer
    return { ...customer.data, address: address.data, authentication: auth.data }
}

async function registerRequest(register: Register) {
    await orchestratorApi.post('/bl/register', register)
}

export { getAllCustomersRequest, getOneCostumerRequest, registerRequest }