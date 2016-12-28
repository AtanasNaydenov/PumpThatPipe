class Pipeline extends Part{
    
    //To be implemented later
    var maxflow;
    var currentflow;
    var state;
    
    constructor()
    {
        
    }
    
    
    void function UpdateState(){}
    function SetStartingComponent(component){}
    function SetEndComponent(component){}
    void function UpdateFlow(flow){
        this.currentflow=flow;
    }
    void SetMaxFlow(maxflow){
        this.maxflow=maxflow;
    }
    function GetStartingComponent(){}
    function GetEndComponent(){}
    function Detach(){}
    function Swap(){}
    
    function Contains(x,y){}
}

//The Pipe_states enumeration
var Pipe_states = {
    SAFE: 'SAFE',
    ALERTED: 'ALERTED',
    WARNING: 'WARNING',
    URGENT: 'URGENT'
};