const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const forecastUrl = 'https://api.darksky.net/forecast/d692b3b13b02621b28e1501a7c6ff639/' + encodeURIComponent(latitude) + ',' + + encodeURIComponent(longitude) + '?units=si';
    if (forecastUrl.includes('units=si')){
        var siUnit = 'Celsius'
    }else {
        var siUnit = 'Farenheit'
    }
    console.log(forecastUrl);
    request({url: forecastUrl, json: true}, (error, response) => {
        if (error) {
            callback('Please ensure you are connected to the Internet');
        } else if (response.body.error === 'permission denied') {
            callback('You do not have enough permissions to view this content');
        } else if (response.body.error === 'The given location is invalid.') {
            callback('Oops, are you trying to find something on Earth? Enter a Location on Earth!')
        } else if (response.body.error) {
            callback('Something Went Wrong, Please refresh and try again');
        } else {
            callback(undefined, "You're currently in the " + response.body.timezone + ' Time Zone and It is ' + response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees ' + siUnit + '. There is ' + response.body.currently.precipProbability + '% chance of rain.')
        }
    });
};

module.exports = forecast;