import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class LoadData extends Component {
  static propTypes = {}


  
  render() {
    const weatherCodeMapping = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing rime fog",
        51: "Drizzle: Light intensity",
        53: "Drizzle: Moderate intensity",
        55: "Drizzle: Dense intensity",
        56: "Freezing Drizzle: Light intensity",
        57: "Freezing Drizzle: Dense intensity",
        61: "Rain: Slight intensity",
        63: "Rain: Moderate intensity",
        65: "Rain: Heavy intensity",
        66: "Freezing Rain: Light intensity",
        67: "Freezing Rain: Heavy intensity",
        71: "Snow fall: Slight intensity",
        73: "Snow fall: Moderate intensity",
        75: "Snow fall: Heavy intensity",
        77: "Snow grains",
        80: "Rain showers: Slight intensity",
        81: "Rain showers: Moderate intensity",
        82: "Rain showers: Violent intensity",
        85: "Snow showers: Slight intensity",
        86: "Snow showers: Heavy intensity",
        95: "Thunderstorm: Slight or moderate",
        96: "Thunderstorm with slight hail",
        99: "Thunderstorm with heavy hail"
      };
    let {data} = this.props;
    return (
        <div>
        <h3>Weather Forecast</h3>
        <p>Latitude: {data.latitude}</p>
        <p>Longitude: {data.longitude}</p>
        <p>Elevation: {data.elevation} m</p>
        <h3>Daily Forecast</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Max Temperature (°C)</th>
              <th>Min Temperature (°C)</th>
              <th>Weather Type(°C)</th>
            </tr>
          </thead>
          <tbody>
            {data.daily.time.map((date, index) => (
              <tr key={index}>
                <td>{date}</td>
                <td>{data.daily.temperature_2m_max[index]}</td>
                <td>{data.daily.temperature_2m_min[index]}</td>
                <td>{weatherCodeMapping[data.daily.weather_code[index]]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )}
}
