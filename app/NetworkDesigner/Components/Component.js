import {Part} from "./Part";

function Dimensions(x,y)
{
    this.x=x;
    this.y=y;
    this.width=2;
    this.height=3;
    this.margin=4;
}

class Component extends Part {

    constructor(maxNrInp,maxNrOutp,currentamount) {
        super(maxNrInp,maxNrOutp);
        this.currentAmount = currentamount ;
    }

    SetLocation(x, y) {
        this.location = new Dimensions(x, y);
    }

    GetInflow()
    {
        let sum=0;
        for(let inpipeline in this.inputParts)
            sum=sum+inpipeline.currentflow;

        return sum;
    }
    GetOutflow()
    {
        let sum=0;
        for(let outpipeline in this.outputParts)
            sum=sum+outpipeline.currentflow;

        return sum;
    }
    RemoveInput(pipeline)
    {
        for(let i=0;i<this.inputParts.length;i++)
            if(this.inputParts[i].id==pipeline.id)
            {
                this.inputParts.splice(i,1);
                break;
            }

    }
    RemoveOutput(pipeline)
    {
        for(let i=0;i<outputParts.length;i++)
            if(outputParts[i].id==pipeline.id)
            {
                this.inputParts.splice(i,1);
                break;
            }

    }
    AddInput(pipeline)
    {
        this.inputParts.push(pipeline);
    }
    AddOutput(pipeline)
    {
        this.outputParts.push(pipeline);
    }

    RemovePipelines()
    {
        linkedPipes = {};
        linkedPipes.inputParts = this.inputParts;
        linkedPipes.outputParts = this.outputParts;

        var pipelines=this.outputParts.concat(this.inputParts);

        for(let pipeline in pipelines)
            pipeline.Detach();


        this.outputParts=[];
        this.inputParts=[];

        return linkedPipes;
    }
}

export {Dimensions, Component};
