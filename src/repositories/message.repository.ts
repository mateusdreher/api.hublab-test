import { IQuery } from '@dtos/query.dto';
import { MessageDto } from '@dtos/chat/message.dto';
import { IRepository } from '@intefaces/repository.interface';
import messageModel from 'models/message.model';

export class MessageRepository implements IRepository {
    private model = messageModel;

    constructor() {}

    async create(message: MessageDto): Promise<MessageDto | undefined> {
        return await this.model.create(message);
    }
    async delete(_id: string): Promise<MessageDto | undefined> {
        return await this.model.remove({_id});
    }
    async update(_id: string, message: MessageDto): Promise<MessageDto | undefined> {
        return await this.model.findOneAndUpdate({_id}, message);
    }
    async findOne(field: string, value: string): Promise<MessageDto | undefined> {
        let query: IQuery = {};        
        query[field] = value;

        return await this.model.findOne(query);
    }
    async findMany(field: string, param: any): Promise<MessageDto[]> {
        let query: IQuery = {};        
        query[field] = param;

        return await this.model.find(query);
    }
    async findAll(): Promise<MessageDto[] | undefined> {
        return await this.model.find();
    }
}