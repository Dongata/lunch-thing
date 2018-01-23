import {Request, Response} from 'express'

export class launchController{
    public get(req : Request, res : Response, next : any){
        res.json('{"asd" : "asd"}');
    }
}