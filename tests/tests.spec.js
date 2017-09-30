var chai = require('chai');
var assert = chai.assert;

import Layout from "../src/js/Components/Layout";

describe('geolocation', function () {
    this.timeout(10000);
    it('Check API returns a result', function () {
        return Layout
            .getCurrentLocation()
            .then(result => {
               
                assert.equal(typeof result.coords.latitude, 'number');
            })

    });
});

describe('getOpenWeatherData', function () {
    this.timeout(10000);
    it('Check API returns a result', function () {
        return Layout
            .getOpenWeatherData(0,0)
            .then(result => {               
                assert.equal(typeof result.main.temp, 'number');
            })

    });
});

