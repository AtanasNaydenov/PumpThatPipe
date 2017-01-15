import 'babel-polyfill';
var expect = require("chai").expect;
let Person = require("../app/Supportive/abc");

describe("ABC Testing", function () {
    describe("New Person", function () {
        it("creates a variable with a new Person", function(){
            var a = new Person(15);

            expect(a).to.be.an.instanceof(Person);
            expect(a).to.have.property('Age', 15);
        });
    });
    describe("Older By x", function () {
        it("returns an expected age of a person in x years", function(){
            var a = new Person(15);
            var _expectedAge = a.olderBy(15);

            expect(_expectedAge).to.equal(30);
        });
    });
});