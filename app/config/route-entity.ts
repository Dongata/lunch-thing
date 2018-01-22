import { HttpVerbEnum } from "./HttpVerbEnum";

export class Route{
    
    public route : string;
    public action : string;
    public method : HttpVerbEnum;
    public controller : string;
    
}