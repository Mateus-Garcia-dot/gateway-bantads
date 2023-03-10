import { Router } from "express";
import { getAllCustomers, getOneCustomer, modifyCustomer, register, getCpfCustomer, getTopCustomers, getAllCustomersOfManager } from "../controller/customer.controller";
import 'express-async-errors'

const customerRouter = Router()

customerRouter.get('/cpf/:id', getCpfCustomer)
customerRouter.get('/top', getTopCustomers)
customerRouter.get('/manager/:id', getAllCustomersOfManager)
customerRouter.get('/', getAllCustomers)
customerRouter.get('/:id', getOneCustomer)
customerRouter.post('/', register)
customerRouter.put('/:id', modifyCustomer)
// customerRouter.delete('/:id', deleteCustomer)

export { customerRouter }