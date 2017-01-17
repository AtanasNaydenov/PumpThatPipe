import {Component} from "./Component";

class Pump extends Component{
    constructor(currentamount) {
        // 0 - 0 inputs for the pumps, and -1 - infinite number of outputs for it
        super(0,-1, currentamount);
    }
    SetOutflow(x){
        if(x<=this.maxFlow){
            this.outflow = x;
            return true
        }
        else{
            return false;
        }
    }
    static SetMaximumFlow(x){
        Pump.maxFlow = x;
    }
    GetMaximumFlow(){
        return Pump.maxFlow;
    }
    //we have made a mistake in the design document
    GetInflow(){
        return 0;
    }

    GetOutflow(){
        return this.outflow;
    }
}
Pump.maxFlow = 0;

export {Pump}