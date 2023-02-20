import { Router } from "express";
import "express-async-errors"
import { getAuthentication } from "../controller/auth.controller";

const authRouter = Router();

authRouter.get("/:id", getAuthentication)

export { authRouter }
