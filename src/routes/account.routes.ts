import { Router } from "express";
import { deposit, withdraw, transfer } from "../controller/account.controller";

const accountRouter = Router();

accountRouter.post('/deposit/:id', deposit)
accountRouter.post('/withdraw/:id', withdraw)
accountRouter.post('/transfer/:id', transfer)

export { accountRouter }

