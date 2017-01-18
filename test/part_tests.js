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
            expect(_pl).to.have.property("maxNrInputs", 1); // <- FIXED
            expect(_pl).to.have.property("maxNrOutputs", 1); // <- FIXED
        });

        it("creates a general component object", function () {
            let _c = new Component();
            expect(_c).to.be.an.instanceof(Component);
        });

        it("creates a component object with 3 inputs and 1 output", function () {
            let _c = new Component(3, 1);
            expect(_c).to.be.an.instanceof(Component);
            expect(_c).to.have.property("maxNrInputs", 3); // <- FIXED
            expect(_c).to.have.property("maxNrOutputs", 1); // <- FIXED
        });

        it("creates a splitter", function () {
            // should create the splitter with all the parameters initialized, 
            // no constr. parameters are needed.
            let _s = new Splitter();

            expect(_s).to.be.an.instanceof(Splitter);
            expect(_s).to.have.property("percentage", 50); // <- FIXED from here and below
            expect(_s).to.have.property("maxNrInputs", 1);
            expect(_s).to.have.property("maxNrOutputs", 2);
        });


        it("creates an AdjustableSplitter object", function () {
            // should create the splitter with all the parameters initialized, 
            // no constr. parameters are needed.
            let _s = new AdjustableSplitter(70); // should every component really be initialized with 0 current amount?

            expect(_s).to.be.an.instanceof(AdjustableSplitter);
            expect(_s).to.have.property("percentage", 70); // <- FIXED from here and below: 
            // changed the constructor to comply
            expect(_s).to.have.property("maxNrInputs", 1);
            expect(_s).to.have.property("maxNrOutputs", 2);
        });

        it("creates a pump object", function () {
            let _p = new Pump();

            expect(_p).to.be.an.instanceof(Pump);
            expect(_p).to.have.property("maxNrInputs", 0); // <- FIXED from here and below
            expect(_p).to.have.property("maxNrOutputs", 1); // 1 output allowed
        });

        it("creates a pump object with current amount = x", function () {
            let _contents = 80;
            Pump.SetMaximumFlow(_contents + 10);// assume x = 80
            let _p = new Pump(_contents);

            expect(_p).to.be.an.instanceof(Pump);
            expect(_p).to.have.property("currentAmount", 80); // <- FIXED from here and below
        });


        it("creates a sink object", function () {
            let _s = new Sink();

            expect(_s).to.be.an.instanceof(Sink);
            expect(_s).to.have.property("maxNrInputs", -1); // <- FIXED from here and below
            expect(_s).to.have.property("maxNrOutputs", 0); // -1 for infinite
        });


        it("creates a pipeline object conducting 8", function () {
            let _pl = new Pipeline(8);

            expect(_pl).to.be.an.instanceof(Pipeline);
            expect(_pl).to.have.property('currentflow', 8); // <- FIXED
            // please change the name to camelcase, pls 
        });
    });

    // FUNC
    describe("Functionality Tests", function () {
        describe("Pipeline functionality", function () {
            describe("Sets the pipeline maxflow", function () {

                it(" to 5 for all pipelines", function () {
                    SetMaxflow(5);
                    expect(Pipeline).to.have.property("maxflow", 5); // <- FIXED 
                });

                it(" to x, y, .. for all pipelines", function () {
                    SetMaxflow(5);
                    expect(Pipeline).to.have.property("maxflow", 5); // <- FIXED 
                    Pipeline.LocSetMaxflow(8); // works the same as SetMaxflow
                    expect(Pipeline).to.have.property("maxflow", 8); // <- FIXED 
                });


                it(" to 5, checks if an instance of a pipeline has it", function () {

                    Pipeline.LocSetMaxflow(5);
                    let _pl = new Pipeline();

                    // let _pl = new Pipeline();
                    // Pipeline.LocSetMaxflow(5); -> this works, but 
                    // Pipeline.LocSetMaxflow(5);
                    // let _pl = new Pipeline(); -> this does not...

                    expect(Pipeline).to.have.property("maxflow", 5); // <- FIXED 
                    expect(_pl).to.have.property("maxFlow", 5); // <- FIXED
                });
                it(" to 5, then changes to 10", function () {
                    Pipeline.LocSetMaxflow(5);
                    let _pl = new Pipeline();
                    Pipeline.LocSetMaxflow(10);
                    expect(_pl).to.have.property("maxFlow", 10); // <- PROBLEM
                });
                it(" to 5, checks against 2 pipelines", function () {
                    Pipeline.LocSetMaxflow(5);
                    let _pl1 = new Pipeline();
                    let _pl2 = new Pipeline();
                    expect(_pl1).to.have.property("maxFlow", 5); // <- PROBLEM
                    expect(_pl2).to.have.property("maxFlow", 5); // <- PROBLEM
                });
            });

            // PL states
            describe("Pipeline state testing", function () {
                // pl.st testing section 1
                describe("sets the maxflow to `x`, the currentflow to `y`, the state should be `z`", function () {
                    it("x:= 10; y:= 2; z ?= 'SAFE'", function () {
                        Pipeline.LocSetMaxflow(10);
                        let _pl1 = new Pipeline(2);
                        _pl1.UpdateState();
                        expect(_pl1).to.have.property("state", Pipe_states.SAFE);
                    });
                    it("x:= 10; y:= 6; z ?= 'ALERTED'", function () {
                        // 10 * 0.5 = 5; 10 * 0.8 = 8; --> 6 is between...
                        Pipeline.LocSetMaxflow(10);
                        let _pl1 = new Pipeline(6);
                        _pl1.UpdateState();
                        expect(_pl1).to.have.property("maxFlow", 10);
                        expect(_pl1).to.have.property('currentflow', 6);
                        expect(_pl1).to.have.property("state", Pipe_states.ALERTED); // <- FIXED : the camel case property name
                    });
                    it("x:= 10; y:= 9; z ?= 'WARNING'", function () {
                        Pipeline.LocSetMaxflow(10);
                        let _pl1 = new Pipeline(9);
                        _pl1.UpdateState();
                        expect(_pl1).to.have.property("state", Pipe_states.WARNING);
                    });
                    it("x:= 10; y:= 10; z ?= 'WARNING'", function () {
                        Pipeline.LocSetMaxflow(10);
                        let _pl1 = new Pipeline(10);
                        _pl1.UpdateState();
                        expect(_pl1).to.have.property("state", Pipe_states.WARNING);
                    });
                    it("x:= 10; y:= 43; z ?= 'URGENT'", function () {
                        Pipeline.LocSetMaxflow(10);
                        let _pl1 = new Pipeline(43);
                        _pl1.UpdateState();
                        expect(_pl1).to.have.property("state", Pipe_states.URGENT);
                    });
                    it("x:= 10; y:= 9; z ?= 'WARNING' || without explicit UpdateStateCall", function () {
                        Pipeline.LocSetMaxflow(10);
                        let _pl1 = new Pipeline(9);
                        //_pl1.UpdateState(); - skipping, should be called explicit
                        expect(_pl1).to.not.have.property("state", Pipe_states.SAFE);
                        expect(_pl1).to.have.property("state", Pipe_states.WARNING);
                    });
                });
                // pl.st testing section 2
            });

            // Connections
            describe("Pipeline Connections testing", function () {
                describe("connected Components type testing", function () {
                    it("connects Pump to Sink", function () {
                        let _p = new Pump();
                        let _sk = new Sink();
                        let _pl = new Pipeline();

                        _pl.SetStartingComponent(_p);
                        _pl.SetEndComponent(_sk);

                        let _retP = _pl.GetStartingComponent();
                        let _retSK = _pl.GetEndComponent();

                        expect(_retP).to.be.an.instanceof(Pump);
                        expect(_retP).to.deep.equal(_p);
                        expect(_retSK).to.deep.equal(_sk);
                    });
                    it("connects Pump to Splitter", function () {
                        let _p = new Pump();
                        let _sp = new Splitter();
                        let _pl = new Pipeline();

                        _pl.SetStartingComponent(_p);
                        _pl.SetEndComponent(_sp);

                        let _retP = _pl.GetStartingComponent();
                        let _retSP = _pl.GetEndComponent();

                        expect(_retP).to.deep.equal(_p);
                        expect(_retSP).to.deep.equal(_sp);
                    });
                    it("connects Splitter to Sink", function () {
                        let _sp = new Splitter();
                        let _sk = new Sink();
                        let _pl = new Pipeline();

                        _pl.SetStartingComponent(_sp);
                        _pl.SetEndComponent(_sk);

                        let _retSP = _pl.GetStartingComponent();
                        let _retSK = _pl.GetEndComponent();

                        expect(_retSP).to.deep.equal(_sp);
                        expect(_retSK).to.deep.equal(_sk);
                    });
                    it("connects Pump with currentflow of X and a Sink to the pipeline", function () {
                        let _p = new Pump(10);
                        let _sk = new Sink();
                        let _pl = new Pipeline();

                        _pl.SetStartingComponent(_p);
                        _pl.SetEndComponent(_sk);

                        _p.AddOutput(_pl);
                        _sk.AddInput(_pl);

                        expect(_pl).to.have.property("currentflow", 10); // <- PROBLEM : got undefined
                    });
                });
                it("connected Components detaching (empty collections)", function () {
                    let _sp = new Splitter();
                    let _sk = new Sink();
                    let _pl = new Pipeline();

                    _pl.SetStartingComponent(_sp);
                    _pl.SetEndComponent(_sk);
                    _sp.AddOutput(_pl);
                    _sk.AddInput(_pl);

                    _pl.Detach();
                    expect(_pl.outputParts).to.deep.equal([]);
                    expect(_pl.inputParts).to.deep.equal([]);
                });
                it("connected Components detaching (0 inflows)", function () {
                    // this time components are also connected via AddInput|Output method
                    let _p = new Pump(40);
                    let _sk = new Sink();
                    let _pl = new Pipeline();

                    _pl.SetStartingComponent(_p);
                    _pl.SetEndComponent(_sk);

                    _p.AddOutput(_pl);
                    _sk.AddInput(_pl);

                    _pl.Detach();
                    let _sinkInflow = _sk.GetInflow();

                    expect(_sinkInflow).to.equal(0);
                });
            });
        });
        describe("Components functionality", function () {
            describe("Location management testing", function () {
                it("Set location x:= 10; y:=30; for a PUMP", function () {
                    let _p = new Pump(50);
                    _p.SetLocation(10, 30);

                    let _pDimensions = _p.location;
                    expect(_pDimensions).to.have.property('X', 10);
                    expect(_pDimensions).to.have.property('Y', 30);
                    // just for testing, should probably be better set to something retrievable 
                    expect(_pDimensions).to.have.property('Width', 10);
                    expect(_pDimensions).to.have.property('Height', 10);
                    expect(_pDimensions).to.have.property('Margin', 2);
                })
                it("check the contains function for components", function () {
                    let _p = new Pump(50);
                    _p.SetLocation(10, 30);

                    let _pDimensions = _p.location;
                    let _containsResult = _p.Contains(11, 31); // the x and y should be inside 
                    expect(_containsResult).to.be.ok;
                });
            });
            describe("Connecting", function () {
                it("a Pump with a Sink", function () {
                    let _p = new Pump(50);
                    let _sk = new Sink();
                    let _pl = new Pipeline();
                    _pl.SetStartingComponent(_p);
                    _pl.SetEndComponent(_sk);

                    _p.AddOutput(_pl);
                    _sk.AddInput(_pl);
                    let _parentCompOfSk = _sk.inputParts[0].GetStartingComponent();

                    expect(_p.outputParts[0]).to.be.deep.equal(_pl);
                    expect(_sk.inputParts[0]).to.be.deep.equal(_pl);
                    expect(_parentCompOfSk).to.be.deep.equal(_p);
                });
                it("a Pump(50) with a Sink, Sink's `currentAmount` should be 50", function () {
                    let _p = new Pump(50);
                    let _sk = new Sink();
                    let _pl = new Pipeline();
                    _pl.SetStartingComponent(_p);
                    _pl.SetEndComponent(_sk);

                    _p.AddOutput(_pl);
                    _sk.AddInput(_pl);

                    let retSinkInflow = _sk.GetInflow();

                    //expect(retSinkInflow).to.be.equal(50);
                    expect(_sk.currentAmount).to.be.equal(50); // <- PROBLEM : got undefined
                });
                it("a Pump(50) with a Sink, Sink's `GetInflow()` should be 50", function () {
                    let _p = new Pump(50);
                    let _sk = new Sink();
                    let _pl = new Pipeline();
                    _pl.SetStartingComponent(_p);
                    _pl.SetEndComponent(_sk);

                    _p.AddOutput(_pl);
                    _sk.AddInput(_pl);

                    let retSinkInflow = _sk.GetInflow();

                    expect(retSinkInflow).to.be.equal(50); // <- PROBLEM : got NaN
                    //expect(_sk.currentAmount).to.be.equal(50);
                });
                it("a Pump(50) with 2 Sinks via a Splitter, Sink's `GetInflow()` should be 25", function () {
                    let _p = new Pump(50);
                    let _sp = new Splitter();
                    let _sks = [];

                    // done 2 sinks 
                    _sks.push(new Sink());
                    _sks.push(new Sink());
                    let _pls = [];
                    // done 3 pipelines
                    _pls.push(new Pipeline());
                    _pls.push(new Pipeline());
                    _pls.push(new Pipeline());

                    // Pump to splitter
                    _pls[0].SetStartingComponent(_p);
                    _pls[0].SetEndComponent(_sp);

                    _p.AddOutput(_pls[0]);
                    _sp.AddInput(_pls[0]);

                    // Splitter to Sink 1
                    _pls[1].SetStartingComponent(_sp);
                    _pls[1].SetEndComponent(_sks[0]);
                    _sp.AddOutput(_pls[1]);
                    _sks[0].AddInput(_pls[1]);
                    // Splitter to Sink 2
                    _pls[2].SetStartingComponent(_sp);
                    _pls[2].SetEndComponent(_sks[1]);
                    _sp.AddOutput(_pls[2]);
                    _sks[1].AddInput(_pls[2]);

                    // should like like this:
                    /*
                                             -[1]- Sink[0]
                        Pump -[0]- Splitter< 
                                             -[2]- Sink[1]
                    */

                    let retSink1Inflow = _sks[0].GetInflow();
                    let retSink2Inflow = _sks[0].GetInflow();

                    expect(retSink1Inflow).to.be.equal(25); // <- FIXED : got NaN
                    expect(retSink2Inflow).to.be.equal(25); // to fix : redefine the get outflow of the splitter...
                });
                it("add 3 pipelines to splitter's outs, expect 2", function () {
                    let _sp = new Splitter();
                    for (let i = 0; i < 3; i++) {
                        _sp.AddOutput(new Pipeline());
                    }
                    let _nrOuts = _sp.outputParts.length;
                    expect(_nrOuts).to.equal(2);
                });
                it("Pump + AdjSplitter(70) + Pump:", function () {

                    Pump.SetMaximumFlow(120);
                    let _p = new Pump(100);
                    let _sp = new AdjustableSplitter(70);
                    let _sks = [];

                    // done 2 sinks 
                    _sks.push(new Sink());
                    _sks.push(new Sink());
                    let _pls = [];
                    // done 3 pipelines
                    _pls.push(new Pipeline());
                    _pls.push(new Pipeline());
                    _pls.push(new Pipeline());

                    // Pump to splitter
                    _pls[0].SetStartingComponent(_p);
                    _pls[0].SetEndComponent(_sp);

                    _p.AddOutput(_pls[0]);
                    _sp.AddInput(_pls[0]);

                    // Splitter to Sink 1
                    _pls[1].SetStartingComponent(_sp);
                    _pls[1].SetEndComponent(_sks[0]);
                    _sp.AddOutput(_pls[1]);
                    _sks[0].AddInput(_pls[1]);
                    // Splitter to Sink 2
                    _pls[2].SetStartingComponent(_sp);
                    _pls[2].SetEndComponent(_sks[1]);
                    _sp.AddOutput(_pls[2]);
                    _sks[1].AddInput(_pls[2]);

                    console.log(_p);
                    console.log(_sp);
                    console.log(_pls);
                    console.log(_sks);
                    // should like like this:
                    /*
                                                            -[1/70]- Sink[0](70)
                        Pump(100) -[0/100]- ASplitter(%70)< 
                                                            -[2/30]- Sink[1](30)
                    */

                    let retSink1Inflow = _sks[0].GetInflow();
                    let retSink2Inflow = _sks[1].GetInflow();

                    expect(retSink1Inflow).to.be.equal(70); // <- FIXED : got NaN
                    expect(retSink2Inflow).to.be.equal(30);
                });
                it("Pump x2 + Merger + Pump:", function () {
                    Pump.SetMaximumFlow(150);
                    let _p1 = new Pump(100);
                    let _p2 = new Pump(50);
                    let _m = new Merger();

                    let _pls = [];
                    // done 3 pipelines
                    _pls.push(new Pipeline());
                    _pls.push(new Pipeline());
                    _pls.push(new Pipeline());

                    // TODO
                })

            });
        });
    });
});