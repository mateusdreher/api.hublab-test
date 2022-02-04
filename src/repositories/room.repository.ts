import { IQuery } from '@dtos/query.dto';
import { RoomDto } from '@dtos/chat/room.dto';
import { IRepository } from '@intefaces/repository.interface';
import roomModel from 'models/room.model';

export class RoomRepository implements IRepository {
    private model = roomModel;

    constructor() {}

    async create(room: RoomDto): Promise<RoomDto | undefined> {
        return await this.model.create(room);
    }
    async delete(_id: string): Promise<RoomDto | undefined> {
        return await this.model.remove({_id});
    }
    async update(_id: string, room: RoomDto): Promise<RoomDto | undefined> {
        return await this.model.findOneAndUpdate({_id}, room);
    }
    async findOne(field: string, value: string): Promise<RoomDto | undefined> {
        let query: IQuery = {};        
        query[field] = value;

        return await this.model.findOne(query);
    }
    async findMany(field: string, param: any): Promise<RoomDto[]> {
        let query: IQuery = {};        
        query[field] = param;

        return await this.model.find(query);
    }
    async findAll(): Promise<RoomDto[] | undefined> {
        return await this.model.find();
    }
}