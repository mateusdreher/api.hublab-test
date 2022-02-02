import { UserCreateDto } from "@dtos/user/user-create.dto";
import { IRepository } from "@intefaces/repository.interface";
import * as bcrypt from 'bcrypt';
import * as authData from '../../auth.json';

export class UserService {
    constructor(private repository: IRepository) {}

    async createUser(dto: UserCreateDto) {
        const emailAlreadyExists = await this.repository.findOne('email', dto.email);
        if (emailAlreadyExists) {
            throw 'Email already exists'
        }
        
        dto.password = await bcrypt.hash(dto.password, process.env.SALT_ROUNDS || authData.salt_rounds);

        return await this.repository.create(dto);
    }
}