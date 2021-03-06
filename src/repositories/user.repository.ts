import { IQuery } from '@dtos/query.dto';
import { UserCreateDto } from '@dtos/user/user-create.dto';
import { UserResponseDto } from '@dtos/user/user-response.dto';
import { UserUpdateDto } from '@dtos/user/user-update.dto';
import { IRepository } from '@intefaces/repository.interface';
import userModel from 'models/user.model';

export class UserRepository implements IRepository {
    private model = userModel;

    constructor() {}

    async create(user: UserCreateDto): Promise<UserResponseDto | undefined> {
        return await this.model.create(user);
    }
    async delete(_id: string): Promise<UserResponseDto | undefined> {
        return await this.model.remove({_id});
    }
    async update(_id: string, user: UserUpdateDto): Promise<UserResponseDto | undefined> {
        return await this.model.findOneAndUpdate({_id}, user);
    }
    async findOne(field: string, value: string): Promise<UserResponseDto | undefined> {
        let query: IQuery = {};        
        query[field] = value;

        return await userModel.findOne(query);
    }
    async findMany(field: string, param: any): Promise<UserResponseDto[]> {
        let query: IQuery = {};        
        query[field] = param;

        return await this.model.find(query);
    }
    async findAll(): Promise<UserResponseDto[] | undefined> {
        return await this.model.find();
    }
}