import {Component} from "./Component";

class Splitter extends Component
{
    constructor(maxNrInp,currentamount,percentage)
    {
        super(maxNrInp,currentamount);
        this.percentage=percentage;
    }
}

export {Splitter};