//global variable to keep track of part id's
var partIdGlobal = 0;

class Part {
//constructor
  constructor(maxNrInp, maxNrOutp) {
  	partIdGlobal++;
  	this.id = partIdGlobal;
  	this.inputParts = [];
  	this.outputParts = [];
  	this.enabled = false;
  	this.maxNrInputs = maxNrInp;
  	this.maxNrOutputs = maxNrOutp;
  };

//methods
  Contains(x, y){

  };
}
