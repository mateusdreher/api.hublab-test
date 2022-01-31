import { UserCreateDto } from '@dtos/user/user-create.dto';
import { UserResponseDto } from '@dtos/user/user-response.dto';
import { UserUpdateDto } from '@dtos/user/user-update.dto';
import { IRepository } from '@intefaces/repository.interface';
import UserModel from 'models/user.model';

export class UserRepository implements IRepository {
    document = new UserModel();

    constructor() {

    }
    async create(user: UserCreateDto): Promise<UserResponseDto | undefined> {
        return await this.document.save(user);
    }
    async delete(_id: string): Promise<UserResponseDto | undefined> {
        return await this.document.deleteOne({_id});
    }
    async update(_id: string, user: UserUpdateDto): Promise<UserResponseDto | undefined> {
        return await this.document.updateOne({_id}, user);
    }
    async findOne(_id: string): Promise<UserResponseDto | undefined> {
        return await this.document.findOne({_id});
    }
    async findAll(): Promise<UserResponseDto[] | undefined> {
        return await this.document.find();
    }
}