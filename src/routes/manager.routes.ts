import { Router } from "express";
import { createManager, deleteManager, getAllManagers, getManager, managerConsumer, updateManager } from "../controller/manager.controller";

const managerRouter = Router()

managerRouter.get('/account', managerConsumer)
managerRouter.get('/', getAllManagers)
managerRouter.get('/:id', getManager)
managerRouter.post('/', createManager)
managerRouter.patch('/:id', updateManager)
managerRouter.delete('/:id', deleteManager)

export { managerRouter }