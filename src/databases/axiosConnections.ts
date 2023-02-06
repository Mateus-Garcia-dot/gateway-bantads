import axios from "axios";

const addressApi = axios.create({
    baseURL: `http://${process.env.ADDRESS_URL}:${process.env.ADDRESS_PORT}/address`,
})

const accountApi = axios.create({
    baseURL: `http://${process.env.ACCOUNT_URL}:${process.env.ACCOUNT_PORT}/account`,
})

const customerApi = axios.create({
    baseURL: `http://${process.env.CUSTOMER_URL}:${process.env.CUSTOMER_PORT}/customer`,
})

const managerApi = axios.create({
    baseURL: `http://${process.env.MANAGER_URL}:${process.env.MANAGER_PORT}/manager`,
})

const authenticationApi = axios.create({
    baseURL: `http://${process.env.AUTHENTICATION_URL}:${process.env.AUTHENTICATION_PORT}/authentication`,
})

// what may be wrong here

export { addressApi, accountApi, customerApi, managerApi, authenticationApi }