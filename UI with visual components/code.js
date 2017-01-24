var red = "orangered"; // 0 or false
var green = "forestgreen"; // 1 or true

function init() {
    var $ = go.GraphObject.make; // for conciseness in defining templates

    myDiagram =
        $(go.Diagram, "myDiagramDiv", // create a new Diagram in the HTML DIV element "myDiagramDiv"
            {
                initialContentAlignment: go.Spot.Center,
                allowDrop: true, // Nodes from the Palette can be dropped into the Diagram
                "draggingTool.isGridSnapEnabled": true, // dragged nodes will snap to a grid of 10x10 cells
                "undoManager.isEnabled": true
            });

    // when the document is modified, add a "*" to the title and enable the "Save" button
    myDiagram.addDiagramListener("Modified", function(e) {
        var button = document.getElementById("saveModel");
        if (button) button.disabled = !myDiagram.isModified;
        var idx = document.title.indexOf("*");
        if (myDiagram.isModified) {
            if (idx < 0) document.title += "*";
        } else {
            if (idx >= 0) document.title = document.title.substr(0, idx);
        }
    });

    var palette = new go.Palette("palette"); // create a new Palette in the HTML DIV element "palette"

    // creates relinkable Links that will avoid crossing Nodes when possible and will jump over other Links in their paths
    myDiagram.linkTemplate =
        $(go.Link, {
                routing: go.Link.AvoidsNodes,
                curve: go.Link.JumpOver,
                corner: 3,
                relinkableFrom: true,
                relinkableTo: true,
                selectionAdorned: false, // Links are not adorned when selected so that their color remains visible.
                shadowOffset: new go.Point(0, 0),
                shadowBlur: 5,
                shadowColor: "orange",
            },
            new go.Binding("isShadowed", "isSelected").ofObject(),
            $(go.Shape, {
                name: "SHAPE",
                strokeWidth: 2
            }));

    // node template helpers, the comments that appear if you hover over a component
    var sharedToolTip =
        $(go.Adornment, "Auto",
            $(go.Shape, "RoundedRectangle", {
                fill: "lightyellow"
            }),
            $(go.TextBlock, {
                    margin: 2
                },
                new go.Binding("text", "", function(d) {
                    return d.category;
                })));

    // define some common property settings
    function nodeStyle() {
        return [new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            new go.Binding("isShadowed", "isSelected").ofObject(),
            {
                selectionAdorned: false,
                shadowOffset: new go.Point(0, 0),
                shadowBlur: 20,
                shadowColor: "orange",
                toolTip: sharedToolTip
            }
        ];
    }

    //port that can have multiple outputs but one or no input
    function portStyle(input) {
        return {
            desiredSize: new go.Size(6, 20),
            fill: "transparent",
            stroke: "transparent",
            fromSpot: go.Spot.Right,
            fromLinkable: !input,
            toSpot: go.Spot.Left,
            toLinkable: input,
            cursor: "pointer"
        };
    }

    function portStyleMerger(input) {
        return {
            desiredSize: new go.Size(6, 20),
            fill: "transparent",
            stroke: "transparent",
            fromSpot: go.Spot.Right,
            fromLinkable: !input,
            toSpot: go.Spot.Left,
            toLinkable: input,
            toMaxLinks: 1,
            cursor: "pointer"
        };
    }
    //port that can have only one output
    function portStyleSplitter(input) {
        return {
            desiredSize: new go.Size(6, 20),
            fill: "transparent",
            stroke: "transparent",
            fromSpot: go.Spot.Right,
            fromLinkable: !input,
            toSpot: go.Spot.Left,
            toLinkable: input,
            toMaxLinks: 1,
            fromMaxLinks: 1,
            cursor: "pointer"
        };
    }

    //Components
    var pumpimage =
        $(go.Node, "Vertical", nodeStyle(),
            $(go.Panel, "Auto",
                $(go.Panel, "Vertical",
                    $(go.Picture, "Components/pump2.png", {
                        width: 34,
                        height: 34
                    })),
                $(go.Shape, "Rectangle", portStyleSplitter(false), {
                    portId: "out",
                    alignment: new go.Spot(1, 0.5)
                })

            ));

    var mergerimage =
        $(go.Node, "Vertical", nodeStyle(),
            $(go.Panel, "Auto",
                $(go.Panel, "Vertical",
                    $(go.Picture, "Components/merger2.png", {
                        width: 34,
                        height: 34
                    })),
                $(go.Shape, "Rectangle", portStyleMerger(true), {
                    portId: "in1",
                    alignment: new go.Spot(0, -0.2)
                }),
                $(go.Shape, "Rectangle", portStyleMerger(true), {
                    portId: "in2",
                    alignment: new go.Spot(0, 1.2)
                }),
                $(go.Shape, "Rectangle", portStyleSplitter(false), {
                    portId: "out",
                    alignment: new go.Spot(1, 0.5)
                })

            ));

    console.log(myDiagram.select);
    var splitterimage =
        $(go.Node, "Vertical", nodeStyle(),
            $(go.Panel, "Auto",
                $(go.Panel, "Vertical",
                    $(go.Picture, "Components/splitter2.png", {
                        width: 34,
                        height: 34
                    })),
                $(go.Shape, "Rectangle", portStyleMerger(true), {
                    portId: "in",
                    alignment: new go.Spot(0, 0.8)
                }),
                $(go.Shape, "Rectangle", portStyleSplitter(false), {
                    portId: "out1",
                    alignment: new go.Spot(1, -0.2)
                }),
                $(go.Shape, "Rectangle", portStyleSplitter(false), {
                    portId: "out2",
                    alignment: new go.Spot(1, 1.2)
                })
            ));

    var asplitterimage =
        $(go.Node, "Vertical", nodeStyle(),
            $(go.Panel, "Auto",
                $(go.Panel, "Vertical",
                    $(go.Picture, "Components/asplitter2.png", {
                        width: 34,
                        height: 34
                    })),
                $(go.Shape, "Rectangle", portStyleMerger(true), {
                    portId: "in",
                    alignment: new go.Spot(0, 0.8)
                }),
                $(go.Shape, "Rectangle", portStyleSplitter(false), {
                    portId: "out1",
                    alignment: new go.Spot(1, -0.2)
                }),
                $(go.Shape, "Rectangle", portStyleSplitter(false), {
                    portId: "out2",
                    alignment: new go.Spot(1, 1.2)
                })
            ));

    var sinkimage =
        $(go.Node, "Vertical", nodeStyle(),
            $(go.Panel, "Auto",
                $(go.Panel, "Vertical",
                    $(go.Picture, "Components/sink2.png", {
                        width: 34,
                        height: 34
                    })),
                $(go.Shape, "Rectangle", portStyle(true), {
                    portId: "in",
                    alignment: new go.Spot(0, 0.5)
                })

            ));
    // define templates for each type of node

    // add the templates created above to myDiagram and palette
    myDiagram.nodeTemplateMap.add("pump", pumpimage);
    myDiagram.nodeTemplateMap.add("merger", mergerimage);
    myDiagram.nodeTemplateMap.add("splitter", splitterimage);
    myDiagram.nodeTemplateMap.add("asplitter", asplitterimage);
    myDiagram.nodeTemplateMap.add("sink", sinkimage);

    // share the template map with the Palette, now both canvas and palette have the components
    palette.nodeTemplateMap = myDiagram.nodeTemplateMap;

    palette.model.nodeDataArray = [{
            category: "pump"
        },
        {
            category: "merger"
        },
        {
            category: "splitter"
        },
        {
            category: "asplitter"
        },
        {
            category: "sink"
        }
    ];

    // load the initial diagram
    load();

    // continually update the diagram
    loop();

    function Delete() {
        myDiagram.clearSelection();
    }
}

