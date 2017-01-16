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



describe("NetworkController testing", function () {
    describe("Controller initialization test", function () {
        it("creates an instance of a NetworkController", function () {
            let NC = new NetworkController();

            expect(NC).to.be.an.instanceof(NetworkController);
            expect(NC).to.have.property('Name', 'NC_1');

        });

        it("creates two instances of a NetworkController", function () {
            let NC1 = new NetworkController(); // since the test before was run, this should get number 2 and 3
            let NC2 = new NetworkController();
            expect(NC1).to.have.property('Name', 'NC_2');
            expect(NC2).to.have.property('Name', 'NC_3');
        });

        it("modfies global values of the NC's classes", function () {
            let NC = new NetworkController();

            let _settings = {
                "_newPipelineMaxFlow" : 14,
                "_newPumpMaxFlow" : 13,
            }; //what other global settings do we have? 
            
            let _modRes = NC.modifyGlobalSettings(_settings);
            //expect(_modRes).to.not.be.empty; // <- PROBLEM : not implemented method
            expect(_modRes).to.have.property("plMaxFlowChanged",true);
            expect(_modRes).to.have.property("pMaxFlowChanged",true);
        });

    });
});