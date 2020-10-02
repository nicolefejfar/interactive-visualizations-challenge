// HTML IDs
{/* <div id="bar"></div>
<div id="gauge"></div> (BONUS)
<div id="bubble"></div> */}


// Functions to create charts
function drawBar(subjectID) {
    console.log("drawBar function for subject ID:", subjectID);
};

function drawBubble(subjectID) {
    console.log("drawBubble function for subject ID:", subjectID);
};

function drawGuage(subjectID) {
    console.log("drawGuage function for subject ID:", subjectID);
};

// Function to display subject metadata
function displayMetadata(subjectID) {
    console.log("displayMetadata function for subject ID:", subjectID);
};

// Event Handler for selecting new subject ID in dropdown box
function optionChanged(newsubjectID) {
    console.log("User selected subject ID:", newsubjectID);
    drawBar(newsubjectID);
    drawBubble(newsubjectID);
    drawGuage(newsubjectID);
    displayMetadata(newsubjectID);
};


function initDashboard() {
    var selector = d3.select("#selDataset");
    
    // Load the data
    d3.json("samples.json").then((data) => {
        console.log(data);

        // Get the subject names
        var subjectNames = data.names;

        // Populate the selector with the test subject IDs
        subjectNames.forEach((subjectID) => {
            selector.append("option")
                .text(subjectID)
                .property("value", subjectID);
        });
        
        // Get initial subject ID
        var subjectID = subjectNames[0];
        console.log("Initial subject ID:", subjectID);

        // Call the graph-drawing & metadata functions to display inital subject ID info
        drawBar(subjectID);
        drawBubble(subjectID);
        drawGuage(subjectID);
        displayMetadata(subjectID);
    });
}

initDashboard();