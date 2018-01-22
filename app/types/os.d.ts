declare module "os"{
    interface osStatic {
        hostName() : string;
        cpus():any;
    }
    export var os : osStatic;
    export var eol : string;
}