

//Display short description of component in the upper componentsbar
 function DisplayCompIntro(selected)
 {
     console.log(selected);
    var texth2, textp;
    if(selected=='pump'){
        texth2="Pump";
        textp="Starting-point of network. In:0  Out:1";
        DisplayCompOptions('pump');
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
        textp="Connects two components. Click on start-component and then end-component";
    }

    document.getElementById("comName").innerHTML = texth2;
    document.getElementById("comIntro").innerHTML = textp;
}

//JQuery for slider, code gotten from jquery API site




//function to set pipelines maxflow, it will get some improvement to control user input (avoid non-integers/out of range)
$( function()
{
    $( "#spinner" ).spinner
    ({
        min:1,
        change: function (event,ui) {
            var value = $(this).val();
            if(value<1 || isNaN(value ))
            {
                $(this).val(1)
            }
        }
    }).val(10);
}
);

$( function()
{
    var handle = $( "#custom-handle" );
    $( "#slider" ).slider({
        max:15,
        value:6,
        create: function() {
            handle.text( $( this ).slider( "value" ) );
        },
        slide: function( event, ui ) {
            handle.text( ui.value );
        }
    });
}
);


$( "#deletebut" ).on( "click", function() {
    alert( "potato" );
});


function ShowSettings(evt, selectedtab)
{
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }


    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(selectedtab).style.display = "block";
    evt.currentTarget.className += " active";

    document.getElementById("currentFlow").innerHTML = "7";
}


function ShowSelectedComponentInfo(selected)
{

    var selectedname = document.getElementById("selectedName");
    var currentflow = document.getElementById("currentFlow");
    var option1name = document.getElementById("option1name");
    var option1 = document.getElementById("option1");
    var option2name = document.getElementById("option2name");
    var option2 = document.getElementById("option2");
    if(selected=="Asplitter")
    {
        selectedname.innerHTML = "ADJUSTABLE SPLITTER";
        currentflow.innerHTML = "1";
        option1name.innerHTML="Upper outflow:";

        var slider = document.createElement('div');
        slider.id="slider";
        option1.appendChild(slider);
        var handle = document.createElement('div');
        handle.id="custom-handle";
        handle.className="ui-slider-handle";
        slider.appendChild(handle);

    }
    if(selected=="Splitter")
    {
        selectedname.innerHTML = "SPLITTER";
        currentflow.innerHTML = "1";
    }
    if(selected=="Pump")
    {
        selectedname.innerHTML = "PUMP";
        currentflow.innerHTML = "1";
        option1name.innerHTML="Max flow:";
        var inputAS = document.createElement("input");
        inputAS.type = "text";
        option1.appendChild(inputAS);

        option2name.innerHTML="Current flow:";
        var spinner = document.createElement('label');
        spinner.for="spinner";
        option2.appendChild(spinner);
        var inputPUMP = document.createElement('input');
        inputPUMP.id="spinner";
        inputPUMP.name = "value";
        spinner.appendChild(inputPUMP);
    }
    if(selected=="Sink")
    {
        selectedname.innerHTML = "SINK";
        currentflow.innerHTML = "1";
    }
    if(selected=="Merger")
    {
        selectedname.innerHTML = "MERGER";
        currentflow.innerHTML = "1";
    }
    if(selected=="Pipeline")
    {
        selectedname.innerHTML = "PIPELINE";
        currentflow.innerHTML = "1";
    }
}









