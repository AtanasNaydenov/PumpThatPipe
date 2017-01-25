import {Component} from "./Component";

class Pump extends Component{
    constructor(currentamount, nodeKey) {
        // 0 - 0 inputs for the pumps, and 1 - 1 output for it
        super(0,1,currentamount, nodeKey);
        this.SetOutflow(currentamount);
    }
    SetOutflow(x){
        if(x<=Pump.maxFlow){
            this.currentAmount = x;
            return true
        }
        else{
            this.currentAmount = Pump.maxFlow;
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
        return this.currentAmount;
    }

    GetOutflow(){
        return this.currentAmount;
    }
}
Pump.maxFlow = 80;

export {Pump}