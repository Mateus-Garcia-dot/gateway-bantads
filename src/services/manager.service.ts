import { accountApi, authenticationApi, managerApi } from "../databases/axiosConnections";
import { Account } from "../schemas/account.schema";
import { Manager, ManagerWithAuthentication } from "../schemas/manager.schema";

async function getAllManagersRequest() {
    const manager = await managerApi.get<Manager[]>('')
    const managerWithAuth = await Promise.all(manager.data.map(async (manager) => {
        const auth = await authenticationApi.get(`/customer/${manager.uuid}`)
        delete auth.data.manager
        delete auth.data.password
        return { ...manager, authentication: auth.data }
    }))
    return managerWithAuth
}

async function getManagerRequest(id: string) {
    const manager = await managerApi.get(`/${id}`)
    const auth = await authenticationApi.get(`/customer/${manager.data.uuid}`)
    return { ...manager.data, authentication: auth.data }
}

async function createManagerRequest(manager: Manager) {
    return await managerApi.post('', {
        name: manager.name,
        cpf: manager.cpf,
        telephone: manager.telephone
    })
}

async function updateManagerRequest(id: string, manager: ManagerWithAuthentication) {
    const managerReturn = await managerApi.put(`/${id}`, {
        name: manager.name,
        cpf: manager.cpf,
        telephone: manager.telephone
    })
    const auth = await authenticationApi.patch(`/${managerReturn.data.uuid}`, {
        login: manager.authentication.login,
        password: manager.authentication.password
    })
    return { ...managerReturn.data, authentication: auth.data }
}

async function deleteManagerRequest(id: string) {
    const auth = await authenticationApi.get(`/customer/${id}`)
    await authenticationApi.delete(`/${auth.data.uuid}`)
    return await managerApi.delete(`/${id}`)
}

async function managerConsumerRequest() {
    const allManagers = await getAllManagersRequest()
    const ManagersCustomers = await Promise.all(allManagers.map(async (manager) => {
        const accounts = await accountApi.get<Account[]>(`/manager/${manager.uuid}`)
        const sumNegativeBalance = accounts.data.reduce((acc, account) => { return account.balance < 0 ? acc + account.balance : 0 }, 0)
        const sumPositiveBalance = accounts.data.reduce((acc, account) => { return account.balance > 0 ? acc + account.balance : 0 }, 0)
        return { ...manager, count: accounts.data.length, sumNegativeBalance, sumPositiveBalance }
    }))
    return ManagersCustomers
}

export { getAllManagersRequest, getManagerRequest, createManagerRequest, updateManagerRequest, deleteManagerRequest, managerConsumerRequest }