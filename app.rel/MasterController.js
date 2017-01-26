// here will be the definition of the controller managing all the relations between the system components.

// import { NetworkController, NCCounter_FigGlobal } from "./NetworkDesigner/NetworkController";

// import { Part } from "./NetworkDesigner/Components/Part";
// import { Pipeline, SetMaxflow, Pipe_states } from "./NetworkDesigner/Components/Pipeline";
// import { Component } from "./NetworkDesigner/Components/Component";
// import { Splitter } from "./NetworkDesigner/Components/Splitter";
// import { AdjustableSplitter } from "./NetworkDesigner/Components/Adjustable_Splitter";
// import { Merger } from "./NetworkDesigner/Components/Merger";
// import { Pump } from "./NetworkDesigner/Components/Pump";
// import { Sink } from "./NetworkDesigner/Components/Sink";



let masterCtrl = null;

// Network part type enumeration 
let PartTypeEnum = {
    PIPELINE: 1,
    SPLITTER: 2,
    ADJUSTABLE_SPLITTER: 3,
    PUMP: 4,
    MERGER: 5,
    SINK: 6,
}

// Enumeration of the program states as defined by the state machine in SDD
let ProgramStateEnum = {
    IDLE: 0,
    CREATECOMPONENT: 1,
    ADDINGPIPELINEIN: 2,
    ADDINGPIPELINEOUT: 3,
    CANVASPARTSELECTED: 4,
    transitions: {
        0: { linkedTo: [0, 1, 2, 4] },
        1: { linkedTo: [0, 1] },
        2: { linkedTo: [0, 2, 3] },
        3: { linkedTo: [0, 3] },
        4: { linkedTo: [0, 4] },
    }
}

// adding a method contains to every array
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}



class MasterController {

    // singleton constuctor, solution from http://amanvirk.me/singleton-classes-in-es6/
    constructor() {
        // if there is no global object with this name and of this type, than create it
        if (!masterCtrl) {
            this.CurrentNetworkCtrl = new NetworkController();
            this.ProgramState = ProgramStateEnum.IDLE;
            masterCtrl = this;
        } // if there exists one already - ignore
        // but make sure the network controller is new?
    };

    // due to the js convention to make method names starting with lowercase letters
    createPart(type, nodeKey) {

        // TO TEST
        console.log(type, nodeKey);
        //assuming that type is sent as a integer
        let _part = {};
        let _createdSuccesfully = true;
        let _progState = ProgramStateEnum.CREATECOMPONENT;

        switch (type) {
            case (PartTypeEnum.ADJUSTABLE_SPLITTER):
                _part = new AdjustableSplitter(50, 0, nodeKey);
                break;
            case (PartTypeEnum.PUMP):
                _part = new Pump(10, nodeKey);
                break;
            case (PartTypeEnum.MERGER):
                _part = new Merger(0, nodeKey);
                break;
            case (PartTypeEnum.SINK):
                _part = new Sink(0, nodeKey);
                break;
            case (PartTypeEnum.SPLITTER):
                _part = new Splitter(0, nodeKey);
                break;
            case (PartTypeEnum.PIPELINE):
                // only this is a pipeline, therefore the 
                // state will be different from the create component
                _progState = ProgramStateEnum.ADDINGPIPELINEIN;
                _part = new Pipeline(0, nodeKey);
                break;
            default:
                // the process failed, thus the program is in idle
                _progState = ProgramStateEnum.IDLE;
                console.log("invalid type");
                _createdSuccesfully = false;
                break;
        }

        console.dir(_part); // enumerates through the properties of the object passed as a parameter


        if (_createdSuccesfully) {
            // even though the state will be changed to IDLE if the proccess has been failed, 
            // why bother calling the method... 

            this.CurrentNetworkCtrl.setSelectedTemplatePart(_part); // set the new part
            this.setState(_progState);
        }
        return _part;
    };

    addPart(x, y) {
        //TO DO
        let _part = this.CurrentNetworkCtrl.SelectedTemplatePart;
        let _result = false;
        console.dir(this);

        if (this.ProgramState == ProgramStateEnum.CREATECOMPONENT
            && _part instanceof Component)
        // if the component is the thing to be added
        {
            let _tempres = this.CurrentNetworkCtrl.putComponent();
            if (_tempres) {
                this.draw(_part);
            }
            console.log('added a part');
            console.dir(this.CurrentNetworkCtrl.Parts);
            _result = true;
        }
        else {
            console.log('not creating a component, shall not execute');
            _result = false;
        }
        this.setState(ProgramStateEnum.IDLE);

        console.log("exiting addPart() with" + _result);
        return _result;
    };


