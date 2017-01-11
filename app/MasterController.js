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
        //assuming that type is sent as a integer
        let _part = {};
        _createdSuccesfully = true;
        _progState = ProgramStateEnum.CREATECOMPONENT;
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
            this.SetState(_progState);
        }
    };

    addPart(x, y) {
        //TO DO 
    }

    connectPipeline(x, y) {
        //TO DO
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

    updateSettings() {
        //TO DO 
    }

    setCurrentNetworkController(nc) {
        this.CurrentNetworkCtrl = nc;
    }

    // canvas manipulations

    selectPart(x, y) {
        //TO DO 
    }

    removeSelectedPart() {
        //TO DO 
    }

    modifySelectedPart() {
        //TO DO 
    }

    setState(progState) {
        // requires checking whether such transition can hold
        if(ProgramState
            .transitions[(int)(this.ProgramState)] // current program state
            .linkedTo.contains((int)(progState))){ // has a transition to desired state
                this.ProgramState = progState; // then this transition takes place
                return true;
            }
        console.log("Program state transition failed: " 
            + this.ProgramState + " does not link to " + progState);
        return false;
    }
}
