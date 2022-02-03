import { Router, Request, Response } from "express";
import { UserrController } from "@controllers/user.controller";

const userRouter = Router();

userRouter.post('/', (request: Request, response: Response) => {
    return new UserrController().create(request, response);
});

export { userRouter };