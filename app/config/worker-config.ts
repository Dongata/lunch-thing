import { Server } from 'http';
import { Express, Application } from 'express';
import { json } from 'body-parser';
import { RouteConfig } from './route-config';
import { Settings } from './settings/Settings'
import { appendFile } from 'fs';
import { Setting } from './settings/Setting';

export class Worker {
    public application : Express;
    private settings : Settings;
    private routeConfig : RouteConfig;

    constructor(settings : Settings){
        this.application = require('express')();
        this.settings = settings;
        this.routeConfig = new RouteConfig(this.settings);
        this.configureApplication();
        this.configureRoutes();

        this.startServer();
    }

    private configureApplication() : void{
        this.application.use(json);
        this.application.use(this.jsonNoCache);
    }

    private jsonNoCache(req : any, res : any, next : any){
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');
        res.type('application/json');
        next();
    }

    private configureRoutes(){
        this.routeConfig.registerRoutes(this.application);
    }

    private startServer(){
        var server : Server = new Server(this.application);

        server.listen(
            this.settings.setting.workerPort, 
            this.settings.setting.hostName, 
            this.settings.setting.queueLength, 
            () => console.log(`listening at http://${this.settings.setting.hostName}:${this.settings.setting.workerPort}`)
        );
    }
}