// we should change the name of this file to be with an underscore
import { Splitter } from "./Splitter";

class AdjustableSplitter extends Splitter {
    //_percentage is set for the 1st connection, the second gets 100-percentage
    constructor(_percentage, currentamount, nodeKey) {
        super(currentamount, nodeKey); // the nr of inputs and outputs is already specified in the splitter super constructor
        console.log(_percentage);
        this.percentage = _percentage;
    }
    UpdatePercentage() {
        let inflow = -1;
        if (outputParts[0] != undefined) {
            inflow = this.GetInflow();
            outputParts[0].UpdateFlow((this.percentage / 100) * inflow);
        }
        if (outputParts[1] != undefined) {
            if (inflow == -1) {
                inflow = this.GetInflow();
            }
            outputParts[1].UpdateFlow((1 - this.percentage / 100) * inflow);
        }
    }

    SetPercentage(perc) {
        this.percentage = perc;
        this.UpdatePercentage();
    }

    GetOutflow(){
        console.log("Getting Outflow of an A.Splitter:")
        let _outflow = 0;
        switch(this.outputParts.length){
            case 0:
                console.log('no inputs');
                return _outflow;
            case 1:
                console.log('only one pl is connected');
                _outflow = this._getFirstOutFlow();
                console.log(_outflow);
                return _outflow;
            case 2:
                console.log('both pls are connected');
                _outflow = this._getSecondOutFlow();
                console.log(_outflow);
                return _outflow;
            default:
                console.log('smth is quite wrong');
                return _outflow;         
        }
    }

    _getFirstOutFlow(){
        return (this.currentAmount/100)*this.percentage;
    }
    _getSecondOutFlow(){
        return (this.currentAmount/100)*(100-this.percentage);
    }
}

export { AdjustableSplitter };