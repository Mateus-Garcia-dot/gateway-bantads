import { Router } from "express";
import "express-async-errors"
import { getAuthentication } from "../controller/auth.controller";
import { getPendingAuthentication, patchAuthentication, approveAuthentication, rejectAuthentication } from "../controller/auth.controller";

const authRouter = Router();

authRouter.get("/pending", getPendingAuthentication)
authRouter.post('/approve/:id', approveAuthentication)
authRouter.post('/reject/:id', rejectAuthentication)
authRouter.get("/:id", getAuthentication)
authRouter.patch("/:id", patchAuthentication)


export { authRouter }
