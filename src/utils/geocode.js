const request = require('request');

const geoCode = (address, callback) => {

    const mapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidmVkbTEiLCJhIjoiY2sxMXNtaHhkMGJmZzNiczh2aWZnaHpjNiJ9.qqVwoFiG8qJhiqG7KS-j6g';
    console.log(mapboxUrl);
    request({url: mapboxUrl, json: true}, (error, response) => {
        if (error){
            callback('Something Went Wrong, Please Try Again Later. Also, Ensure you are connected to the internet', undefined);
        }else if (response.body.features.length === 0){
            callback('We could not find your location. Please check your location and try again.', undefined)
        }else if (response.body.message === 'Not Found'){
            callback('Could not find your Location', undefined);
        }else if (response.body.message === 'Not Authorized - Invalid Token'){
            callback('You are not allowed to make this request. Please try again later', undefined);
        }else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    });
};

module.exports = geoCode;