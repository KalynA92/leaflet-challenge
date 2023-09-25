# leaflet-challenge

## Task

The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

## Part 1: Create the Earthquake Visualization

1. Get your dataset. To do so, follow these steps:

	The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the USGS GeoJSON FeedLinks to an external site. page and choose a 	dataset to visualize.

2.  Import and visualize the data by doing the following:

	Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.

	Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should 	appear larger, and earthquakes with greater depth should appear darker in color.

	Include popups that provide additional information about the earthquake when its associated marker is clicked.

	Create a legend that will provide context for your map data.

# Description

I started by selecting the earthquake data over the last week from the USGS. I stored this url and performed a request for the data from this url. Once the data responded, I sent the data to the create features function to begin developing the features for the map. I defined the size of the markers based on the magnitude of any given earthquake. I determined the color scale based on the depth of any given earthquake. I created a function with the feature data and created a geoJSON layer with this data. I created a bind popup for each marker for a description of time and place of any given earthquake. I adjusted the marker's size and colour based on the magnitude and depth of any given earthquake. I sent the geoJSON layer to createMap function, created the tile layers, baseMap, and overlayMap objects. Created the map and layer control for baseMaps and overlayMaps objets. Set up and added the legend to the map.

# References and citations

https://leafletjs.com/reference.html#marker

https://leafletjs.com/reference.html#geojson

https://leafletjs.com/examples/choropleth/ - Reference for creating and adding legend to map