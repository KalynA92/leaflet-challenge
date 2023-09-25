// Store our API endpoint as url.
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

// Perform a GET request to the query url.
d3.json(url).then(function (data) {

    //Once we get a response, send the data.features object to the createFeatures function.
    createFeatures(data.features);
  });

// Determine marker size based on magnitude of an earthquake.
function markerSize(magnitude) {
  return magnitude * 20000;
};

// Determine marker colour based on depth of an earthquake.
function changeColour(depth) {
  if (depth < 10) return "green";
  else if (depth < 30) return "lime";
  else if (depth < 50) return "yellow";
  else if (depth < 70) return "orange";
  else if (depth < 90) return "darkorange";
  else return "red";
}

function createFeatures(earthquakeData) {

  // Create the geoJSON layer that contains the features array on the eathquakeData object.
  let earthquakes = L.geoJSON(earthquakeData, {

    // Bind popup description of place and time of an earthquake to each layer.
    onEachFeature: function(feature, layer) {
      layer.bindPopup(
        "<h3>Place: " + feature.properties.place + "</h3>" +
        "<h3>Date: " + new Date(feature.properties.time) + "</h3>",
      );   
    },

    // Change description of the markers.
    pointToLayer: function(feature, latlng) {

      // Adjust marker's size and color based on depth and magnitude of an earthquake
      let markers = {
        radius: markerSize(feature.properties.mag),
        fillColor: changeColour(feature.geometry.coordinates[2]),
        fillOpacity: 0.5,
        color: "black",
        weight: 0.5
      }
      return L.circle(latlng, markers);
    }
  });

  // Send our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Create tile layers

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

  //Create baseMaps object.
  let baseMaps = {
    "Street": street,
    "Topo": topo
  };

  //Create overlayMaps object.
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map.
  let map = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [street, earthquakes]
  });

  // Create a layer control for baseMaps and overlayMaps objects.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);


  // Set up the legend.
  let legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {
  
      let div = L.DomUtil.create('div', 'info legend'),
          grades = [-10, 10, 30, 50, 70, 90,],
          labels = [];
  
      // loop through our density intervals and generate a label with a colored square for each interval
      for (let i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + changeColour(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }
  
      return div;
  };
  
  legend.addTo(map);
};