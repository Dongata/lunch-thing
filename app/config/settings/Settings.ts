import { os } from 'os';
import { Setting } from './Setting';

export class Settings {
    public setting : Setting;

    public constructor(commandLineArgs : Array<string>) {
        this.setting = new Setting();
        
        this.setting.clusterEnabled = commandLineArgs[2] ? parseInt(commandLineArgs[2]) : 0;
        this.setting.environment = commandLineArgs[3] ? commandLineArgs[3].toLowerCase() : 'prod';
        this.setting.hostName = commandLineArgs[4] ? commandLineArgs[4] : '127.0.0.1';
        this.setting.masterPort =  commandLineArgs[5] ? parseInt(commandLineArgs[5]) : 3000;
        this.setting.workerPort =  commandLineArgs[6] ? parseInt(commandLineArgs[6]) : 9000;
        this.initializeSettings(this.setting);
    }

    private initializeSettings(setting : Setting){
        this.loadConfigSettings(setting);
        this.loadServerSettings(setting);
    }

    private loadConfigSettings(setting : Setting){
        var config = this.loadEnvironmentConfigFile(setting.environment);
        for (let i = 0; i < config.length; i++) {
            if(config[i].name && config[i].value){
                setting.accept(config.name, config.value);
            }
            
        }
    }

    private loadServerSettings(setting : Setting){
        setting.serverName = os.hostName().toLowerCase();
        setting.serverCores = os.cpus().length;
    }
    
    private loadEnvironmentConfigFile(env : string)
    {
        var config : any;
        var configLocation : string = "";
        if(env === 'prod'){
            configLocation = './settings.dev.json';
        }

        if(env === 'dev'){
            configLocation = './settings.dev.json';
        }

        if(env === 'test'){
            configLocation = './settings.dev.json';
        }

        try{
            config = module.require(configLocation);
        }
        catch(e){
            throw `unable to parse ${configLocation}`;
        }

        if(!config.settings){
            throw `Property "settings" is not defined on ${configLocation}`;
        }

        return config.settings;
    }
}