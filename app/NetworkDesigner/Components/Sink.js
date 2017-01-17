import {Component} from "./Component";

class Sink extends Component {
    // constructor(x, y, maxNrImp) {
    //     super(x, y, maxNrImp);
    // } -- this does not look like the other constructors
    constructor(x,y){ // x and y is for the coordinates? why is it only in this class?
       let nrIn = -1; // for infinite
       let nrOut = 0; // for not outputting
       super(nrIn,nrOut);
       this.SetLocation(x,y); // this should work then, right?
    }
}

export {Sink};