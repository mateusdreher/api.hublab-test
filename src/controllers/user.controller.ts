import { UserRepository } from "repositories/user.repository";
import { UserService } from "services/user.service";
import { Request, Response } from 'express';

export class UserrController {
    private userService: UserService;

    constructor () {
        this.userService = new UserService(new UserRepository());
    }

    async create(request: Request, response: Response) {
        try {
            const { email, password, name } = request.body;

            if (!email || !password || !name) {
                throw 'Invalid payload'
            }

            const ret = await this.userService.createUser({email, password, name});
            
            return response.json({message: 'User created succesfully', user: ret});
        }
        catch(error) {
            return response.status(400).json({error});
        }
    }
}