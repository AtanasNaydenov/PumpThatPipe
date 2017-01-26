//Setting the static variable maxflow of all pipelines
// import { Part } from "./Part";

function SetMaxflow(maxfl) {
    Pipeline.maxflow = maxfl;
}
//The Pipe_states enumeration
const Pipe_states = {
    SAFE: 'SAFE', // current_amount < 50% of maxflow
    ALERTED: 'ALERTED', // current_amount in 50% - 80% of maxflow
    WARNING: 'WARNING', // current_amount in 80% - 100% of maxflow
    URGENT: 'URGENT' // current_amount > 100% of maxflow
};




class Pipeline extends Part {
    constructor(curflow, nodeKey) {
        super(1, 1, nodeKey); // this is constantly 1,1
        this.currentflow = curflow;
        // Pipeline.LocSetMaxflow(); -> this is not supposed to be here
        this.UpdateState();
    }

    static getState(flow) {
        if (flow > Pipeline.maxflow) // the problem was here - now we use the camelcase to refer to PL.maxFlow
            return Pipe_states.URGENT;
        else
            if (flow > 0.8 * Pipeline.maxflow && flow <= Pipeline.maxflow) // this.currentflow <= this.maxflow otherwise if cur = max it's considered safe
                return Pipe_states.WARNING;
            else
                if (flow > 0.5 * Pipeline.maxflow && flow <= 0.8 * Pipeline.maxflow)
                    return Pipe_states.ALERTED;
                else
                    return Pipe_states.SAFE;
    }

    UpdateState() {
        if (this.currentflow > this.maxFlow) // the problem was here - now we use the camelcase to refer to PL.maxFlow
            this.state = Pipe_states.URGENT;
        else
            if (this.currentflow > 0.8 * this.maxFlow && this.currentflow <= this.maxFlow) // this.currentflow <= this.maxflow otherwise if cur = max it's considered safe
                this.state = Pipe_states.WARNING;
            else
                if (this.currentflow > 0.5 * this.maxFlow && this.currentflow <= 0.8 * this.maxFlow)
                    this.state = Pipe_states.ALERTED;
                else
                    this.state = Pipe_states.SAFE;
    }
    // needs to check if the component is really a component
    SetStartingComponent(component) {
        //checks for whether it is possible to add should be done prior to this method call
        this.inputParts.push(component);
    }
    SetEndComponent(component) {
        this.outputParts.push(component);
    }
    UpdateFlow(flow) {
        this.currentflow = flow;
        this.UpdateState();
    }
    GetStartingComponent() {
        return this.inputParts[0]; // this is an input
    }
    GetEndComponent() {
        return this.outputParts[0];
    }
    Detach() {

        console.log(this.StartComponent.RemoveOutput(this));
        // console.log("sc")
        // console.log(this.StartComponent);
        // console.log(_remRes);
        // console.log("ec");
        // console.log(this.EndComponent);
        this.EndComponent.RemoveInput(this);
        console.log("this");
        console.log(this);
        this.updateConnections(this.outputParts[0]);

        this.outputParts = [];
        this.inputParts = [];
    }

    updateConnections(part) {
        try { // It's easier to ask forgiveness than it is to get permission.
            console.log("updateflow called");
            if (part instanceof Pipeline) {
                part.UpdateFlow(part.inputParts[0].GetOutflow());
                return part.updateConnections(part.outputParts[0]);
            } else {
                // assuming component
                part.currentAmount = part.GetInflow();
                for (let i = 0; i < part.outputParts.length; i++) {
                    return part.outputParts[i].updateConnections(part.outputParts[i]);
                }
                // safely return a blocking result
                return 'halted';
            }
        } catch (e) {
            return [e, "excpetion"];
        }

    }
    //TO DO
    Swap() { }

    // added those methods to for an ~easy~ (yeah, sure...) workaround 
    // this works like global SetMaxflow method - which is not very nice to have, 
    // as the name can be confused with smthng else
    static LocSetMaxflow(maxfl) {
        Pipeline.maxflow = maxfl;
    }
    // same as LocSetMaxflow, but through a setter
    set maxFlow(maxfl) {
        Pipeline.maxflow = maxfl;
    }
    // this getter allows the pipeline to access it's property of maximum flow like:
    // _pl.maxFlow
    // it will return the global setting for a PipeLine
    get maxFlow() {
        return Pipeline.maxflow;
    }

    // to get the starting component easily
    get StartComponent() {
        return this.inputParts[0];
    }

    get EndComponent() {
        return this.outputParts[0];
    }
    
    get state(){
        this.UpdateState();
        return this._State;
    }

    set state(value){
        this._State = value;
    }

    Swap() { }
    Contains(x, y) {

    }
}
Pipeline.maxflow = 20; // by default


// export { SetMaxflow, Pipeline, Pipe_states };