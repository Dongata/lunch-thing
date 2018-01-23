import { Route } from "./route-entity";
import { Application } from "express";
import { Settings } from "./settings/Settings";
import { Setting } from "./settings/Setting";

const routes : Array<Route> = require("./route-config.json");

export class RouteConfig{
    private setting : Settings;

    constructor(setting : Settings){
        this.setting = setting;
    }

    public registerRoutes(application : Application){
        
        routes.forEach(route => {
            var controller = this.loadController(route);
            var routePath = this.getRoute(route);
            var method = this.getMethod(route);
            var action = this.getAction(route);

            this.registerRoute(application, controller, routePath, method, action);
        });
    }

    private loadController(route : Route) : any{
        var controller;
        if(!route || !route.controller){
            throw 'undefined "controller" property in /config/route.config.json';
        }
        
        try{
            controller = require(route.controller);
        } catch(e) {
            throw `Unable to load ${route.controller} : ${e}`;
        }

        return controller;
    }

    private getRoute(route : Route) : string{
        if(!route || !route.route || route.route.length === 0) {
            throw 'Undefined or empty "route" property in "lib/config/route.config.json"';
        }
        
        return route.route;
    }

    private getMethod(route : Route) : string{
        if(!route || !route.method || route.method.length === 0){
            throw 'Undefined or empty "method" property in "lib/config/route.config.json"';
        }

        return route.method;
    }

    private getAction(route : Route) : string{
        if(!route || !route.action || route.action.length === 0) {
          return this.getMethod(route).toLowerCase();
        }
        return route.action;
    }

    private registerRoute(application : Application, controller : any, route : string, method : string, action : string) {
        var routeApp : any = application.route(route);
        routeApp[method] = (req : any, res : any, next : any) =>{
            controller[action](req, res, next);
        };
    }
    
    
    private createConfigRoute(application : Application) {
        if(!this.setting){
            var self = this;
            application.route('/config').get(function(req, res, next) {
                res.status(200).json(self.setting);
            });
        }
    }
}