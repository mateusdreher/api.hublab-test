import { IRepository } from "@intefaces/repository.interface";

export class RoomService {

    constructor(private repository: IRepository) {}

    async createRoom(name: string) {
        return await this.repository.create({name});
    }
    async getRoom(name: string) {
        const room = await this.repository.findOne('name', name);
        
        if(!room) {
            await this.createRoom(name);
            return;
        }
        return room;
    }

    async getRooms() {
        return await this.repository.findAll();
    }
    
}