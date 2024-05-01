import PropTypes from 'prop-types'
import React, { Component } from 'react'
import LoadData from './LoadData';

export default class Weather extends Component {
  data = {
    "latitude": 28.125,
    "longitude": 100.125,
    "generationtime_ms": 0.03993511199951172,
    "utc_offset_seconds": 28800,
    "timezone": "Asia/Shanghai",
    "timezone_abbreviation": "CST",
    "elevation": 3387.0,
    "daily_units": {
      "time": "iso8601",
      "temperature_2m_max": "°C",
      "temperature_2m_min": "°C",
      "weather_code": "wmo code"
    },
    "daily": {
      "time": [
        "2024-05-01",
        "2024-05-02",
        "2024-05-03",
        "2024-05-04",
        "2024-05-05",
        "2024-05-06",
        "2024-05-07"
      ],
      "temperature_2m_max": [
        13.4,
        14.7,
        13.6,
        16.5,
        17.8,
        15.8,
        15.4
      ],
      "temperature_2m_min": [
        3.0,
        2.7,
        4.2,
        2.7,
        1.9,
        4.5,
        4.7
      ],
      "weather_code": [
        80,
        80,
        80,
        80,
        80,
        61,
        61
      ]
    }
  }
  static propTypes = {}
  constructor () {
    super();
    this.state = {
        loading: false,
        weatherData: this.data,
        place : "Pokhara ",
        long : "84.07973878182344",
        lati : "28.16537235"
    }
  }
  formatString = (input) =>
  {
  let formattedString = input.replace(/[^a-zA-Z0-9]+/g, '%');
  // Remove '%' from the beginning and end of the string
  formattedString = formattedString.replace(/^%+/, '');
  return (formattedString)
  }

  async componentDidMount () 
  {
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${this.state.lati}&longitude=${this.state.long}&timezone=auto&daily=temperature_2m_max&daily=temperature_2m_min,weather_code`
    console.log(url)
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
        loading : true,
        weatherData : parsedData
    })
   // console.log("LOADING"+JSON.stringify(this.state.weatherData))
   
  }
  handleOnChange = async (event) =>{
    this.setState({
      place : event.target.value,
    }, ()=> {console.log(this.formatString(this.state.place))})
    let formatted = this.formatString(event.target.value)
    let apiKey = "57540f33e1e04d2b898c165e7470b5f3"
    console.log(`https://api.geoapify.com/v1/geocode/search?text=${formatted}&format=json&apiKey=${apiKey}`)
    await fetch(`https://api.geoapify.com/v1/geocode/search?text=${formatted}&format=json&apiKey=${apiKey}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log("longlatdata"+data.results[0].lon+data.results[0].lat)
      this.setState({
        long : data.results[0].lon,
        lati : data.results[0].lat
      })
    })
    .catch(error => {
      console.error('Error:', error);
    });
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${this.state.lati}&longitude=${this.state.long}&timezone=auto&daily=temperature_2m_max&daily=temperature_2m_min,weather_code`
    console.log(url)
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
        loading : true,
        weatherData : parsedData
    })
 }

  render() {
    return (
      <div className="container text-center">
        <h2>Weather of 
          <textarea name="" id="" cols="20" rows="1" value={this.state.place} onChange={this.handleOnChange}></textarea>
        </h2>
        {!this.state.loading && < LoadData data={this.state.weatherData} />}
        {this.state.loading && < LoadData data={this.state.weatherData} />}
      </div>
    )
  }
}