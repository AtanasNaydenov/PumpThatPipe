class AdjustableSplitter extends Splitter
{
    constructor(maxNrInp,currentamount,percentage)
    {
        super(maxNr,currentamoun,percentage);
    }
    SetPercentage(perc)
    {
        let inflow=this.GetInflow();
        outputParts[0].UpdateFlow(0.3*inflow);
        outputParts[1].UpdateFlow(0.7*inflow);
    }
}