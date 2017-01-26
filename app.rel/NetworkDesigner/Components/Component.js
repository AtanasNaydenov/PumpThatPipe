// import { Part } from "./Part";
// import { Pipeline } from "./Pipeline";

function Dimensions(x, y) {
    // arbitrary numbers
    let _w = 10,
        _h = 10,
        _m = 2;


    this.X = x;
    this.Y = y;
    this.Width = _w;
    this.Height = _h;
    this.Margin = _m;
}

class Component extends Part {

    constructor(maxNrInp, maxNrOutp, currentamount, nodeKey) {
        super(maxNrInp, maxNrOutp, nodeKey);
        this.currentAmount = currentamount;
    }

    SetLocation(x, y) {
        this.location = new Dimensions(x, y);
    }

    GetInflow() {
        let sum = 0;
        for (let i = 0; i < this.inputParts.length; i++) {
            // console.log("getting inflow");
            // console.dir(this.inputParts[i]);
            sum = sum + this.inputParts[i].currentflow;
        }

        return sum;
    }
    GetOutflow() { // this doesn't really make sense unfortunately
        let sum = 0;
        for (let i = 0; i < this.outputParts.length; i++) {
            // console.log("getting outflow");
            // console.dir(this.outputParts[i]);
            sum = sum + this.outputParts[i].currentflow;
        }

        return sum;
    }
    RemoveInput(pipeline) {
        for (let i = 0; i < this.inputParts.length; i++){
            if (this.inputParts[i].id == pipeline.id) {
                this.inputParts.splice(i, 1);
                break;
            }
        }
    }
    RemoveOutput(pipeline) {
        console.log("part to remove: ");
        console.dir(pipeline);
        console.log("this outputParts");
        console.log(this.outputParts.length);
        for (let i = 0; i < this.outputParts.length; i++)
        { 
            // console.log(this.outputParts[i].id);
            // console.log(this.pipeline.id);
            console.log(i);
            if (this.outputParts[i].id === pipeline.id) {
                
                this.outputParts.splice(i, 1);
                return true;
            }
        }
        return false;
    }
    AddInput(pipeline) {
        // console.log("addInput parameter:")
        // console.dir(pipeline);
        // console.log("is a pipeline?: ");
        // console.log(pipeline instanceof Pipeline)
        // console.log("maximum number of inputs: "+this.maxNrInputs);
        // console.log("current number of inputs: "+this.inputParts.length);
        if (
            pipeline instanceof Pipeline // we work only with PLs
            &&
            (
                this.maxNrInputs == -1 // infinite inputs
                ||
                this.inputParts.length < this.maxNrInputs
            )
        ) {
            this.inputParts.push(pipeline);
            this.currentAmount = this.GetInflow(); // that's wise
            return true;
        }
        return false;
    }
    AddOutput(pipeline) {
        if (
            pipeline instanceof Pipeline
            &&
            (
                this.maxNrOutputs == -1 // infinite outputs
                ||
                this.outputParts.length < this.maxNrOutputs
            )
        ) {
            this.outputParts.push(pipeline);
            pipeline.UpdateFlow(this.GetOutflow()); // it should conduct
            console.log("conducted flow: " + pipeline.currentflow);
            return true;
        }
        return false;
    }

    RemovePipelines() {
        let linkedPipes = {};
        linkedPipes.inputParts = this.inputParts;
        linkedPipes.outputParts = this.outputParts;

        var pipelines = this.outputParts.concat(this.inputParts);

        for(let i=0; i<pipelines.length; i++)
            pipelines[i].Detach();


        this.outputParts = [];
        this.inputParts = [];

        return linkedPipes;
    }

    Contains(x, y) {
        let _dim = this.location;
        // the contains condition
        if (
            (_dim.X + _dim.Width + _dim.Margin > x)
            &&
            (_dim.X - _dim.Margin < x)
            &&
            (_dim.Y + _dim.Height + _dim.Margin > y)
            &&
            (_dim.Y - _dim.Margin < y)
        ) {
            return true;
        }
        return false;
    }
}

// export { Dimensions, Component };
