import { UserRepository } from "repositories/user.repository";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { IRepository } from "@intefaces/repository.interface";

export class AuthService {
    constructor(private repoository: IRepository) {}

    async auth(email: string, password: string) {
        const user = await this.repoository.findOne('email', email);
        if (!user) {
            throw 'User does not exists';
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) {
            throw 'Password is invalid'
        }

        return this.generateToken(user._id);
    }

    generateToken(user_id: string) {
        return jwt.sign({id: user_id}, process.env.SECRET || '', {
            expiresIn: 3600
        });

    }
}