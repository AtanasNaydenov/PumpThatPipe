/* Not necessary in current context
var canvas; // the whole app area
var drawingArea; // drawing area
var componentsBar; // Pipeline and components area
var optionsBar; // Options and settings area

function init() {
    canvas.getElementsByClassName("canvas");
    canvas.getContext("2d");
    drawingArea.getElementsByClassName("drawingArea");
    componentsBar.getElementsByClassName("componentsBar");
    optionsBar.getElementsByClassName("optionsBar");

}*/

//Display short description of component in the upper componentsbar
 function DisplayCompIntro(selected)
 {
     console.log(selected);
    var texth2, textp;
    if(selected=='pump'){
        texth2="Pump";
        textp="Starting-point of network. In:0  Out:1";
        }
    else if(selected=='sink'){
        texth2="Sink";
        textp="Ending-point of network. In:1 or infinite    Out:0";
    }
    else if(selected=='merger'){
        texth2="Merger";
        textp="Combines two pipelines. In:2    Out:1";
    }
    else if(selected=='splitter'){
        texth2="Splitter";
        textp="Splits one pipeline in half. In:1   Out:2";
    }
    else if(selected=='asplitter'){
        texth2="Adjustable splitter";
        textp="Splits one pipeline into two by choosing upper output. In:1   Out:2";
    }
    else if(selected=='pipeline'){
        texth2="Pipeline";
        textp="Connects two components. In:1    Out:1";
    }

    document.getElementById("comName").innerHTML = texth2;
    document.getElementById("comIntro").innerHTML = textp;
}

//JQuery for slider, code gotten from jquery API site
$( function() {
    var handle = $( "#custom-handle" );
    $( "#slider" ).slider({
        max:15,
        create: function() {
            handle.text( $( this ).slider( "value" ) );
        },
        slide: function( event, ui ) {
            handle.text( ui.value );
        }
    });
} );


//source:set maxflow, current flow
//