import React from "react";
import Wait from "./Wait";
import Error from "./Error";
import Weather from "./Weather";
import $ from 'jquery';

const defaultLocationTimeout = 20;

const RefreshButton = function (props) {
  return (
    <button className="refreshButton" onClick={props.onClick}>
      <i class="material-icons">refresh</i>
      Refresh
    </button>
  );
}

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      displayWait: true,
      displayError: false
    };
  }

  componentDidMount() {
    this.refreshWeatherData()
  }

  static getCurrentLocation() {
    var timeout = defaultLocationTimeout;
    timeout *= 1000;
    var options = {
      enableHighAccuracy: true,
      timeout: timeout,
      maximumAge: 0
    };
    return new Promise(function (resolve, reject) {
      if (navigator.geolocation) {
        return navigator
          .geolocation
          .getCurrentPosition(resolve, reject, options)
      } else {
        reject('geolocation API not supported.')
      }
    });
  }

  static getOpenWeatherData(lat, lng) {
    return new Promise((resolve, reject) => {
      const openWeatherApiUrl = "http://api.openweathermap.org/data/2.5/weather?";
      const openWeatherApiKey = "53f9d8e4213222cf517d86dc406d67fc";
      $.ajax({
        method: "GET",
        url: openWeatherApiUrl + 'lat=' + lat + '&lon=' + lng + '&APPID=' + openWeatherApiKey,
        dataType: "json",
        success: resolve,
        error: reject
      });
    })
  };

  refreshWeatherData() {
    this.setState({displayWait: true})
    Layout
      .getCurrentLocation()
      .then(position => {
        Layout
          .getOpenWeatherData(position.coords.latitude, position.coords.longitude)
          .then(weatherData => {
            this.setState({weatherData: weatherData})
            this.setState({displayWait: false})
            this.setState({displayError: false})
          })
          .catch(err => {
            if (err.responseText) {
              this.showError(err.responseText)
            } else {
              this.showError(JSON.stringify(err))
            }
          })
      })
      .catch(err => {
        if (err.constructor.name == 'PositionError' && err.message) {
          this.showError(err.message)
        } else {
          this.showError(JSON.stringify(err))
        }
      })
  }
  showError(errorMessage) {
    this.setState({errorMessage: errorMessage})
    this.setState({displayError: true})
    this.setState({displayWait: false})
  }

  render() {
    return (
      <div class="weatherData">
        <Weather weatherData={this.state.weatherData}/>
        <Error display={this.state.displayError} message={this.state.errorMessage}/>
        <Wait display={this.state.displayWait}/>
        <RefreshButton onclick={this.refreshWeatherData}/>
      </div>
    );
  }
}