import { Router } from "express";
import { getAllCustomers, getOneCustomer, register } from "../controller/customer.controller";
import 'express-async-errors'

const customerRouter = Router()

customerRouter.get('/', getAllCustomers)
customerRouter.get('/:id', getOneCustomer)
customerRouter.post('/', register)
// customerRouter.put('/:id', modifyCustomer)
// customerRouter.delete('/:id', deleteCustomer)

export { customerRouter }