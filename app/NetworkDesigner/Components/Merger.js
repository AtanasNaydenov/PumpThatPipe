import {Component} from "./Component";

class Merger extends Component {
    constructor(currentamount, nodeKey) {
        super(2,1,currentamount, nodeKey); // 2 ins and 1 out by design
    }
    
    GetOutflow(){
        // since it should return everything it gets from the pipelines, the 
        // logical behaviour would be to return the complete incoming flow
        return this.GetInflow();
    }
}

export {Merger};
