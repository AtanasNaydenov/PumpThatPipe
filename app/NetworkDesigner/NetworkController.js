//for network processes
import { Part } from "./Components/Part";
import { Pipeline, SetMaxflow, Pipe_states } from "./Components/Pipeline";
import { Component } from "./Components/Component";
import { Splitter } from "./Components/Splitter";
import { AdjustableSplitter } from "./Components/Adjustable_Splitter";
import { Merger } from "./Components/Merger";
import { Pump } from "./Components/Pump";



let NCCounter_FigGlobal = 0; // global variables are bad, but not having static members is worse 
class NetworkController {

    static makeNewName() {
        NCCounter_FigGlobal++;
        return "NC_" + NCCounter_FigGlobal;
    }

    constructor() {
        this.Name = NetworkController.makeNewName();
        this.Id = NCCounter_FigGlobal;
        this.SelectedTemplatePart = {};
        this.SelectedExistingPart = {};
        this.Parts = [];
    }

    // A method that attempts adding a component to the network with the give x and y
    // returns a boolean representing the result of the action 
    putComponent(x, y) {
        let _isDrawableResp = this.isDrawable(x, y);
        if (_isDrawableResp) {
            // check if returns something
            this.SelectedTemplatePart.SetLocation(x, y);
            this.addPartToList(this.SelectedTemplatePart);
            this.SelectedTemplatePart = {};
            console.dir(this.SelectedTemplatePart);
        }
        return _isDrawableResp;
    }

    // to be used only when everything is alright
    addPartToList(part) {
        if (part instanceof Part) {
            this.Parts.push(part);
            return true;
        }
        return false;
    }

    // Checks the if the x and y coordinates are available for placing smthng
    // returns a boolean result
    isDrawable(x, y) {
        for (let i = 0; i < this.Parts.length; i++) {
            if (this.Parts[i].Contains(x, y)) {
                return false; // not drawable!
            }
        }
        return true; // since this line was reached, none of the components contained the x and y
    }

    // adds a new pipeline based on the components a and b as parameters
    // the new pipeline is stored in the SelectedTemplatePart
    addPipeline(comp1, comp2) {
        if (comp1.AddOutput(this.SelectedTemplatePart) &&
            comp2.AddInput(this.SelectedTemplatePart)) {
            console.log("both connected components added");

            this.addPartToList(this.SelectedTemplatePart);
            this.SelectedTemplatePart = {};
            console.log(this.Parts);
            
            return true;
        }
        return false;
    }

    // recalculates the 
    updateNetwork() {

        let _sources = [];
        _sources = this.getPumps();

        for (let i = 0; i < _sources.length; i++) {
            _sources[i]
        }
    }

    // updates the global settings of the NC 
    modifyGlobalSettings(settings) {
        //TO DO
        let _modSettings = {};
        console.dir(settings);
        if (settings.hasOwnProperty('_newPipelineMaxFlow')) {
            this.setNewMaximumPipelineFlow(settings._newPipelineMaxFlow);
            _modSettings.plMaxFlowChanged = true;
        }
        if (settings.hasOwnProperty('_newPumpMaxFlow')) {
            Pump.SetMaximumFlow(settings._newPumpMaxFlow);
            _modSettings.pMaxFlowChanged = true;
        }
        return _modSettings;
    }

    // attempts to remove a given component 
    remove(part, isPipeline) {
        let _removeResult = false;

        if (!(part instanceof Component
            || part instanceof Pipeline)) {
            // neither a component or a pipeline - aaaargh, wrong-wrong-wrong.
            return false;
        }
        // at least one of those
        if (!isPipeline) {
            try { // try enables skipping the check for being a component by just assuming it is
                let _listOfPLOutAndIn = part.RemoveAllPipelines(); //`returns {}.
                ``
                let _listOfPLMerged = _listOfPLOutAndIn.outputParts;
                _listOfPLMerged.push(_listOfPLOutAndIn.inputParts);

                for (let i = 0; i < _listOfPLOutAndIn.outputParts.length; i++) {
                    updateConnections(_listOfPLOutAndIn.outputParts[i].outputParts[0]);
                }

                // removing all those pipelines from the list
                if (_listOfPLMerged.length > 0) {
                    for (let i = 0; i < _listOfPLMerged.length; i++) {
                        this.removeFromList(_listOfPLMerged[i]);
                    }
                }
                _removeResult = this.removeFromList(part); // maybe something goes wrong, huh?
            } catch (e) {
                console.log("oups, something went wrong" + e)
                _removeResult = false;
            }
        } else {

            // actually the pipeline is to be deleted
            if (part instanceof Pipeline) { // just to be sure
                let detachResult = part.Detach();
                _removeResult = this.removeFromList(part);

            } else {

                console.log('tried to delete not a pipeiple as if it was a pipeline...');
                _removeResult = false;
            }
        }

        if (_removeResult) {
            this.updateNetwork
        }
        return _removeResult;
    }



    // attemots to remove a pipeline
    // remove(pl) {
    //     return false;
    // }
    // overloading is not nice for JS

    // removes a part from the list of parts
    removeFromList(_partToDelete) {
        let _indexToDelete = 0;
        for (let i = 0; i < this.Parts.length; i++) {
            if (this.Parts[i].id == _partToDelete.Id) {
                _indexToDelete = i;
                break;
            }
        }
        return (this.Parts.splice(_indexToDelete, 1)).length > 0;
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
        // to do
        return false;
    }

    // void
    setNewMaximumPipelineFlow(flowAmount) {
        // would it work? 
        Pipeline.LocSetMaxflow(flowAmount);
    }

    detectComponent(x, y) {
        let _comp = {};
        for (let i = 0; i < this.Parts.length; i++) {
            console.log(this.Parts[i].constructor.name);

            if (this.Parts[i] instanceof Component 
                && this.Parts[i].Contains(x, y)) {
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


    // additional methods 
    // used to make life easier
    // returns the array of pumps
    getPumps() {
        _pumps = [];
        for (let i = 0; i < this.Parts.length; i++) {
            if (this.Parts[i] instanceof Pump) {
                _pumps.push(this.Parts[i]);
            }
        }
        return _pumps;
    }

    updateConnections(part) {
        if (part instanceof Pipeline) {
            part.UdpdateFlow(part.Inputs[0].GetOutFlow());
            return updateConnections(part.outputParts[0]);
        } else {
            // assuming component
            part.CurrentAmount = part.GetInflow();
            for (let i = 0; i < part.outputParts.len; i++) {
                return updateConnections(part.outputParts[i]);
            }
            // safely return a blocking result
            return 'halted';
        }
    }


}

export { NetworkController, NCCounter_FigGlobal }