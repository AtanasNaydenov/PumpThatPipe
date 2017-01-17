// we should change the name of this file to be with an underscore
import {Splitter} from "./Splitter";

class AdjustableSplitter extends Splitter
{
    constructor(currentamount,percentage)
    {
        super(currentamount);
        this.percentage = percentage;
    }
    SetPercentage(perc)
    {
        let inflow=this.GetInflow();
        outputParts[0].UpdateFlow(0.3*inflow);
        outputParts[1].UpdateFlow(0.7*inflow);
    }
}

export {AdjustableSplitter};