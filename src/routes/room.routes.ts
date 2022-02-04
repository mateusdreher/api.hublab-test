import { RoomController } from "@controllers/room.controller";
import { Router, Request, Response } from "express";

const roomRouter = Router();

roomRouter.post('/', (request: Request, response: Response) => {
    return new RoomController().create(request, response);
});

roomRouter.get('/all', (request: Request, response: Response) => {
    return new RoomController().getAll(request, response);
});

export { roomRouter };