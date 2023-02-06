import { Router } from "express";
import { customerRouter } from "./customer.routes";


const indexRouter = Router();

indexRouter.use("/customer", customerRouter)

export { indexRouter }

