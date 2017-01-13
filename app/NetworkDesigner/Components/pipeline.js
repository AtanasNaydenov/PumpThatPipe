//Setting the static variable
function SetMaxflow(maxfl)
{
    Pipeline.maxflow=maxfl;
}
//The Pipe_states enumeration
const Pipe_states = {
    SAFE: 'SAFE',
    ALERTED: 'ALERTED',
    WARNING: 'WARNING',
    URGENT: 'URGENT'
};


class Pipeline extends Part
{
    constructor(curflow,)
    {
        super();
        this.maxflow=0;
        this.currentflow=curflow;
        SetMaxflow();
    }
    UpdateState(){
        if(this.currentflow>maxflow)
            this.state=Pipe_states.URGENT;
        else
            if(this.currentflow>0.8*maxflow && this.currentflow<maxflow)
                this.state=Pipe_states.WARNING;
            else
                if(this.currentflow>0.5*maxflow && this.currentflow<0.8*maxflow)
                    this.state=Pipe_states.ALERTED;
            else
                this.state=Pipe_states.SAFE;
    }
    SetStartingComponent(component){
        this.outputParts.push(component);
    }
    SetEndComponent(component){
        this.inputParts.push(component);
    }
    UpdateFlow(flow){
        this.currentflow=flow;
    }
    GetStartingComponent(){
        return outputParts[0];
    }
    GetEndComponent(){
        return inputParts[0];
    }
    Detach(){}
    Swap(){}

    Contains(x,y){}
}
