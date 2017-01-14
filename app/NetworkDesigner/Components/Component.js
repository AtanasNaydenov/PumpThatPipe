function Dimensions(x,y)
{
    this.x=x;
    this.y=y;
    this.width=2;
    this.height=3;
    this.margin=4;
}

class Component extends Part {

    constructor(maxNrInp,currentamount) {
        super(maxNrInp);
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
            {   this.inputParts.splice(i,1);
                break;
            }

    }
    RemoveOutput(pipeline)
    {
        for(let i=0;i<outputParts.length;i++)
            if(outputParts[i].id==pipeline.id)
            {   inputParts.splice(i,1);
                break;
            }

    }
    AddInput(pipeline)
    {
        inputParts.push(pipeline);
    }
    AddOutput(pipeline)
    {
        outputParts.push(pipeline);
    }
    RemovePipelines(pipelines)
    {
        this.outputParts=[];
        this.inputParts=[];

        for(let pipeline in pipelines)
            pipeline.Detach();
    }
}


