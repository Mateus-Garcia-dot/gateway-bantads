import { Router } from "express";
import { customerRouter } from "./customer.routes";
import { loginRouter } from "./login.routes";
import { authRouter } from "./auth.routes";
import { managerRouter } from "./manager.routes";
import { accountRouter } from "./account.routes";


const indexRouter = Router();

indexRouter.use("/customer", customerRouter)
indexRouter.use("/login", loginRouter)
indexRouter.use("/auth", authRouter)
indexRouter.use("/manager", managerRouter)
indexRouter.use('/account', accountRouter)

export { indexRouter }

