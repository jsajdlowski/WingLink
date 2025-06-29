import { useEffect, useRef } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5map from '@amcharts/amcharts5/map'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import am4geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow'
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks.ts'
import { selectSearch, setSearch } from '../../store/flightSearchSlice.ts'
import { selectAirports } from '../../store/airportsSlice.ts'
import { useFetchAirports } from './hooks.ts'
import {
  getSelectedField,
  SearchFormFields,
  setSelectedField,
} from '../../store/currentlySelectedSearchFieldSlice.ts'
import {
  getSelectedCountry,
  setSelectedCountry,
} from '../../store/selectedCountrySlice.ts'
import { MapLineSeries, MapPointSeries } from '@amcharts/amcharts5/map'
import { Airport } from '../flights/types.ts'

interface CountryDataContext {
  name: string
}

interface AirportDataContext {
  id: string
  title: string
}

const MapChart = () => {
  const chartRef = useRef<HTMLDivElement>(null)
  const { destination, origin } = useAppSelector(selectSearch)
  const { airports } = useAppSelector(selectAirports)
  const { selectedField } = useAppSelector(getSelectedField)
  const dispatch = useAppDispatch()
  useFetchAirports()
  const { selectedCountry } = useAppSelector(getSelectedCountry)
  const countryAirportSeriesRef = useRef<MapPointSeries | null>(null)
  const lineSeriesRef = useRef<MapLineSeries | null>(null)

  useEffect(() => {
    const root = am5.Root.new(chartRef.current as HTMLElement)

    root.setThemes([am5themes_Animated.new(root)])

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'translateX',
        panY: 'translateY',
        projection: am5map.geoMercator(),
        minZoomLevel: 1.5,
        maxZoomLevel: 10,
        zoomLevel: 2.5,
        centerMapOnZoomOut: true,
        homeGeoPoint: { longitude: 10, latitude: 20 },
      })
    )

    const cont = chart.children.push(
      am5.Container.new(root, {
        layout: root.horizontalLayout,
        x: 20,
        y: 40,
        background: am5.RoundedRectangle.new(root, {
          fill: am5.color(0x000000),
          fillOpacity: 0.5,
          cornerRadiusTL: 8,
          cornerRadiusTR: 8,
          cornerRadiusBL: 8,
          cornerRadiusBR: 8,
        }),
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: 12,
      })
    )

    cont.children.push(
      am5.Label.new(root, {
        centerY: am5.p50,
        text: 'Map',
        fill: am5.color(0xffffff),
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
        fill: am5.color(0xffffff),
      })
    )

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am4geodata_worldLow,
        exclude: ['AQ'],
      })
    )

    polygonSeries.mapPolygons.template.events.on('click', function (ev) {
      const dataItem = ev.target.dataItem
      const dataContext = dataItem?.dataContext as CountryDataContext
      let countryName = dataContext?.name ?? ''
      switch (countryName) {
        case 'United States':
          countryName = 'United States of America'
          break
        case 'United Kingdom':
          countryName = 'United Kingdom of Great Britain and Northern Ireland'
          break
        case 'Russia':
          countryName = 'Russian Federation'
          break
        default:
          break
      }
      dispatch(setSelectedCountry({ selectedCountry: countryName }))

      polygonSeries.mapPolygons.each(function (polygon) {
        polygon.set('active', false)
      })
      ev.target.set('active', true)
    })

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: '{name}',
      interactive: true,
    })

    polygonSeries.mapPolygons.template.states.create('hover', {
      fill: am5.color(0x014185),
    })

    const graticuleSeries = chart.series.push(
      am5map.GraticuleSeries.new(root, {})
    )
    graticuleSeries.mapLines.template.setAll({
      stroke: root.interfaceColors.get('alternativeBackground'),
      strokeOpacity: 0.08,
    })

    const lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}))
    lineSeries.mapLines.template.setAll({
      stroke: am5.color(0xf5a142),
      strokeOpacity: 0.8,
    })

    lineSeriesRef.current = lineSeries

    countryAirportSeriesRef.current = chart.series.push(
      am5map.MapPointSeries.new(root, { idField: 'id' })
    )
    countryAirportSeriesRef.current.bullets.push(function () {
      const airportCircle = am5.Circle.new(root, {
        radius: 4,
        tooltipText: '{title}',
        fill: am5.color(0xffba00),
        stroke: root.interfaceColors.get('background'),
        strokeWidth: 1,
      })
      airportCircle.events.on('click', function (e) {
        const dataItem = e.target.dataItem
        const dataContext = dataItem?.dataContext as AirportDataContext

        switch (selectedField) {
          case SearchFormFields.FROM:
            dispatch(
              setSearch({
                origin: dataContext.id,
                destination: destination ?? '',
              })
            )
            dispatch(setSelectedField({ selectedField: SearchFormFields.TO }))
            break
          case SearchFormFields.TO:
            dispatch(
              setSearch({
                origin: origin ?? '',
                destination: dataContext.id ?? '',
              })
            )
            break
        }
        dispatch(setSelectedCountry({ selectedCountry: '' }))
      })
      return am5.Bullet.new(root, {
        sprite: airportCircle,
      })
    })

    chart.appear(1000, 100)

    return () => {
      root.dispose()
    }
  }, [airports, dispatch, selectedField, destination, origin])

  useEffect(() => {
    if (countryAirportSeriesRef.current && airports && airports.length > 0) {
      if (selectedCountry) {
        const filteredAirports = airports.filter(
          (airport) =>
            airport.country.toLowerCase() === selectedCountry.toLowerCase()
        )
        const filteredSelectedAirports = airports.filter(
          (airport) => airport.code === origin || airport.code === destination
        )
        const combinedAirports = [
          ...filteredAirports,
          ...filteredSelectedAirports,
        ]
        const countryAirportData = combinedAirports.map((airport) => ({
          id: airport.code,
          title: airport.name,
          geometry: {
            type: 'Point',
            coordinates: [airport.longitude, airport.latitude],
          },
        }))
        countryAirportSeriesRef.current.data.setAll(countryAirportData)
      } else {
        const filteredSelectedAirports = airports.filter(
          (airport) => airport.code === origin || airport.code === destination
        )
        const countryAirportData = filteredSelectedAirports.map((airport) => ({
          id: airport.code,
          title: airport.name,
          geometry: {
            type: 'Point',
            coordinates: [airport.longitude, airport.latitude],
          },
        }))
        countryAirportSeriesRef.current.data.setAll(countryAirportData)
      }
    }
  }, [selectedCountry, airports, origin, destination])

  useEffect(() => {
    function drawLineBetweenAirports(
      originAirport: Airport,
      destinationAirport: Airport
    ) {
      if (!originAirport || !destinationAirport) {
        console.error(
          'Origin or destination airport not found for drawing line.'
        )
        if (lineSeriesRef.current) {
          lineSeriesRef.current.data.setAll([])
        }
        return
      }

      const lineData = {
        geometry: {
          type: 'LineString',
          coordinates: [
            [originAirport.longitude, originAirport.latitude],
            [destinationAirport.longitude, destinationAirport.latitude],
          ],
        },
      }

      lineSeriesRef.current?.data.setAll([lineData])
    }

    if (!lineSeriesRef.current) {
      return
    }
    if (!airports || airports.length === 0) {
      lineSeriesRef.current.data.setAll([])
      return
    }

    if (origin && destination) {
      const originAirport = airports.find((airport) => airport.code === origin)
      const destinationAirport = airports.find(
        (airport) => airport.code === destination
      )

      if (originAirport && destinationAirport) {
        drawLineBetweenAirports(originAirport, destinationAirport)
      } else {
        lineSeriesRef.current.data.setAll([])
        if (!originAirport && origin)
          console.warn(
            `MapChart: Origin airport with code "${origin}" not found.`
          )
        if (!destinationAirport && destination)
          console.warn(
            `MapChart: Destination airport with code "${destination}" not found.`
          )
      }
    } else {
      lineSeriesRef.current.data.setAll([])
    }
  }, [origin, destination, airports])

  return <div ref={chartRef} style={{ width: '100%', height: '500px' }}></div>
}

export default MapChart
