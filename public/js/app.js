console.log('This File Loads a Client Side JS File');



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const weatherLineOne = document.querySelector('#weatherLineOne');
const weatherLineTwo = document.querySelector('#weatherLineTwo');


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
                weatherLineOne.textContent = data.location;
                weatherLineTwo.textContent = data.forecast
            }
        });
    });

    console.log('testing')
});