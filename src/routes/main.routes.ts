import { Router, Request, Response } from "express";

const mainRouter = Router();

mainRouter.get('/', (request: Request, response: Response) => {
    response.status(200).json({api: 'hublab-chat', version: '0.0.1'});
});

export { mainRouter };
