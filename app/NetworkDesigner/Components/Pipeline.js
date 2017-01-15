//Setting the static variable maxflow of all pipelines
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
    constructor(maxNrInp,curflow)
    {
        super(maxNrInp);
        this.currentflow=curflow;
        SetMaxflow();
        this.UpdateState();
    }

    UpdateState(){
        if(this.currentflow>this.maxflow)   
            this.state=Pipe_states.URGENT;
        else
            if(this.currentflow>0.8*this.maxflow && this.currentflow<this.maxflow)
                this.state=Pipe_states.WARNING;
            else
                if(this.currentflow>0.5*this.maxflow && this.currentflow<0.8*this.maxflow)
                    this.state=Pipe_states.ALERTED;
            else
                this.state=Pipe_states.SAFE;
    }
    SetStartingComponent(component){
        this.inputParts.push(component);
    }
    SetEndComponent(component){
        this.outputParts.push(component);
    }
    UpdateFlow(flow){
        this.currentflow = flow;
        this.UpdateState();
    }
    GetStartingComponent(){
        return outputParts[0];
    }
    GetEndComponent(){
        return inputParts[0];
    }
    Detach(){
        this.outputParts=[];
        this.inputParts=[];
    }

    //What is this method guys?
    Swap(){}

    Contains(x,y){

    }
}
