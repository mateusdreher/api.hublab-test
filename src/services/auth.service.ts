import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { IRepository } from "@intefaces/repository.interface";
import * as authData from '../../auth.json';

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

        const token = this.generateToken(user._id);

        return { token, user: user.name };
    }

    generateToken(user_id: string) {
        return jwt.sign({id: user_id}, process.env.SECRET || authData.secret, {
            expiresIn: 3600
        });

    }
}