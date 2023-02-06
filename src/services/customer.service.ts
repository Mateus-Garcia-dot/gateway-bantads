import { addressApi, customerApi } from "../databases/axiosConnections"
import { Address } from "../schemas/address.schema"
import { CustomerComposition, CustomerDb, customerComposition, } from "../schemas/customer.schema"

async function formatCustomerAndRequestAddress(customer: CustomerDb): Promise<CustomerComposition> {
    return {
        id: customer.id,
        cpf: customer.cpf,
        name: customer.name,
        telephone: customer.telephone,
        income: customer.income,
        // address: a// (await addressApi.get<Address>(`/${customer.id}`)).data
    }
}

async function getAllCustomersRequest(): Promise<CustomerComposition[]> {
    const customer = await customerApi.get<CustomerDb[]>('')
    const customerWithAddressPromise = customer.data.reduce<Array<Promise<CustomerComposition>>>((acc, customer) => {
        acc.push(formatCustomerAndRequestAddress(customer))
        return acc
    }, [])
    return await Promise.all(customerWithAddressPromise)
}


async function modifyCustomerRequest(id: number, customer: CustomerDb) {
    const modifiedCustomer = await customerApi.put<CustomerDb>(`/${id}`, customer)
    return await formatCustomerAndRequestAddress(modifiedCustomer.data)
}

async function getOneCostumerRequest(id: number) {
    return formatCustomerAndRequestAddress((await customerApi.get<CustomerDb>(`/${id}`)).data)
}

async function deleteCustomerRequest(id: number) {
    await customerApi.delete(`/${id}`,)
}

async function addCustomerRequest(customer: CustomerDb) {
    const addedCustomer = await customerApi.post<CustomerDb>('/', customer)
    return addedCustomer
}


export { getAllCustomersRequest, getOneCostumerRequest, modifyCustomerRequest, deleteCustomerRequest, addCustomerRequest }