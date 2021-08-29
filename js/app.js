// Regular
// fetch weather from API
fetch('https://api.openweathermap.org/data/2.5/weather?q=bogra&appid=2f4eaae5313620301797f4a8608391fb')
    .then(Response => Response.json())
    .then(data => displayData(data))

// Display Regular Data
const displayData = data => {
    commonFunctionToDisplay(data)
}
//function to display elements
function commonFunctionToDisplay(data){
    const weatherInCalvin = data.main.temp
    const weatherInCelcius = weatherInCalvin - 273.15
    const plcae = document.getElementById('Weather')
    plcae.innerText = weatherInCelcius.toFixed(2)
    const weatherMain = document.getElementById('weatherMain')
    weatherMain.innerText = data.weather[0].main
    const Name = document.getElementById('name')
    Name.innerText = data.name
    const country = document.getElementById('country')
    country.innerText = data.sys.country
    const img = document.querySelector('img')
    if (data.weather[0].main == 'Clouds') {
        img.src = 'images/clouds.svg'
    }
    else if (data.weather[0].main == 'Haze') {
        img.src = 'images/haze.png'
    }
    else if (data.weather[0].main == 'Rain') {
        img.src = 'images/rain.svg'
    }
    
}

// LoadSearchData
document.getElementById('search-btn').addEventListener('click', function (event) {
    event.preventDefault()
    const searchInputElement = document.querySelector('input')
    const searchData = searchInputElement.value
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchData}&appid=2f4eaae5313620301797f4a8608391fb`
    fetch(url)
        .then(Response => Response.json())
        .then(data => displaySearchData(data))
        .catch(error => displayerror(error));
})
const displayerror = error => {
    const message = document.getElementById('error-message');
    message.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Holy guacamole!</strong> You should check in on some of those fields below.
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>`;
}
// display search data
const displaySearchData = data => {
    commonFunctionToDisplay(data)
}

// Weather By Geolocation
navigator.geolocation.getCurrentPosition(function (success) {
    const lat = success.coords.latitude
    const lon = success.coords.longitude
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2f4eaae5313620301797f4a8608391fb`
    fetch(url)
        .then(Response => Response.json())
        .then(data => {
            commonFunctionToDisplay(data)
        })
})