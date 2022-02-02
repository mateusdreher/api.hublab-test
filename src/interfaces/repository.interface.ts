export interface IRepository {
    findOne(field: string, param: any): Promise<any>;
    findAll(): Promise<any>;
    update(param: any, data:any): Promise<any>;
    delete(param: any): Promise<any>;
    create(data: any): Promise<any>;
}