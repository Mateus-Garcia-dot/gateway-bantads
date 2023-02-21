import { Router } from "express";
import { createManager, deleteManager, getAllManagers, getManager, updateManager } from "../controller/manager.controller";

const managerRouter = Router()

managerRouter.get('/', getAllManagers)
managerRouter.get('/:id', getManager)
managerRouter.post('/', createManager)
managerRouter.patch('/:id', updateManager)
managerRouter.delete('/:id', deleteManager)

export { managerRouter }