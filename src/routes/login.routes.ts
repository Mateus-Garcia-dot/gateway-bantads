import { Router } from "express";
import { login } from "../controller/login.controller";
import "express-async-errors"

const loginRouter = Router();

loginRouter.post("/", login)

export { loginRouter }

