import { MessageDto } from "@dtos/chat/message.dto";
import { RoomDto } from "@dtos/chat/room.dto";
import { MessageRepository } from "repositories/message.repository";
import { RoomRepository } from "repositories/room.repository";
import { MessageService } from "services/message.service";
import { RoomService } from "services/room.service";
import { Server } from "socket.io";

export function socketConnect(io: Server) {
    let users: string[] = [];
    io.on("connection", async (socket) => {
        const sentRoom = socket.handshake.query.room as string | undefined;
        const userName = socket.handshake.query.name as string | undefined;
    
        if (!sentRoom || !sentRoom.length) {
            console.log('Conexão rejeitada, nenhuma sala selecionada')
            socket.disconnect();
        }
        else {
            const room: RoomDto = await new RoomService(new RoomRepository()).getRoom(sentRoom);
            console.log(`${userName} conectado a sala ${room.name}`);
            userName ? users.push(userName) : '';

            socket.join(room.name);
            

            // Eventos:
            //Novo usuário
            io.sockets.emit('newUser', userName);

            // Recupera mensagens antigas
            const previousMessages = await new MessageService(new MessageRepository()).getPreviousMessages(room.name);
            socket.emit('previousMessages', previousMessages);
            socket.emit('loggedUsers', users);
    
            // Nova mensagem
            socket.on("newMessage", async (data: MessageDto) => {
                data.room = room.name;
                await new MessageService(new MessageRepository()).saveMessage(data);
                
                // Envia para todos os sockets conectados
                socket.broadcast.emit('receivedMessage', data); 
            });

            // Usuário desconectado
            socket.on('disconnecting', (reason) => {
                io.sockets.emit('disconnectedUser', userName)
                users = users.filter(u => u != userName);
            });
        }
        
    });
}