import React from 'react';

export default class Weather extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        if (this.props.weatherData) {
            return (
                <div>
                    <h1>Weather App</h1>
                <div class='weather'>
                    <p>Location: {this.props.weatherData.coord.lat},{this.props.weatherData.coord.lon}</p>
                    <p>Temperature: {this.props.weatherData.main.temp}</p>
                    <p>Minimum Temperature: {this.props.weatherData.main.temp_min}</p>
                    <p>Maximum Temperature: {this.props.weatherData.main.temp_max}</p>
                    <p>Humidity: {this.props.weatherData.main.humidity}</p>
                    <p>Pressure: {this.props.weatherData.main.pressure}</p>
                    <p></p>
                    <p></p>
                    <p class="providedBy">Weather information provided by <a href="http://openweathermap.org/">OpenWeatherMap</a></p>
                </div>
                </div>
            );
        } else {
            return null;
        }
    }
}