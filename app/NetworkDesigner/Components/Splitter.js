import {Component} from "./Component";

class Splitter extends Component
{
    
    constructor(currentamount, nodeKey)
    {
        super(1,2,currentamount, nodeKey); // splitters acccept 1 input and 2 outputs
        this.percentage=50; // splitters get 50 percent by default
    }

    GetOutflow(){
        return this.currentAmount * 0.5;
    }
}

export {Splitter};