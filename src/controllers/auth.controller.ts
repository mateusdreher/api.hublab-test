import { AuthService } from "services/auth.service";
import { Request, Response } from 'express';
import { UserRepository } from "repositories/user.repository";

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService(new UserRepository()); 
    }

    async handle(request: Request, response: Response): Promise<any> {
        try {
            const {email, password} = request.body;

            if(!email || !password ) {
                throw 'Invalid payload';
            }
    
            const serviceReturn = await this.authService.auth(email, password);
    
            return response.json({token: serviceReturn});
        }
        catch(error) {
            console.log(error);
            response.status(400).json({error});
        }
       
    }


}