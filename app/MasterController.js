// here will be the definition of the controller managing all the relations between the system components.

let masterCtrl = nul;

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


class MasterCtrl {

    // singleton constuctor, solution from http://amanvirk.me/singleton-classes-in-es6/
    constructor() {
        // if there is no global object with this name and of this type, than create it
        if (!masterCtrl) {
            this.CurrentNetworkCtrl = new NetworkController();
            this.ProgramState = ProgramStateEnum.IDLE;
            masterCtrl = this;
        } // if there exists one already - ignore
    };

    // due to the js convention to make method names starting with lowercase letters
    createPart(type) {

        // TO TEST

        //assuming that type is sent as a integer
        let _part = {};
        let _createdSuccesfully = true;
        let _progState = ProgramStateEnum.CREATECOMPONENT;

        switch (type) {
            case (int)(PartTypeEnum.ADJUSTABLE_SPLITTER):
                _part = new AjustableSplitter();
                break;
            case (int)(PartTypeEnum.PUMP):
                _part = new Pump();
                break;
            case (int)(PartTypeEnum.MERGER):
                _part = new Merger();
                break;
            case (int)(PartTypeEnum.SINK):
                _part = new Sink();
                break;
            case (int)(PartTypeEnum.SPLITTER):
                _part = new Splitter();
                break;
            case (int)(PartTypeEnum.PIPELINE):
                // only this is a pipeline, therefore the 
                // state will be different from the create component
                _progState = ProgramStateEnum.ADDINGPIPELINEIN;
                _part = new Pipeline();
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
            this.SetState(_progState);
        }
    };

    addPart(x, y) {
        //TO DO
        let _part = this.CurrentNetworkCtrl.SelectedTemplatePart;

        if (this.ProgramState = ProgramStateEnum.CREATECOMPONENT)
        // if the component is the thing to be added
        {
            let _res = this.CurrentNetworkCtrl.putComponent(x, y);
            if (_res) {
                this.draw(_part);
            }
            console.log('added a part');
        }
        else {
            console.log('not creating a component, shall not execute');
        }
    };


    connectPipeline(x, y) {
        switch (this.ProgramState) {

            // first is waiting to be connected
            case ProgramStateEnum.ADDINGPIPELINEIN:
                _component = this.CurrentNetworkCtrl.detectComponent(x, y);
                if (_component != null) {
                    try {
                        let _res = this.CurrentNetworkCtrl.SelectedTemplatePart.setStartComponent(_component);
                        if (_res) {
                            console.log("succesfully added input to the pipeline");
                            this.setState(ProgramStateEnum.ADDINGPIPELINEOUT);
                        } else {
                            console.log("did not add input to the pipeline");
                        }

                    } catch (e) {
                        console.log("something went wrong: " + e);
                    }
                }
                break;

            // first already connected    
            case ProgramStateEnum.ADDINGPIPELINEOUT:
                _component = this.CurrentNetworkCtrl.detectComponent(x, y);
                if (_component != null) {
                    try {

                        let _pipelineInProgress = this.CurrentNetworkCtrl.SelectedTemplatePart;
                        let _res = _pipelineInProgress.setEndComponent(_component);

                        if (_res) {
                            console.log("succesfully added output to the pipeline");
                            this.CurrentNetworkCtrl.addPipeline(
                                this.CurrentNetworkCtrl.SelectedTemplatePart.GetStartingComponent(),
                                this.CurrentNetworkCtrl.SelectedTemplatePart.GetEndComponent()
                            )
                            //can be drawn
                            this.draw(_pipelineInProgress);

                        } else {
                            console.log("did not add output to the pipeline");
                        }
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
        //TO DO 
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

    // canvas manipulations

    selectPart(x, y) {
        let _detectedPart = this.CurrentNetworkCtrl.detectPart(x, y);
        if (_detectedPart != null) {
            this.setState(ProgramStateEnum.CANVASPARTSELECTED);
            console.log("detected a part: " + _detectedPart);
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
        if (ProgramState
            .transitions[(int)(this.ProgramState)] // current program state
            .linkedTo.contains((int)(progState))) { // has a transition to desired state

            this.ProgramState = progState; // then this transition takes place
            if (this.ProgramState == ProgramStateEnum.IDLE) {
                // maybe not required, take note!
                this.CurrentNetworkCtrl.SelectedExistingPart = {};
                this.CurrentNetworkCtrl.SelectedTemplatePart = {};
            }
            return true;
        }
        console.log("Program state transition failed: "
            + this.ProgramState + " does not link to " + progState);
        return false;
    }
}
