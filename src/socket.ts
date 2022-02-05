import { MessageDto } from "@dtos/chat/message.dto";
import { RoomDto } from "@dtos/chat/room.dto";
import { MessageRepository } from "repositories/message.repository";
import { RoomRepository } from "repositories/room.repository";
import { MessageService } from "services/message.service";
import { RoomService } from "services/room.service";
import { Server } from "socket.io";

export function socketConnect(io: Server) {
    io.on("connection", async (socket) => {
        const sentRoom = socket.handshake.query.room as string | undefined;
        const userName = socket.handshake.query.name as string | undefined;
    
        if (!sentRoom || !sentRoom.length) {
            console.log('Conexão rejeitada, nenhuma sala selecionada')
            socket.disconnect();
        }
        else {
            console.log(`${userName} conectado a sala ${sentRoom}`);
            io.sockets.emit('newUser', userName);

            const room: RoomDto = await new RoomService(new RoomRepository()).getRoom(sentRoom);
            socket.join(room.name);
            socket.to(room.name).emit(`${userName} e conectou a sala ${room.name}`);
            
            // Recupera mensagens antigas
            const previousMessages = await new MessageService(new MessageRepository()).getPreviousMessages(room.name);
            socket.emit('previousMessages', previousMessages);
    
    
            socket.on("newMessage", async (data: MessageDto) => {
                data.room = room.name;
                await new MessageService(new MessageRepository()).saveMessage(data);
                
                // Envia para todos os sockets conectados
                socket.broadcast.emit('receivedMessage', data); 
            });

            socket.on('disconnecting', (reason) => {
                io.sockets.emit('disconnectedUser', userName)
            })
        }
        
    });
}