// update the diagram every 250 milliseconds
function loop() {
    setTimeout(function() {
        updateStates();
        loop();
    }, 250);
}

// update the value and appearance of each node according to its type and input values
//as i understood skipsundomanager is not to cause some problems when updating everything on canvas
//and interact with the undo property
function updateStates() {
    var oldskip = myDiagram.skipsUndoManager;
    myDiagram.skipsUndoManager = true;

    // drawing again the nodes
    myDiagram.nodes.each(function(node) {
        switch (node.category) {
            case "pump":
                doPump(node);
                break;
            case "merger":
                doMerger(node);
                break;
            case "splitter":
                doSplitter(node);
                break;
            case "asplitter":
                doAsplitter(node);
                break;
            case "sink":
                doSink(node);
                break;
        }
    });
    myDiagram.skipsUndoManager = oldskip;
}

// helper predicate
function linkIsTrue(link) { // assume the given Link has a Shape named "SHAPE"
    return link.findObject("SHAPE").stroke === green;
}

//!!!!!!!!!!!!!HERE WILL BE CHANGED THE COLOR OF PIPELINES
// helper function for propagating results
function setOutputLinks(node, color) {
    node.findLinksOutOf().each(function(link) {
        link.findObject("SHAPE").stroke = color;
    });
}

// update nodes by the specific function for its type
// determine the color of links coming out of this node based on those coming in and node type

function doPump(node) {
    var color = node.findLinksInto().all(linkIsTrue) ? green : red;
    setOutputLinks(node, color);
}

function doMerger(node) {
    var color = node.findLinksInto().all(linkIsTrue) ? green : red;
    setOutputLinks(node, color);

}

function doSplitter(node) {
    var color = node.findLinksInto().all(linkIsTrue) ? green : red;
    setOutputLinks(node, color);
}

function doAsplitter(node) {
    var color = node.findLinksInto().all(linkIsTrue) ? green : red;
    setOutputLinks(node, color);
}

function doSink(node) {
    var color = node.findLinksInto().all(linkIsTrue) ? green : red;
    setOutputLinks(node, color);
}

function doAnd(node) {
    var color = node.findLinksInto().all(linkIsTrue) ? green : red;
    setOutputLinks(node, color);
}

//TO BE MADE
// save a model to and load a model from JSON text, displayed below the Diagram
function sllave() {

    // document.getElementById("mySavedModel").value = myDiagram.model.toJson();
    myDiagram.isModified = false;
    alert(myDiagram.model.toJson());
    var filetext = myDiagram.model.toJson();
    download('test.txt', filetext);
}

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    } else {
        pom.click();
    }
}

function load() {
    var textresult;
    //  myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
    document.getElementById("openFile").addEventListener('change', function() {
        var fr = new FileReader();
        fr.onload = function() {
            document.getElementById("mySavedModel").innerHTML = this.result;
        }
        fr.readAsText(this.files[0]);
    })
}

    myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
}

function Delete() {
    console.dir(myDiagram.selection);
    myDiagram.clearSelected();
}