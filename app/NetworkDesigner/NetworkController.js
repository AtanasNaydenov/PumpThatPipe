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
        return false;
    }

    // Checks the if the x and y coordinates are available for placing smthng
    // returns a boolean result
    isDrawable(x, y) {
        return false;
    }

    // adds a new pipeline based on the components a and b as parameters
    addPipeline(a, b) {
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
    remove(comp) {
        return false;
    }

    // attemots to remove a pipeline
    remove(pl) {
        return false;
    }

    // removes a part from the list of parts
    removeFromList(part) {

    }

    // void
    setSelectedTemplatePart(part) {

    }

    // void
    setSelectedExistingPart(part) {

    }

    // where params is a JSON object with parameters to change
    updateExistingSelectedPart(params) {
        return false;
    }

    // void
    setNewMaximumPipelineFlow(flowAmount) {

    }

    detectComponent(x, y) {
        comp = {};
        return comp;
    }

    detectPart(x, y) {
        part = {};
        return part;
    }
}