import { Router } from "express";
import { addCustomer, deleteCustomer, getAllCustomers, getOneCustomer, modifyCustomer } from "../controller/customer.controller";
import 'express-async-errors'

const customerRouter = Router()

customerRouter.get('/', getAllCustomers)
customerRouter.get('/:id', getOneCustomer)
customerRouter.post('/', addCustomer)
customerRouter.put(':/id', modifyCustomer)
customerRouter.delete(':/id', deleteCustomer)

export { customerRouter }