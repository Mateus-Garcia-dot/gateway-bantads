import { authenticationApi, managerApi } from "../databases/axiosConnections";
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

export { getAllManagersRequest, getManagerRequest, createManagerRequest, updateManagerRequest }