# Earthquake Visualization with Leaflet.js

The Leaflet Challenge provides an interactive map that visualizes real-time earthquake data using Leaflet.js and D3.js. The application pulls data from the USGS API, mapping earthquake locations and magnitudes while incorporating tectonic plate boundaries to analyze seismic activity in a broader geospatial context.

## Key Observations

- **Geographic Distribution**  
  Earthquake activity is highly concentrated along tectonic plate boundaries, particularly around the Pacific Ring of Fire. Other notable clusters appear near fault lines in the Mediterranean, South Asia, and mid-Atlantic regions.

- **Magnitude and Depth Trends**  
  The majority of recorded earthquakes have magnitudes below 5.0, with deeper earthquakes typically occurring along subduction zones. The relationship between depth and magnitude presents patterns worth further exploration.

- **Regional Variability**  
  Some regions exhibit frequent, low-magnitude earthquakes, while others experience fewer but more severe seismic events. Examining these differences can help in understanding seismic risks and geological activity.

## Potential Areas for Further Analysis

- **Temporal Patterns**  
  Are there seasonal or long-term trends in earthquake activity?  
- **Magnitude-Density Relationships**  
  How does the magnitude of earthquakes correlate with their density in a given area?  
- **Comparison with Historical Data**  
  How does current earthquake activity compare to past trends?  

## Next Steps

While this visualization provides a strong foundation for understanding global earthquake distribution, further statistical and geospatial analysis could enhance its predictive and analytical capabilities. Expanding the dataset to include historical trends and seismic activity models could offer deeper insights into earthquake patterns and potential risk assessments.

## Features

- **Real-Time Earthquake Data**: Retrieves up-to-date earthquake data from the USGS GeoJSON API.
- **Magnitude-Based Scaling**: Circle markers scale in size according to earthquake magnitude.
- **Depth-Based Coloring**: Markers change color based on depth to indicate seismic intensity.
- **Interactive Popups**: Displays key earthquake details, including location, magnitude, depth, and time.
- **Tectonic Plate Overlays**: Shows the relationship between earthquake locations and tectonic plate boundaries.
- **Multiple Base Maps**: Users can toggle between different map views, including street, satellite, and dark mode.
- **Layer Controls**: Allows toggling between earthquake data and tectonic plate boundaries.

## Technologies Used

- **Leaflet.js** - Renders interactive map layers and visualizations.
- **D3.js** - Fetches and processes earthquake data from the USGS API.
- **GeoJSON** - Data format for geospatial mapping.
- **OpenStreetMap & Carto** - Provides different map tile layers for enhanced visualization.
