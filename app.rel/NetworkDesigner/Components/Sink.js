// import {Component} from "./Component";

class Sink extends Component {
    // constructor(x, y, maxNrImp) {
    //     super(x, y, maxNrImp);
    // } -- this does not look like the other constructors
    constructor(currentAmount, nodeKey){ // x and y is for the coordinates? why is it only in this class?
       let nrIn = -1; // for infinite
       let nrOut = 0; // for not outputting

       super(nrIn,nrOut,currentAmount,nodeKey);
       
       this.SetLocation(undefined,undefined); // this should work then, right?
    }
}
// 
// export {Sink};