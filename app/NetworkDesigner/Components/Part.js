//global variable to keep track of part id's
var partIdGlobal = 0;

class Part {
//constructor
  constructor(maxNrInp) {
  	partIdGlobal++;
  	this.id = partIdGlobal;
  	this.inputParts = [];
  	this.outputParts = [];
  	this.enabled = false;
  	this.maxNrInputs = maxNrInp;
  };

//methods
  Contains(x, y){

  };
}
