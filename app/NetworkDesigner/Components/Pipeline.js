//Setting the static variable maxflow of all pipelines
import { Part } from "./Part";

function SetMaxflow(maxfl) {
    Pipeline.maxflow = maxfl;
}
//The Pipe_states enumeration
const Pipe_states = {
    SAFE: 'SAFE',
    ALERTED: 'ALERTED',
    WARNING: 'WARNING',
    URGENT: 'URGENT'
};

class Pipeline extends Part {
    constructor(maxNrInp, curflow) {
        super(maxNrInp); // this is constantly 1,1
        this.currentflow = curflow;
        SetMaxflow();
        this.UpdateState();
    }

    UpdateState() {
        if (this.currentflow > this.maxflow)
            this.state = Pipe_states.URGENT;
        else
            if (this.currentflow > 0.8 * this.maxflow && this.currentflow < this.maxflow)
                this.state = Pipe_states.WARNING;
            else
                if (this.currentflow > 0.5 * this.maxflow && this.currentflow < 0.8 * this.maxflow)
                    this.state = Pipe_states.ALERTED;
                else
                    this.state = Pipe_states.SAFE;
    }
    // needs to check if the component is really a component
    SetStartingComponent(component) {
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
        return outputParts[0];
    }
    GetEndComponent() {
        return inputParts[0];
    }
    Detach() {
        updateConnections(this.outputParts[0]);

        this.outputParts = [];
        this.inputParts = [];
    }

    updateConnections(part) {
        if (part instanceof Pipeline()) {
            part.UdpdateFlow(part.Inputs[0].GetOutFlow());
            return updateConnections(part.outputParts[0]);
        } else {
            // assuming component
            part.CurrentAmount = part.GetInflow();
            for (let i = 0; i < part.outputParts.len; i++) {
                return updateConnections(part.outputParts[i]);
            }
            // safely return a blocking result
            return 'halted';
        }
    }

    static SetMaxflow(maxfl) {
        Pipeline.maxflow = maxfl;
    }

    Swap() { }

    Contains(x, y) {

    }
}

export { SetMaxflow, Pipeline, Pipe_states };