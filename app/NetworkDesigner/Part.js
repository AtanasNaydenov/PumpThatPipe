class Part {
	static nextId = 1;
  constructor() {
  	this.id = nextId++;
  }
}

var One = new Part();
var Two = new Part();

console.dir(One);
console.dir(Two);