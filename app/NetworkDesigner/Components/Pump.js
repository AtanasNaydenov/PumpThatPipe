import {Component} from "./Component";

class Pump extends Component{
    constructor(currentamount) {
        // 0 - 0 inputs for the pumps, and -1 - infinite number of outputs for it
        super(0,-1,currentamount);
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
        return 0;
    }

    GetOutflow(){
        return this.currentAmount;
    }
}
Pump.maxFlow = 80;

export {Pump}