    connectPipeline(_nodeKey) {

        let _component = null;
        switch (this.ProgramState) {

            // first is waiting to be connected
            case ProgramStateEnum.ADDINGPIPELINEIN:
                _component = this.CurrentNetworkCtrl.findPartByNodeKey(_nodeKey);
                if (_component != null) {
                    try {
                        this.CurrentNetworkCtrl.SelectedTemplatePart.SetStartingComponent(_component);

                        console.log("succesfully added input to the pipeline");
                        this.setState(ProgramStateEnum.ADDINGPIPELINEOUT);



                    } catch (e) {
                        console.log("something went wrong: " + e);
                    }
                }
                break;

            // first already connected    
            case ProgramStateEnum.ADDINGPIPELINEOUT:
                _component = this.CurrentNetworkCtrl.findPartByNodeKey(_nodeKey);
                if (_component != null) {
                    try {

                        let _pipelineInProgress = this.CurrentNetworkCtrl.SelectedTemplatePart;

                        _pipelineInProgress.SetEndComponent(_component);

                        this.CurrentNetworkCtrl.addPipeline(
                            this.CurrentNetworkCtrl.SelectedTemplatePart.StartComponent,
                            this.CurrentNetworkCtrl.SelectedTemplatePart.EndComponent
                        )
                        console.log("succesfully added output to the pipeline");
                        this.setState(ProgramStateEnum.IDLE);

                        //can be drawn
                        // this.draw(_pipelineInProgress);

                        //console.log("did not add output to the pipeline");

                        // no redundant checks
                    } catch (e) {
                        console.log("something went wrong: " + e);
                    }
                }
                break;
            // something else    
            default:
                console.log("the program is not in a correct state");
                console.log("current state: " + this.ProgramState);
                break;
        }
    }

    // canvas output

    draw(partToDraw) {
        //TO DO         
    }

    updateCanvas() {
        //TO DO 
    }

    // network data management

    createNewNetwork() {
        this.CurrentNetworkCtrl = new NetworkController();
    }

    saveCurrentNetwork() {
        //TO DO 
    }

    loadNetwork() {
        //TO DO 
    }

    updateSettings(settings) {
        let _tempUpdateUnit = {};
        // to make sure the sent object contains relevant values
        for (var key in settings) {
            if (p.hasOwnProperty(key)) {
                console.log(key + " -> " + p[key]);
                _tempUpdateUnit[key] = p[key];
            }
        }

        let _res = this.CurrentNetworkCtrl.modifyGlobalSettings(_tempUpdateUnit);
        if (_res) {
            this.updateCanvas();
            this.setState(ProgramStateEnum.IDLE);
        }
    }

    setCurrentNetworkController(nc) {
        this.CurrentNetworkCtrl = nc;
    }


    findPartOfNode(_nodeKey) {
        return this.CurrentNetworkCtrl.findPartByNodeKey(_nodeKey);
    }


    // canvas manipulations


    selectPart(_nodeKey) { // instead of x,y now it is a type and nodeKey
        let _detectedPart = this.CurrentNetworkCtrl.findPartByNodeKey(_nodeKey);
        if (_detectedPart != null) {
            this.setState(ProgramStateEnum.CANVASPARTSELECTED);
            console.log("detected a part:");
            console.dir(_detectedPart);
        } else {
            console.log("did not detect a part");
            this.setState(ProgramStateEnum.IDLE);
        }
    }

    // the part removal is tackled inside of the NC class' methods.
    removeSelectedPart() {
        if (this.ProgramState == ProgramStateEnum.CANVASPARTSELECTED) {

            let _selectedPart = this.CurrentNetworkCtrl.SelectedExistingPart;
            try {
                let _res = this.CurrentNetworkCtrl.remove(_selectedPart);
                if (_res) {
                    console.log("successfully deleted");
                    this.setState(ProgramStateEnum.IDLE);
                } else {
                    console.log(_selectedPart + " -> could not be deleted for some reason");
                    this.setState(ProgramStateEnum.IDLE);
                }
            } catch (e) {
                console.log(e);
                this.setState(ProgramStateEnum.IDLE);
            }
        }

    }

    modifySelectedPart(settings) { // where settings is a object (in JSON format) with the properties to be modified
        if (this.ProgramState == ProgramStateEnum.CANVASPARTSELECTED) {

            let _tempUpdateUnit = {};
            // to make sure the sent object contains relevant values
            for (var key in settings) {
                if (p.hasOwnProperty(key)) {
                    console.log(key + " -> " + p[key]);
                    _tempUpdateUnit[key] = p[key];
                }
            }
            let _selectedPart = this.CurrentNetworkCtrl.SelectedExistingPart;
            try {
                let _res = this.CurrentNetworkCtrl.updateExistingSelectedPart(_tempUpdateUnit);
                if (_res) {
                    console.log("successfully updated");
                    this.updateCanvas();
                    this.setState(ProgramStateEnum.IDLE);

                } else {
                    console.log(_selectedPart + " -> could not be updated for some reason");
                    this.setState(ProgramStateEnum.IDLE);
                }
            } catch (e) {
                console.log(e);
                this.setState(ProgramStateEnum.IDLE);
            }
        }
    }

    setState(progState) {
        // requires checking whether such transition can hold
        console.log(progState);
        console.dir(this);
        console.log(ProgramStateEnum
            .transitions[this.ProgramState]);
        if (ProgramStateEnum
            .transitions[this.ProgramState] // current program state
            .linkedTo.contains((progState))) { // has a transition to desired state

            this.ProgramState = progState; // then this transition takes place
            if (this.ProgramState == ProgramStateEnum.IDLE) {
                // maybe not required, take note!
                this.CurrentNetworkCtrl.SelectedExistingPart = {};
                this.CurrentNetworkCtrl.SelectedTemplatePart = {};
            }
            console.log("Program state transition success: "
                + this.ProgramState);
            return true;
        }
        console.log("Program state transition failed: "
            + this.ProgramState + " does not link to " + progState);
        return false;
    }
}

// export {MasterController, PartTypeEnum, ProgramStateEnum}
