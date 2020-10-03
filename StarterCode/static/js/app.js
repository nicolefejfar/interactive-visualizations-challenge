// Function to create charts & populate panel
function populatePage(subjectID) {
    // Get the sample data & create variables
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == subjectID);
        var result = resultArray[0];
        var sampleValues = result.sample_values
        var otuIDs = result.otu_ids;
        var otuLabels = result.otu_labels;
        var metaData = data.metadata;
        var metaArray = metaData.filter(md => md.id == subjectID);
        var metaResult = metaArray[0];
        var washFrequency = metaResult.wfreq;
                
        // Draw the bar chart
        var barData = [{
            x: sampleValues.slice(0, 10).reverse(),
            y: otuIDs.slice(0, 10).map(otuID => `OTU ${otuID} `).reverse(),
            text: otuLabels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h"
        }];
        var barLayout = {
            title: "Top 10 Bacterial Cultures Found",
            margin: {t: 30, l: 150}
        };
        Plotly.newPlot("bar", barData, barLayout);

        // Draw the bubble graph
        var bubbleData = [{
            x: otuIDs,
            y: sampleValues,
            text: otuLabels,
            type: "bubble",
            mode: "markers",
            marker: {
                size: sampleValues,
                color: otuIDs,
                colorscale: "Earth"
            }
        }];
        var bubbleLayout = {
            title: `Bacterial Diversity`,
            margin: {t: 30, l: 150},
        };
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

        // Populate the panel with demographic info
        var panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(metaResult).forEach(([key, value]) => {
            panel.append("h6").text(`${key}: ${value}`);
        });

        // Create gauge / indicator graph
        var gaugeData = [{
            type: "indicator",
            mode: "gauge+number",
            value: washFrequency,
            title: {text: "Wash Frequency (Per Week)", font: {size: 18}},
            gauge: {
                axis: {range: [0,9]},
                bar: {color: "#83406f"},
                steps: [
                    {range: [0, 1], color: "#edcce2"},  
                    {range: [1, 2], color: "#e0bad3"},
                    {range: [2, 3], color: "#d2a8c4"},
                    {range: [3, 4], color: "#c596b5"},
                    {range: [4, 5], color: "#b884a7"},
                    {range: [5, 6], color: "#aa7399"},  
                    {range: [6, 7], color: "#9d628b"},
                    {range: [7, 8], color: "#90517d"},
                    {range: [8, 9], color: "#83406f"}
                ]
            }
        }]

        var gaugeLayout = {
            width: 500,
            margin: {r: 100}
        }

        Plotly.newPlot("gauge", gaugeData, gaugeLayout);
    });
};

// Event Handler for selecting new subject ID in dropdown box
function optionChanged(newSubjectID) {
    console.log("User selected subject ID:", newSubjectID);
    populatePage(newSubjectID);
};

// Initialization function to draw data for first subject
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
        populatePage(subjectID);
    });
}

initDashboard();