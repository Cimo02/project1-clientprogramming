var selectDiv;      // div element which contains all dynamically created select elements
var choiceData;     // JSON of all possible choices
var dataLength;     // length of the objects in the JSON data for choices
var title;          // page title
var header;         // header div
var colorDiv;       // shows the user selected color
var colorLabel;     // user selected color name

function init() {   
    // Create the page's ui elmeents and save them to the class variables
    createUi();

    // var choices is a JSON object
    // choces is a key within the JSON object
    choiceData = choices.choices;
    
    // Gets the length of data from the JSON object
    dataLength = Object.keys(choiceData).length;
    
    // Create initial div
    var mainDiv = document.createElement("div");
    mainDiv.id = 'selectDiv';
    document.body.append(mainDiv);

    // Create reset button
    var button = document.createElement("button");
    button.id = 'resetButton';
    var buttonText = document.createTextNode("Reset");
    button.append(buttonText);
    document.body.append(button);

    // Element assignments by ID
    selectDiv = document.getElementById('selectDiv');
    submitBtn = document.getElementById('submitBtn');
    resetButton = document.getElementById('resetButton');
    resetButton.addEventListener('click', resetPage);

    createSelectElement('Main');    
};

// Dynamically creates select elements based on a key
function createSelectElement(dataKey) {
    
    for (var i = 0; i < dataLength; i++) {
        
        // If choice does not match key, skip this data point
        if (choiceData[i].key != dataKey)
            continue;
        
        // Creates a header to label the specific select menu
        var h2 = document.createElement('h2');
        var textNode = document.createTextNode(choiceData[i].description);
        h2.className = choiceData[i].depth;
        h2.appendChild(textNode);
        selectDiv.appendChild(h2);
        
        // Creates the select list element
        var selectList = document.createElement('select');
        selectList.id = choiceData[i].key;
        selectList.name = choiceData[i].description;
        selectList.className = choiceData[i].depth;
        selectDiv.appendChild(selectList);
        
        // Creates null Select option
        var nullOption = document.createElement('option');
        nullOption.text = "Select an Option";
        nullOption.selected = true;
        nullOption.disabled = true;
        selectList.appendChild(nullOption);                
        
        // Creates option 1
        var newOption1 = document.createElement('option');
        newOption1.value = choiceData[i].option_1;
        newOption1.text = choiceData[i].option_1;
        selectList.appendChild(newOption1);
        
        // Creates option 2
        var newOption2 = document.createElement('option');
        newOption2.value = choiceData[i].option_2;
        newOption2.text = choiceData[i].option_2;
        selectList.appendChild(newOption2);

        // Creates option 3
        var newOption3 = document.createElement('option');
        newOption3.value = choiceData[i].option_3;
        newOption3.text = choiceData[i].option_3;
        selectList.appendChild(newOption3);

        // Hooks up an event to reload the choices whenever the select value is changed
        selectList.onchange = reloadSelect;
    }
};     

// Re-creates the select elements based on previous choice
function reloadSelect() {
    // removes any elements if necessary
    removeElements(this.className);
    
    // creates new select elements
    //console.log(this);
    //console.log(this.value);
    createSelectElement(this.value);
    
    if (this.className === "2") {
        updateUi(this.value);
    }
    // assigns the most recent selection value
    recentSelection = this;
};

// removes selected elemtents from the page 
function removeElements(className) {
    console.log(className);
    switch(className){
        case '0':
            // remove second and third selects
            removeSelect(1);
            removeSelect(2);
            resetColors(); // reset colors because the form isn't completed
            break;
        case '1': 
            // remove third select
            removeSelect(2);
            resetColors(); // reset colors because the form isn't completed
            break;
        case '2':
            // do nothing, there's nothing after this select to remove
            break;
        default: 
            // do nothing 
    }
}

// removes element with the specified class name
function removeSelect(className) {
    var parent = document.getElementById('selectDiv');
    var elements = parent.getElementsByClassName(className);

    while (elements[0]) {
        console.log("removing... " + elements[0]);
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function resetPage() {
    // delete all of the nodes from the page
    while (selectDiv.firstChild) {
        selectDiv.removeChild(selectDiv.firstChild);
    }

    // reset the page colors to default color
    var color = "#f5f5f5";
    title.style.color = color;
    colorDiv.style.backgroundColor = color;
    resetButton.style.backgroundColor = color;

    createSelectElement('Main');   
}

// creates the header and title for the page
function createUi() {
    // create the page header
    var headerElm = document.createElement("div");
    headerElm.id = 'header';

    // create the page title
    var titleElm = document.createElement("h1");
    titleElm.id = 'title';
    var titleNode = document.createTextNode("Color Mixer");
    titleElm.append(titleNode);

    // add the title to the header on the page 
    headerElm.append(titleElm);
    // add header to the page
    document.body.append(headerElm);

    // create color preview bar, default color is grey
    var colorDivElm = document.createElement("div");
    var colorLabelElm = document.createElement("label");

    // set ids and text
    colorDivElm.id = 'colorDiv';
    colorLabelElm.id = 'colorLabel';
    var colorNode = document.createTextNode("make a selection to change color");

    // append elements
    colorLabelElm.append(colorNode);
    colorDivElm.append(colorLabelElm);
    document.body.append(colorDivElm);

    // set class variables so we don't need to find the elements again they're updated
    title = document.getElementById('title');
    header = document.getElementById('header');
    colorDiv = document.getElementById('colorDiv');
    colorLabel = document.getElementById('colorLabel');
}

// Called after the user makes a final selection, changes the page title color to the selected color and makes a div with the selected color and name
function updateUi(saturationLevel) {
    var selects = $("select");
    
    // find select values
    var key = selects[1].value;
    var color = "#f5f5f5";
    
    // check the selections and set the color accordingly
    switch (key) {
        case 'Add Red, Make Red':
            color = "#f54242";
            break;
        case 'Add Blue, Make Blue':
            color = "#4281f5";
            break;
        case 'Add Yellow, Make Yellow':
            color = "#f5c242";
            break;
        case 'Add Blue, Make Green':
        case 'Add Yellow, Make Green':
            color = "#4cc744";
            break;
        case 'Add Red, Make Orange':
        case 'Add Yellow, Make Orange':
            color = "#f58142";
            break;
        case 'Add Blue, Make Purple':
        case 'Add Red, Make Purple':
            color ="#8742f5";
            break;
        default:
            break;
    }

    title.style.color = color;
    colorDiv.style.backgroundColor = color;
    resetButton.style.backgroundColor = color;
}

function resetColors () {
    var color = "#f5f5f5";
    title.style.color = color;
    colorDiv.style.backgroundColor = color;
    resetButton.style.backgroundColor = color;
}

window.onload = init;