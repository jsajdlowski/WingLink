//eslint-ignore-file
import React, {useEffect, useRef} from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5map from '@amcharts/amcharts5/map'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import am4geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow'
import {useAppDispatch, useAppSelector} from "../../hooks/storeHooks.ts"; // useAppDispatch removed
import {selectSearch, setSearch} from "../../store/flightSearchSlice.ts";
import {selectAirports} from "../../store/airportsSlice.ts"; // setAirports removed
import {useFetchAirports} from "./hooks.ts";
import {getSelectedField, SearchFormFields, setSelectedField} from "../../store/currentlySelectedSearchFieldSlice.ts";
import {getSelectedCountry, setSelectedCountry} from "../../store/selectedCountrySlice.ts";

const MapChart = () => {
  const chartRef = useRef('')
  const {destination, origin} = useAppSelector(selectSearch);
  const {airports} = useAppSelector(selectAirports);
  const {selectedField} = useAppSelector(getSelectedField);
  const dispatch = useAppDispatch();
  // Call useFetchAirports at the top level.
  // SWR within useFetchAirports will handle caching and prevent multiple fetches.
  // The hook itself dispatches to the store.
  useFetchAirports();
  const {selectedCountry} = useAppSelector(getSelectedCountry);
  const countryAirportSeriesRef = useRef(null);
  const lineSeriesRef = useRef(null); // Use ref to keep the lineSeries accessible in the effect


  useEffect(() => {
    // Check if airports are loaded
    // if (!airports || airports.length === 0) {
    //   console.log('Airports data is not loaded yet.')
    //   return
    // }

    // Create root element
    const root = am5.Root.new(chartRef.current)

    // Set themes
    root.setThemes([am5themes_Animated.new(root)])

    // Create the map chart
    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'translateX',
        panY: 'translateY',
        projection: am5map.geoMercator(),
      })
    )

    // Add labels and controls
    const cont = chart.children.push(
      am5.Container.new(root, {
        layout: root.horizontalLayout,
        x: 20,
        y: 40,
      })
    )

    cont.children.push(
      am5.Label.new(root, {
        centerY: am5.p50,
        text: 'Map',
      })
    )

    const switchButton = cont.children.push(
      am5.Button.new(root, {
        themeTags: ['switch'],
        centerY: am5.p50,
        icon: am5.Circle.new(root, {
          themeTags: ['icon'],
        }),
      })
    )

    switchButton.on('active', function () {
      if (!switchButton.get('active')) {
        chart.set('projection', am5map.geoMercator())
        chart.set('panX', 'translateX')
        chart.set('panY', 'translateY')
      } else {
        chart.set('projection', am5map.geoOrthographic())
        chart.set('panX', 'rotateX')
        chart.set('panY', 'rotateY')
      }
    })

    cont.children.push(
      am5.Label.new(root, {
        centerY: am5.p50,
        text: 'Globe',
      })
    )

    // Create main polygon series for countries
    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am4geodata_worldLow,
        exclude: ["AQ"] // Exclude Antarctica
      })
    )

    // Add click event to polygons
    polygonSeries.mapPolygons.template.events.on("click", function (ev) {
      const dataItem = ev.target.dataItem;
      let countryName = dataItem.dataContext.name;
      switch (countryName) {
        case "United States":
          countryName = "United States of America"
          break;
        case "United Kingdom":
          countryName = "United Kingdom of Great Britain and Northern Ireland"
          break;
        case "Russia":
          countryName = "Russian Federation"
          break;
        default:
          break;
      }
      dispatch(setSelectedCountry({selectedCountry: countryName}));
      console.log("Selected country:", countryName);

      // Zoom to the clicked country
      console.log("Attempting to zoom to:", dataItem.dataContext.name, dataItem);
      // chart.zoomToDataItem(dataItem, 1000, true); // Zoom over 1 second, center it

      // Set active state for clicked polygon and deactivate others
      polygonSeries.mapPolygons.each(function (polygon) {
        polygon.set("active", false);
      });
      ev.target.set("active", true);
    });

    // Optional: Add hover state for better UX
    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x014185) // Change color on hover
    });

    // Optional: Add active state for selected polygon
    // polygonSeries.mapPolygons.template.states.create("active", {
    //   fill: am5.color(0x4CAF50) // Change color when active/selected
    // });


    const graticuleSeries = chart.series.push(
      am5map.GraticuleSeries.new(root, {})
    )
    graticuleSeries.mapLines.template.setAll({
      stroke: root.interfaceColors.get('alternativeBackground'),
      strokeOpacity: 0.08,
    })

    // Create line series for trajectory lines
    const lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}))
    lineSeries.mapLines.template.setAll({
      // stroke: root.interfaceColors.get('alternativeBackground'), // Original stroke
      stroke: am5.color(0xf5a142), // Changed for visibility (green)
      strokeOpacity: 0.8, // Increased opacity
      // strokeWidth: 2, // Added for thickness

    })

    lineSeriesRef.current = lineSeries; // Store lineSeries in ref for later use

    // Create point series for airports in the selected country
    countryAirportSeriesRef.current = chart.series.push(
      am5map.MapPointSeries.new(root, {idField: "id"}) // Added idField for potential use
    );
    countryAirportSeriesRef.current.bullets.push(function () {
      const airportCircle = am5.Circle.new(root, {
        radius: 4, // Smaller radius
        tooltipText: "{title}",
        fill: am5.color(0xffba00), // Orange color for these airports
        stroke: root.interfaceColors.get("background"),
        strokeWidth: 1
      });
      airportCircle.events.on('click', function (e) {
        // selectOrigin(e.target.dataItem.get('id'))
        console.log(e.target.dataItem.dataContext.id)
        console.log('selectedField', selectedField)
        switch (selectedField) {
          case SearchFormFields.FROM:
            dispatch(setSearch({origin: e.target.dataItem.dataContext.id, destination: destination}));
            dispatch(setSelectedField({selectedField: SearchFormFields.TO}))
            break;
          case SearchFormFields.TO:
            dispatch(setSearch({origin: origin, destination: e.target.dataItem.dataContext.id}));
            break;
        }
        dispatch(setSelectedCountry({selectedCountry: ''}));
      })
      return am5.Bullet.new(root, {
        sprite: airportCircle
      });
    });

    let currentId = ''

    // Make stuff animate on load
    chart.appear(1000, 100)

    // Cleanup on unmount
    return () => {
      root.dispose()
    }
  }, [airports, dispatch, selectedField]) // Main chart setup dependencies

  // Effect to update airports based on selectedCountry
  useEffect(() => {
    if (countryAirportSeriesRef.current && airports && airports.length > 0) {
      console.log('Updating airports based on selected country:', selectedCountry);
      if (selectedCountry) {
        const filteredAirports = airports.filter(
          (airport) => airport.country.toLowerCase() === selectedCountry.toLowerCase()
        );
        const filteredSelectedAirports = airports.filter((airport) => airport.code === origin || airport.code === destination);
        // Combine filtered airports with selected origin and destination airports
        const combinedAirports = [...filteredAirports, ...filteredSelectedAirports];
        const countryAirportData = combinedAirports.map(airport => ({
          id: airport.code, // Use airport code as ID
          title: airport.name,
          geometry: {
            type: "Point",
            coordinates: [airport.longitude, airport.latitude]
          }
        }));
        countryAirportSeriesRef.current.data.setAll(countryAirportData);
      } else {
        const filteredSelectedAirports = airports.filter((airport) => airport.code === origin || airport.code === destination);
        const countryAirportData = filteredSelectedAirports.map(airport => ({
          id: airport.code, // Use airport code as ID
          title: airport.name,
          geometry: {
            type: "Point",
            coordinates: [airport.longitude, airport.latitude]
          }
        }));
        countryAirportSeriesRef.current.data.setAll(countryAirportData);
      }
    }
  }, [selectedCountry, airports, origin, destination]); // Rerun when selectedCountry or airports list changes

  useEffect(() => {
    function drawLineBetweenAirports(originAirport, destinationAirport) {
      // lineSeries is accessible from the outer scope
      if (!originAirport || !destinationAirport) {
        console.error('Origin or destination airport not found for drawing line.');
        if (lineSeriesRef.current) { // Check if lineSeries is initialized
          lineSeriesRef.current.data.setAll([]); // Clear lines if airports are not valid
        }
        return;
      }

      const lineData = {
        geometry: {
          type: 'LineString',
          coordinates: [
            [originAirport.longitude, originAirport.latitude],
            [destinationAirport.longitude, destinationAirport.latitude],
          ],
        },
      };

      lineSeriesRef.current.data.setAll([lineData]);
    }

    // Ensure lineSeries is initialized before trying to use it
    if (!lineSeriesRef.current) {
      return; // lineSeries not ready, do nothing
    }
    // Ensure airports are loaded
    if (!airports || airports.length === 0) {
      lineSeriesRef.current.data.setAll([]); // Clear lines if airports not ready
      return;
    }

    if (origin && destination) {
      const originAirport = airports.find(
        (airport) => airport.code === origin
      );
      const destinationAirport = airports.find(
        (airport) => airport.code === destination
      );

      if (originAirport && destinationAirport) {
        // Call the drawLineBetweenAirports function defined in the outer scope
        drawLineBetweenAirports(originAirport, destinationAirport);
      } else {
        // If one of the airports is not found
        lineSeriesRef.current.data.setAll([]);
        if (!originAirport && origin) console.warn(`MapChart: Origin airport with code "${origin}" not found.`);
        if (!destinationAirport && destination) console.warn(`MapChart: Destination airport with code "${destination}" not found.`);
      }
    } else {
      // If either origin or destination is not set, clear the lines
      lineSeriesRef.current.data.setAll([]);
    }
  }, [origin, destination]); // Dependencies

  // The useEffect for fetching airports has been removed.
  // useFetchAirports() is now called at the top level of the component.

  return <div ref={chartRef} style={{width: '100%', height: '500px'}}></div>
}

export default MapChart
