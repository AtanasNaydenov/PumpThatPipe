// for testing the network designer functionality\
// used to test the seprarate functionality per each class and also the network controller 

import 'babel-polyfill';
var expect = require("chai").expect;

// import the things from the main module
import { NetworkController, NCCounter_FigGlobal } from "../app/NetworkDesigner/NetworkController";
import { Part } from "../app/NetworkDesigner/Components/Part";
import { Pipeline, SetMaxflow, Pipe_states } from "../app/NetworkDesigner/Components/Pipeline";
import { Component } from "../app/NetworkDesigner/Components/Component";
import { Splitter } from "../app/NetworkDesigner/Components/Splitter";
import { AdjustableSplitter } from "../app/NetworkDesigner/Components/Adjustable_Splitter";
import { Merger } from "../app/NetworkDesigner/Components/Merger";
import { Pump } from "../app/NetworkDesigner/Components/Pump";
import { Sink } from "../app/NetworkDesigner/Components/Sink";

describe("NetworkController testing", function () {
    describe("Controller initialization test", function () {
        it("creates an instance of a NetworkController", function () {
            let NC = new NetworkController();

            expect(NC).to.be.an.instanceof(NetworkController);
            expect(NC).to.have.property('Name', 'NC_'+NCCounter_FigGlobal);

        });

        it("creates two instances of a NetworkController", function () {
            let NC1 = new NetworkController(); // since the test before was run, this should get number 2 and 3
            
            let temp = NCCounter_FigGlobal;
            
            let NC2 = new NetworkController();
            expect(NC1).to.have.property('Name', 'NC_'+temp);
            expect(NC2).to.have.property('Name', 'NC_'+NCCounter_FigGlobal);
        });
    });
    describe("Controller functionality tests", function () {
        it("modfies global values of the NC's classes", function () {
            let NC = new NetworkController();

            let _settings = {
                "_newPipelineMaxFlow": 14,
                "_newPumpMaxFlow": 13,
            }; //what other global settings do we have? 

            let _modRes = NC.modifyGlobalSettings(_settings);
            //expect(_modRes).to.not.be.empty; // <- PROBLEM : not implemented method
            expect(_modRes).to.have.property("plMaxFlowChanged", true);
            expect(_modRes).to.have.property("pMaxFlowChanged", true);
        });
        it("Adds x Pumps, y Sinks and z Split. to the `parts`, total number of parts ?= x+y+z", function () {
            let _NC = new NetworkController();

            let _x = 12;
            let _y = 15;
            let _z = 3;

            for (let i = 0; i < _x; i++) {
                _NC.addPartToList(new Pump(5 * i));
            }
            for (let i = 0; i < _y; i++) {
                _NC.addPartToList(new Sink());
            }
            for (let i = 0; i < _z; i++) {
                _NC.addPartToList(new Splitter());
            }
            let _sum = _x + _y + _z;
            expect(_NC.Parts.length).to.be.equal(_sum);
        });

        it("Creates a network of a Pump and a Sink", function () {
            let _NC = new NetworkController();

            let _settings = {
                "_newPipelineMaxFlow": 14,
                "_newPumpMaxFlow": 13,
            }; //what other global settings do we have? 

            let _modRes = _NC.modifyGlobalSettings(_settings);

            let _p = new Pump(10);
            // The actions follow the #SD-001 and #SD-002
            _NC.setSelectedTemplatePart(_p);
            let _x = 10,
                _y = 10; // some arbitrary coordinates
            let _resPutPump = _NC.putComponent(_x, _y);

            expect(_resPutPump).to.be.ok;
            expect(_NC.SelectedTemplatePart).to.be.deep.equal({});;
            
            let _sk = new Sink();
            _NC.setSelectedTemplatePart(_sk);

            _x = 40;
            _y = 40;
            let _resPutSink = _NC.putComponent(_x, _y);

            expect(_resPutPump).to.be.ok;
            expect(_NC.Parts.length).to.be.equal(2);
            
            let _pl = new Pipeline();
            _NC.setSelectedTemplatePart(_pl);

            // set start
            let _detectedComp = _NC.detectComponent(11,11);
            expect(_detectedComp).to.be.deep.equal(_p); // the dected component should be the pump.
            _NC.SelectedTemplatePart.SetStartingComponent(_detectedComp);
            
            // set end
            _detectedComp = _NC.detectComponent(41,41);
            expect(_detectedComp).to.be.deep.equal(_sk); // the dected component should be the pump.
            _NC.SelectedTemplatePart.SetEndComponent(_detectedComp);

            let _addPlResult = _NC.addPipeline(_pl.StartComponent,_pl.EndComponent);
            
            expect(_addPlResult).to.be.ok;
            let _substanceInSink = _sk.GetInflow();
            // GOOD TILL HERE
            expect(_substanceInSink).to.be.equal(10); // <- PROBLEM
        });

    });
});