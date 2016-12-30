//for file managment

class PersistancyCtrl {
    // does not require instantiation 

    displayFileMenu() {
        //TO DO
    }

    saveNetworkToLocation(NC) {
        //TO DO
    }

    loadFromLocation(filePath) {
        //TO DO
    }

}

// The question is whether it should be separated into morefiles - I guess it will be seen once the actual code will be written


// Used to manage and process the data to and from the required type
class DataManager {

    /*
    Should neglect all the useless properties and save only the details about the part positions and settings
    */
    prepareFroSave(NC) {
        //TO DO
        return networkJson
    }

    reconstructFromJSON(JSONobj){
        //TO DO
        return fullNetwork
    }
}

//
class FileIO{

    putToFile(obj, filepath){
        //TO DO
    }

    retrieveFromFileSystem(filePath){
        //TO DO
    }
}