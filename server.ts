import { Settings } from './app/config/settings/settings';
import { clusterService } from 'cluster-service';
import { Worker } from './app/config/worker-config';
import { Setting } from './app/config/settings/Setting';

var settings = new Settings(process.argv);
var worker;
if(settings.setting.clusterEnabled === 1) {
    clusterService.start({     
        workers: worker = new Worker(settings),
        accessKey: settings.setting.clusterAccessKey,
        host: settings.setting.hostName,
        port: settings.setting.masterPort 
    });
} else {
  worker = new Worker(settings);
}
