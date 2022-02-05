import { MessageDto } from "@dtos/chat/message.dto";
import { IRepository } from "@intefaces/repository.interface";
import { Socket } from "socket.io";

export class MessageService {

    constructor(private repository: IRepository) {}
    async getPreviousMessages(room: string) {
        return await this.repository.findMany('room', room)
    }

    
    async saveMessage(dto: MessageDto) {
        dto.send_at = new Date();

        return await this.repository.create(dto);
    }
    
}