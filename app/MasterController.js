// here will be the definition of the controller managing all the relations between the system components.

let masterCtrl = nul;

class MasterCtrl {

    // singleton constuctor, solution from http://amanvirk.me/singleton-classes-in-es6/
    constructor() {
        // if there is no global object with this name and of this type, than create it
        if (!masterCtrl) {
            this.CurrentNetworkCtrl = new NetworkController();
            masterCtrl = this;
        } // if there exists one already - ignore
    };

    // due to the js convention to make method names starting with lowercase letters
    createPart(Type) {
        //TO DO
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
        //TO DO 
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
        //TO DO 
    }
}
