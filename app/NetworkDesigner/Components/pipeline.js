class Pipeline extends Part
{
    
    //To be implemented later
    static maxflow;
    //var currentflow;
    //var state;
    
    constructor(maxfl,curflow,)
    {
        super();
        SetMaxFlow(maxfl);
        this.currentflow=curflow;
        UpdateState();
    }
    
    
    UpdateState(){
        if(currentflow>maxflow)
            state=Pipe_states.URGENT;
        else
            if(currentflow>0.8*maxflow &&currentflow<maxflow)
                state=Pipe_states.WARNING;
            else
                if(currentflow>0.5*maxflow && currentflow<0.8*maxflow)
                    state=Pipe_states.ALERTED;
            else
                state=Pipe_states.SAFE;
    }
    SetStartingComponent(component){
        outputParts.push(component);
    }
    SetEndComponent(component){
        inputParts.push(component);
    }
    UpdateFlow(flow){
        this.currentflow=flow;
    }
    SetMaxFlow(maxflow){
        this.maxflow=maxflow;
    }
    GetStartingComponent(){
        return outputParts;
    }
    GetEndComponent(){
        return inputParts;
    }
    Detach(){}
    Swap(){}

    Contains(x,y){}
}

//The Pipe_states enumeration
var Pipe_states = {
    SAFE: 'SAFE',
    ALERTED: 'ALERTED',
    WARNING: 'WARNING',
    URGENT: 'URGENT'
};