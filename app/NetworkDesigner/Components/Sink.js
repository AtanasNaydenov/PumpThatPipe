import {Component} from "./Component";

class Sink extends Component {
    // constructor(x, y, maxNrImp) {
    //     super(x, y, maxNrImp);
    // } -- this does not look like the other constructors
    constructor(nodeKey){ // x and y is for the coordinates? why is it only in this class?
       super(0, -1, 0, nodeKey)
       let nrIn = -1; // for infinite
       let nrOut = 0; // for not outputting
       super(nrIn,nrOut);
       this.SetLocation(undefined,undefined); // this should work then, right?
    }
}

export {Sink};