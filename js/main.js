
let current = document.querySelector('.current');
let custom = document.querySelector('.custom');
let tomorrow = document.querySelector('.tomorrow');
let after = document.querySelector('.after');
let searchInput =document.getElementById('search');


async function fetchApi(cityName) {
    let req = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=c544dfbed63945569d3145723230908&q=${cityName}&days=3&aqi=yes&alerts=yes`);
    let data = await req.json();

    display(data);
 
}
fetchApi();
// const navigator = window.navigator;
// const geolocation = navigator.geolocation;

// geolocation.getCurrentPosition(function(position) {
//   console.log(`Your current location is: ${position.latitude}, ${position.longitude}`);
// });
function display(obj) {
   let d = new Date();
   
    current.innerHTML = `
    
        <div class="card-header d-flex justify-content-between">
            <div class="date">${d.toLocaleString('en-Us',(weekday='long'))}</div>
    
        </div>
        <div class="card-body">
            <div class="location">${obj.location.name}</div>
            <div class="degree">
                <div class="num">
                   ${obj.current.temp_c}
                </div>
                <div class="forecast-icon">
                    <img src="${obj.forecast.forecastday[0].day.condition.icon}" alt="">
                </div>
            </div>
            <div class="custom">${obj.forecast.forecastday[0].day.condition.text}</div>
            <span><img src="images/icon-umberella.png" alt="">${obj.current.humidity+'%'}</span>
            <span><img src="images/icon-wind.png" alt="wind">${obj.current.wind_kph+'km/hr'}</span>
            <span><img src="images/icon-compass.png" alt="compass">${obj.current.wind_dir}</span>
        </div>
    `
    tomorrow.innerHTML = `    
    <div class="card-header">          
      <div class="date">${obj.forecast.forecastday[1].date}</div>
    </div>
    <div class="card-body">
        <div class="forecast-icon">
            <img src="${obj.forecast.forecastday[1].day.condition.icon}" alt="hot">
        </div>
        <div class="degree"> ${obj.forecast.forecastday[1].day.maxtemp_c}</sup>

        </div>
        <small>  ${obj.forecast.forecastday[1].day.mintemp_c}</small>
        <div class="custom">${obj.forecast.forecastday[1].day.condition.text}</div>
        <div></div>
    </div>

`

    after.innerHTML = `
<div class="card-header">${obj.forecast.forecastday[2].date}</div>
<div class="card-body">
    <div class="forecast-icon">
        <img src="${obj.forecast.forecastday[2].day.condition.icon}" alt="hot">
    </div>
    <div class="degree">  ${obj.forecast.forecastday[2].day.maxtemp_c}</sup>

    </div>
    <small>  ${obj.forecast.forecastday[2].day.mintemp_c}</sup></small>
    <div class="custom">${obj.forecast.forecastday[2].day.condition.text}</div>
    <div>

    </div>
</div>

`
}

async function baseShow (city='cairo'){
    let weatherData =await fetchApi(city);
    display(weatherData);
}
search.addEventListener("keyup", function(){
baseShow(searchInput.value)
})
baseShow();



