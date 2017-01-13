function Dimensions(x,y)
{
    this.x=x;
    this.y=y;
    this.width=2;
    this.height=3;
    this.margin=4;
}

class Component extends Part {
    constructor(x, y, currentamount, blabla) {
        super();
        this.currentAmount = currentamount;
    }

    SetLocation(x, y) {
        this.location = new Dimensions(x, y);
    }

    GetInflow()
    {
        let sum=0;
        for(let inpipeline of inputParts)
            sum=sum+inpipeline.currentflow;

        return sum;
    }
    GetOutflow()
    {
        let sum=0;
        for(let outpipeline of inputParts)
            sum=sum+outpipeline.currentflow;

        return sum;
    }
    RemoveInput(pipeline)
    {
        for(let i=0;i<inputParts.length;i++)
            if(inputParts[i].id==pipeline.id)
            {   inputParts.splice(i,1);
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
}


