console.log('This File Loads a Client Side JS File');



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const weatherLineOne = document.querySelector('#weatherLineOne');
const weatherLineTwo = document.querySelector('#weatherLineTwo');
const weatherLineThree = document.querySelector('#weatherLineThree');
const weatherLineFour = document.querySelector('#weatherLineFour');
const weatherLineFive = document.querySelector('#weatherLineFive');
const weatherLineSix = document.querySelector('#weatherLineSix');
const weatherLineSeven = document.querySelector('#weatherLineSeven');
const weatherLineEight = document.querySelector('#weatherLineEight');
const weatherLineNine = document.querySelector('#weatherLineNine');
const todaysForecast = document.querySelector('#todaysForecast');
const tomorrowsForecast = document.querySelector('#tomorrowsForecast');


weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const location = search.value;

    weatherLineOne.textContent = 'Loading...';
    weatherLineTwo.textContent = '';

    fetch('/weather/?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error){
                weatherLineOne.textContent = data.error
            }
            else {
                todaysForecast.textContent = 'Today\'s Forecast';
                weatherLineOne.textContent = data.location;
                weatherLineTwo.textContent = data.timezone;
                weatherLineThree.textContent = data.todayForecast;
                weatherLineFour.textContent = data.currentTemperature;
                weatherLineFive.textContent = data.chanceOfRain;
                tomorrowsForecast.textContent = 'Tomorrow\'s Forecast';
                weatherLineSix.textContent = data.tomorrowForecast;
                weatherLineSeven.textContent = data.tomorrowHigh;
                weatherLineEight.textContent = data.tomorrowLow;
                weatherLineNine.textContent = data.tomorrowChanceOfRain;



            }
        });
    });

    console.log('testing')
});