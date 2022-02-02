import { AuthController } from "../controllers/auth.controller";
import { Router, Request, Response } from "express";

const authRouter = Router();

authRouter.post('/', (request: Request, response: Response) => {
    return new AuthController().handle(request, response);
});

export { authRouter };