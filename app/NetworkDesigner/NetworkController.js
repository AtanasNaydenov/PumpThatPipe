//for network processes

let NCCounter_FigGlobal = 0; // global variables are bad, but not having static members is worse 
class NetworkController {

    static makeNewName() {
        NCCounter_FigGlobal++;
        return "NC_" + NCCounter_FigGlobal;
    }

    constructor() {
        this.Name = newName();
        this.Id = _counter;
        this.SelectedTemplatePart = {};
        this.SelectedExistingPart = {};
        this.Parts = [];
    }

    // A method that attempts adding a component to the network with the give x and y
    // returns a boolean representing the result of the action 
    putComponent(x, y) {
        let _isDrawable = this.isDrawable(x, y);
        if (_isDrawable) {
            // check if returns something
            this.SelectedTemplatePart.SetLocation(x, y);
        }
        return _isDrawable;
    }

    // Checks the if the x and y coordinates are available for placing smthng
    // returns a boolean result
    isDrawable(x, y) {
        return false;
    }

    // adds a new pipeline based on the components a and b as parameters
    // the new pipeline is stored in the SelectedTemplatePart
    addPipeline(comp1, comp2) {
        if (comp1.AddOutput(this.SelectedTemplatePart) &&
            comp2.AddInput(this.SelectedTemplatePart)) {
            console.log("both connected components added");
            return true;
        }
        return false;
    }

    // ???
    updateNetwork() {

    }

    // updates the global settings of the NC 
    modifyGlobalSettings(settings) {
        return false;
    }

    // attempts to remove a given component 
    remove(part, isPipeline) {
        if (!isPipeline) {
            try {
                _listOfPLtoDelete = part.RemoveAllPipelines();
                //
                if (_listOfPLtoDelete.length > 0) {
                    for (let i = 0; i < _listOfPLtoDelete.length; i++) {
                        this.removeFromList(_listOfPLtoDelete[i]);
                    }
                }
                return true;
            } catch (e) {
                console.log("oups, something went wrong" + e)
                return false;
            }


        }
        return false;
    }

    // attemots to remove a pipeline
    // remove(pl) {
    //     return false;
    // }
    // overloading is not nice for JS

    // removes a part from the list of parts
    removeFromList(part) {

    }

    // void
    setSelectedTemplatePart(part) {
        this.SelectedTemplatePart = part;
    }

    // void
    setSelectedExistingPart(part) {
        this.SelectedExistingPart = part;
    }

    // where params is a JSON object with parameters to change
    updateExistingSelectedPart(params) {
        return false;
    }

    // void
    setNewMaximumPipelineFlow(flowAmount) {

    }

    detectComponent(x, y) {
        _comp = {};
        for (let i = 0; i < this.Parts.length; i++) {
            console.log(this.Parts[i].constructor.name);

            if (this.Parts[i] instanceof Component() && this.Parts[i].Contains(x, y)) {
                console.log("found a component here");
                _comp = this.Parts[i];
                console.dir(_comp);
                return _comp;
            }
        }
        return _comp;
    }

    detectPart(x, y) {
        _comp = {};
        for (let i = 0; i < this.Parts.length; i++) {
            console.log(this.Parts[i].constructor.name);

            if (this.Parts[i].Contains(x, y)) {
                console.log("found a part here");
                _comp = this.Parts[i];
                console.dir(_comp);
                return _comp;
            }
        }
        return _comp;
    }
}