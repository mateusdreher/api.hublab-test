import { Router, Request, Response } from "express";
import { UserController } from "@controllers/user.controller";

const userRouter = Router();

userRouter.post('/', (request: Request, response: Response) => {
    return new UserController().create(request, response);
});

export { userRouter };