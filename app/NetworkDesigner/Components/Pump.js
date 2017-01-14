class Pump extends Component{
    constructor(maxNrInp,currentamount) {
        super(maxNrInp,currentamount);
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
    SetMaximumFlow(x){
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

