import 'babel-polyfill';
var expect = require("chai").expect;

import { Part } from "../app/NetworkDesigner/Components/Part";
import { Pipeline, SetMaxflow, Pipe_states } from "../app/NetworkDesigner/Components/Pipeline";
import { Component } from "../app/NetworkDesigner/Components/Component";
import { Splitter } from "../app/NetworkDesigner/Components/Splitter";
import { AdjustableSplitter } from "../app/NetworkDesigner/Components/Adjustable_Splitter";
import { Merger } from "../app/NetworkDesigner/Components/Merger";
import { Pump } from "../app/NetworkDesigner/Components/Pump";
import { Sink } from "../app/NetworkDesigner/Components/Sink";


describe("Testing part methods separately", function () {
    describe("Initialization Tests", function () {
        it("creates a generalized Part object", function () {
            let _p = new Part();

            expect(_p).to.be.an.instanceof(Part);
            expect(_p.inputParts.length).to.equal(0);
        });

        it("creates a Part object with maximum 12 inputs and 2 outputs", function () {
            let _p = new Part(12, 2);

            expect(_p).to.be.an.instanceof(Part);
            expect(_p).to.have.property('maxNrInputs', 12);
            expect(_p).to.have.property('maxNrOutputs', 2);
            expect(_p.inputParts.length).to.equal(0);
        });

        it("creates a general pipeline object", function () {
            let _pl = new Pipeline();

            expect(_pl).to.be.an.instanceof(Pipeline);
        });
        it("checks if a general pipeline object has maxNrInputs == 1 and maxNrOutputs == 1", function () {
            let _pl = new Pipeline();

            expect(_pl).to.be.an.instanceof(Pipeline);
            expect(_pl).to.have.property("maxNrInputs", 1); // <- PROBLEM
            expect(_pl).to.have.property("maxNrOutputs", 1); // <- PROBLEM
        });

        it("creates a general component object", function () {
            let _c = new Component();
            expect(_c).to.be.an.instanceof(Component);
        });

        it("creates a component object with 3 inputs and 1 output", function () {
            let _c = new Component(3, 1);
            expect(_c).to.be.an.instanceof(Component);
            expect(_c).to.have.property("maxNrInputs", 3);
            expect(_c).to.have.property("maxNrOutputs", 1);
        });

        it("creates a splitter", function () {
            // should create the splitter with all the parameters initialized, 
            // no constr. parameters are needed.
            let _s = new Splitter();

            expect(_s).to.be.an.instanceof(Splitter);
            expect(_s).to.have.property("percentage", 50); // <- PROBLEM from here and below
            expect(_s).to.have.property("maxNrInputs", 1);
            expect(_s).to.have.property("maxNrOutputs", 2);
        });


        it("creates an AdjustableSplitter object", function () {
            // should create the splitter with all the parameters initialized, 
            // no constr. parameters are needed.
            let _s = new AdjustableSplitter(70);

            expect(_s).to.be.an.instanceof(AdjustableSplitter);
            expect(_s).to.have.property("percentage", 70); // <- PROBLEM from here and below
            expect(_s).to.have.property("maxNrInputs", 1);
            expect(_s).to.have.property("maxNrOutputs", 2);
        });

        it("creates a pump object", function () {
            // should create the merger with all the parameters initialized, 
            // no constr. parameters are needed.
            let _p = new Pump();

            expect(_p).to.be.an.instanceof(Pump);
            expect(_p).to.have.property("maxNrInputs", 0); // <- PROBLEM from here and below
            expect(_p).to.have.property("maxNrOutputs", -1); // -1 for infinite
        });

        it("creates a sink object", function () {
            // should create the merger with all the parameters initialized, 
            // no constr. parameters are needed.
            let _s = new Sink();

            expect(_s).to.be.an.instanceof(Sink);
            expect(_s).to.have.property("maxNrInputs", -1); // <- PROBLEM from here and below
            expect(_s).to.have.property("maxNrOutputs", 0); // -1 for infinite
        });





    });
    describe("Functionality Tests", function () {
        describe("Pipeline functionality", function () {
            describe("Sets the pipeline maxflow", function () {

                it(" to 5 for all pipelines", function () {
                    SetMaxflow(5);

                    expect(Pipeline).to.have.property("maxflow", 5); // <- PROBLEM
                });


                it(" to 5, checks if an instance of a pipeline has it", function () {
                    SetMaxflow(5);
                    let _pl = new Pipeline();
                    expect(_pl).to.have.property("maxflow", 5); // <- PROBLEM
                });
                it(" to 5, then changes to 10", function () {
                    SetMaxflow(5);
                    let _pl = new Pipeline();
                    SetMaxflow(10);
                    expect(_pl).to.have.property("maxflow", 10); // <- PROBLEM
                });
                it(" to 5, checks against 2 pipelines", function () {
                    SetMaxflow(5);
                    let _pl1 = new Pipeline();
                    let _pl2 = new Pipeline();
                    expect(_pl1).to.have.property("maxflow", 5); // <- PROBLEM
                    expect(_pl2).to.have.property("maxflow", 5); // <- PROBLEM
                });
            });

            it("creates a pipeline object conducting 8", function () {
                let _pl = new Pipeline(8);

                expect(_pl).to.be.an.instanceof(Pipeline);
                expect(_pl).to.have.property('currentflow', 8); // <- PROBLEM
                // please change the name to camelcase, pls 
            });

        })
    });
});