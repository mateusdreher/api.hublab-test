import { RoomController } from "@controllers/room.controller";
import { Router, Request, Response } from "express";
import { AuthMiddleware } from "middlewares/auth.middleware";

const roomRouter = Router();

roomRouter.post('/', new AuthMiddleware().authenticate, (request: Request, response: Response) => {
    return new RoomController().create(request, response);
});

roomRouter.get('/all', new AuthMiddleware().authenticate, (request: Request, response: Response) => {
    return new RoomController().getAll(request, response);
});

export { roomRouter };