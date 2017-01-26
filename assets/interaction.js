

//Display short description of component in the upper componentsbar
function DisplayCompIntro(selected) {
    console.log(selected);
    var texth2, textp;
    if (selected == 'pump') {
        texth2 = "Pump";
        textp = "Starting-point of network. In:0  Out:1";
        // DisplayCompOptions('pump');
    }
    else if (selected == 'sink') {
        texth2 = "Sink";
        textp = "Ending-point of network. In:1 or infinite    Out:0";
    }
    else if (selected == 'merger') {
        texth2 = "Merger";
        textp = "Combines two pipelines. In:2    Out:1";
    }
    else if (selected == 'splitter') {
        texth2 = "Splitter";
        textp = "Splits one pipeline in half. In:1   Out:2";
    }
    else if (selected == 'asplitter') {
        texth2 = "Adjustable splitter";
        textp = "Splits one pipeline into two by choosing upper output. In:1   Out:2";

    }
    else if (selected == 'pipeline') {
        texth2 = "Pipeline";
        textp = "Connects two components. Click on start-component and then end-component";
    }

    document.getElementById("comName").innerHTML = texth2;
    document.getElementById("comIntro").innerHTML = textp;
}







function ShowSettings(evt, selectedtab) {
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

}



function ShowSelectedComponentInfo(selected)
{
    document.getElementById("defaultTab").click();
    var selectedname = document.getElementById("selectedName");
    var currentflow = document.getElementById("currentFlow");
    var option1name = document.getElementById("option1name");
    var option1 = document.getElementById("option1");
    var option2name = document.getElementById("option2name");
    var option2 = document.getElementById("option2");
    var flow= 0;

    if(selected instanceof Component){
        flow = selected.currentAmount;
    }
    if(selected instanceof AdjustableSplitter)
    {
        selectedname.innerHTML = "ADJUSTABLE SPLITTER";
        currentflow.innerHTML = "Current flow: " + selected.currentAmount;

        option1.innerHTML='';
        option1name.innerHTML="Upper outflow %:";
        var input = document.createElement('input');
        input.max = 100;
        input.min=0;
        input.type = "number";
        option1.appendChild(input);
        //var slider = document.createElement('div');
        //slider.id="slider";
        //option1.appendChild(slider);
        //var handle = document.createElement('div');
        //handle.id="custom-handle";
        //handle.className="ui-slider-handle";
        //slider.appendChild(handle);

        option2name.innerHTML='';
        option2.innerHTML='';
    }
    else if(selected instanceof Splitter)
    {
        selectedname.innerHTML = "SPLITTER";
        currentflow.innerHTML = "Current flow: " + selected.currentAmount;
        option1name.innerHTML='';
        option1.innerHTML='';
        option2name.innerHTML='';
        option2.innerHTML='';
    }

    else if(selected instanceof Pump)
    {
        selectedname.innerHTML = "PUMP";
        currentflow.innerHTML = "Current flow: " + selected.currentAmount;

        option1.innerHTML='';
        option1name.innerHTML="Set Max flow:";
        var maxflow = document.createElement("input");
        maxflow.type = "number";
        maxflow.min=0;
        maxflow.value=selected.GetMaximumFlow();
        option1.appendChild(maxflow);

        option2.innerHTML='';
        option2name.innerHTML="Adjust current flow:";
        var curflow = document.createElement("input");
        curflow.type = "number";
        curflow.min=0;
        curflow.max= selected.GetMaximumFlow();
        curflow.value=selected.currentAmount;
        option2.appendChild(curflow);

        // --in case of jquery usage
        // option1name.innerHTML="Max flow:";
        // var inputAS = document.createElement("input");
        // inputAS.type = "text";
        // option1.appendChild(inputAS);
        //
        // option2name.innerHTML="Current flow:";
        // var spinner = document.createElement('label');
        // spinner.for="spinner";
        // option2.appendChild(spinner);
        // var inputPUMP = document.createElement('input');
        // inputPUMP.id="spinner";
        // inputPUMP.name = "value";
        // spinner.appendChild(inputPUMP);
    }
    else if(selected instanceof Sink)
    {

        selectedname.innerHTML = "SINK";
        currentflow.innerHTML = "Current flow: " + selected.currentAmount;
        option1name.innerHTML='';
        option1.innerHTML='';
        option2name.innerHTML='';
        option2.innerHTML='';
    }

   else if(selected instanceof Merger)
    {

        selectedname.innerHTML = "MERGER";
        currentflow.innerHTML = "Current flow: " + selected.currentAmount;
        option1name.innerHTML='';
        option1.innerHTML='';
        option2name.innerHTML='';
        option2.innerHTML='';
    }

   else  if(selected instanceof Pipeline)
    {
        flow= selected.currentflow;
        selectedname.innerHTML = "PIPELINE";
        currentflow.innerHTML = "Current flow: " + flow;
        option1name.innerHTML='Pipeline sate: '+ selected.state;
        option1.innerHTML='';
        option2name.innerHTML='';
        option2.innerHTML='';
    }
}











