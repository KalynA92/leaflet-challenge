// Store our API endpoint as queryURL.
let queryURL = "hhttps://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Perform a GET reuqest to the URL.
d3.json(queryURL).then(function (data) {
    
    // Once we get a response, send the data.features object to the createFeatures function.
    createFeatures(data.features);
  });

// Define a markerSize() function that will give each city a different radius based on its magnitude.
function markerSize(magnitude) {
  return magnitude * 20000;
};

// Determine the color of the marker based on the depth of the earthquake.
function chooseColour(depth) {
  if (depth > 10) return "green";
  else if (depth > 30) return "lime";
  else if (depth > 50) return "yellow";
  else if (depth > 70) return "orange";
  else if (depth > 90) return "amber";
  else return "red";
}
 
// Create a GeoJSON layer that contains the features array on the earthquakeData object.
function createFeatures(earthquakeData) { 
  let earthquakes = L.geoJSON(earthquakeData, {
        
    // Give each feature a popup that describes the place and time of the earthquake.
    onEachFeature: function(feature, layer) {
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);            
    },

    // Change description for each marker.
    changeMarker: function(feature, markerSwap) {

      // Set the size and colour of the markers.
      let markers = {
        radius: markerSize(feature.properties.mag),
        fillColour: chooseColour(feature.geometry.coordinate[2]),
        fillOpacity: 0.7,
        colour: "black",
        weight: 0.5
      }
      return L.circle(markerSwap, markers);
    }
  });

  // Send our earthquakes layer to the createMap function.
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Create the base layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create baseMaps object.
  let baseMaps = {
    "Street": street,
    "Topo": topo
  };

  // Create an overlay object to hold our overlay.
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 4,
    layers: [street, earthquakes]
  });

  // Create a layer control. Pass it our baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: true
  }).addTo(myMap);

  // Set up the legend.
  let legend = L.control({ position: "bottomright" });
  legend.onAdd = function(map) {
    let div = L.DomUtil.create("div", "info legend");
      grades = [-10, 10, 30, 50, 70, 90];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + chooseColour(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
  };

  legend.addTo(myMap);
};