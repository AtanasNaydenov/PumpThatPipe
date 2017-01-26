//global variable to keep track of part id's
var partIdGlobal = 0;

class Part {
//constructor
  constructor(maxNrInp, maxNrOutp, _nodeKey) {
  	partIdGlobal++;
  	this.id = partIdGlobal;
		this.nodeKey = _nodeKey; // links to the GoJS node
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

// export {Part};