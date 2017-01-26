
import 'babel-polyfill';
var expect = require("chai").expect;

// import the things from the main module
import { NetworkController, NCCounter_FigGlobal } from "../app/NetworkDesigner/NetworkController";
import { MasterController, PartTypeEnum, ProgramStateEnum } from "../app/MasterController";
import { Part } from "../app/NetworkDesigner/Components/Part";
import { Pipeline, SetMaxflow, Pipe_states } from "../app/NetworkDesigner/Components/Pipeline";
import { Component } from "../app/NetworkDesigner/Components/Component";
import { Splitter } from "../app/NetworkDesigner/Components/Splitter";
import { AdjustableSplitter } from "../app/NetworkDesigner/Components/Adjustable_Splitter";
import { Merger } from "../app/NetworkDesigner/Components/Merger";
import { Pump } from "../app/NetworkDesigner/Components/Pump";
import { Sink } from "../app/NetworkDesigner/Components/Sink";

// _MC is singleton
// master controller already has an initialized property of NetworkController on creating
let _MC = new MasterController();

describe("Master Controller tests", function () {
    // to be called when you select a new component to put 
    it("Adds a new Pump to the network controller ", function () {
        let _typeint = PartTypeEnum.PUMP;
        let _part = _MC.createPart(_typeint);
        expect(_part).to.be.instanceof(Pump);
        expect(_MC.CurrentNetworkCtrl).to.have.deep.property("SelectedTemplatePart", _part);

        // just to cleariy the actions afterwards
        _MC.setState(ProgramStateEnum.IDLE);
    });
    it("Puts a new Pump to the network controller ", function () {
        let _typeint = PartTypeEnum.PUMP;
        let _part = _MC.createPart(_typeint);
        let _res = _MC.addPart();

        expect(_res).to.be.ok;
        expect(_MC.CurrentNetworkCtrl.Parts.length).to.be.equal(1);
        console.log(ProgramStateEnum[_MC.ProgramState]);
        // expect().to.be.equal();
    });

    it("Reinitializes the NetworkController", function () {
        _MC.createNewNetwork(); // trying to reinitilize, since a singleton, only the newtworkctrl should be created

        expect(_MC.CurrentNetworkCtrl).to.have.property('Name', 'NC_' + NCCounter_FigGlobal);
        expect(_MC.CurrentNetworkCtrl.Parts.length).to.be.equal(0);

    });


    it("Puts a bunch (5) of new components to the network controller", function () {

        let _typeint = PartTypeEnum.PUMP;
        let _part = _MC.createPart(_typeint);
        let _res = _MC.addPart();
        expect(_res).to.be.ok;

        _typeint = PartTypeEnum.SPLITTER;
        _part = _MC.createPart(_typeint);
        _res = _MC.addPart();
        expect(_res).to.be.ok;

        _typeint = PartTypeEnum.ADJUSTABLE_SPLITTER;
        _part = _MC.createPart(_typeint);
        _res = _MC.addPart();
        expect(_res).to.be.ok;

        _typeint = PartTypeEnum.MERGER;
        _part = _MC.createPart(_typeint);
        _res = _MC.addPart();
        expect(_res).to.be.ok;

        _typeint = PartTypeEnum.SINK;
        _part = _MC.createPart(_typeint);
        _res = _MC.addPart();
        expect(_res).to.be.ok;

        expect(_MC.CurrentNetworkCtrl.Parts.length).to.be.equal(5);

    })




});