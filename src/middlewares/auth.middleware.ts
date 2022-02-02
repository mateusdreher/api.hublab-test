import {  Request, Response, NextFunction } from 'express';
import * as dataAuth from '../../auth.json'; 
import * as jwt from 'jsonwebtoken';

interface ITokenData { 
    id: string,
    iat: number,
    exp: number
}

export class AuthMiddleware {

    async authenticate(request: Request, response: Response, next: NextFunction): Promise<void | Response> {
        const authHeader = <string>request.headers.authorization || <string>request.headers.auth;

        if (!authHeader) {
            return response.status(401).json('No auth token provided')
        }
        
        const token = authHeader.replace('Bearer', '').trim();
    
        try {
            const data: ITokenData = jwt.verify(token, process.env.SECRET || dataAuth.secret) as ITokenData;
    
            request.user_id = data.id; 
    
            return next();
        }
        catch(error: any) {
            return response.status(401).json({error})
        }
    }
}