import { Router } from "express";
import { customerRouter } from "./customer.routes";
import { loginRouter } from "./login.routes";
import { authRouter } from "./auth.routes";
import { managerRouter } from "./manager.routes";


const indexRouter = Router();

indexRouter.use("/customer", customerRouter)
indexRouter.use("/login", loginRouter)
indexRouter.use("/auth", authRouter)
indexRouter.use("/manager", managerRouter)

export { indexRouter }

