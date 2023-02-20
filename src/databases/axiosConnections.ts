import axios from "axios";

const addressApi = axios.create({
    baseURL: `http://${process.env.ADDRESS_URL}/address`,
})

const accountApi = axios.create({
    baseURL: `http://${process.env.ACCOUNT_URL}/account`,
})

const customerApi = axios.create({
    baseURL: `http://${process.env.CUSTOMER_URL}/customer`,
})

const managerApi = axios.create({
    baseURL: `http://${process.env.MANAGER_URL}/manager`,
})

const authenticationApi = axios.create({
    baseURL: `http://${process.env.AUTHENTICATION_URL}/authentication`,
})

const orchestratorApi = axios.create({
    baseURL: `http://${process.env.ORCHESTRATOR_URL}`,
})

// what may be wrong here

export { addressApi, accountApi, customerApi, managerApi, authenticationApi, orchestratorApi }