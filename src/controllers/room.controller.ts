import { Request, Response } from 'express';
import { RoomService } from "services/room.service";
import { RoomRepository } from "repositories/room.repository";

export class RoomController {
    private roomService: RoomService;

    constructor () {
        this.roomService = new RoomService(new RoomRepository());
    }

    async create(request: Request, response: Response) {
        try {
            const { name } = request.body;

            if (!name || !name.length) {
                throw 'Invalid payload'
            }

            const room = await this.roomService.createRoom(name);
            
            return response.json({message: 'Room created successfully', room});
        }
        catch(error) {
            return response.status(400).json({error});
        }
    }

    async getAll(request: Request, response: Response) {
        try {

            const rooms = await this.roomService.getRooms();
            
            return response.json(rooms);
        }
        catch(error) {
            return response.status(400).json({error});
        }
    }
}