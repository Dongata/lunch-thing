import { parse } from "querystring";

export class Setting{
    public clusterEnabled : number;
    public masterPort : number;
    public workerPort : number;
    public serverCores : number;
    public queueLength : number;
    public serverName : string;
    public environment : string;
    public hostName : string;
    public clusterAccessKey : string;

    public accept(name : string, value : string) : void{
        switch (name) {
            case "clusterEnabled":
                this.clusterEnabled = parseInt(value);
                break;
            
            case "masterPort":
                this.masterPort = parseInt(value);
                break;

            case "workerPort":
                this.workerPort = parseInt(value);
                break;

            case "queueLength":
                this.queueLength = parseInt(value);
                break;

            case "serverCores":
                this.serverCores = parseInt(value);
                break;
            
            case "environment":
                this.environment = value;
                break;

            case "serverName":
                this.serverName = value;
                break;
            
            case "clusterAccessKey":
                this.clusterAccessKey = value;
                break;

            case "hostName":
                this.hostName = value;
                break;
            
            default:
                break;
        }
    }
}