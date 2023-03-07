const loader = document.querySelector(".loader")

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(location => {
        const long = location.coords.longitude;
        const lat = location.coords.latitude;
        getWeatherData(long, lat)
    }, () => {
        loader.textContent = "Vous avez refusé la géolocalisation, l'application ne peut pas fonctionner, veuillez l'activer"
    })
}

async function getWeatherData(long, lat){
    try{

        // Current Weather
        const results = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=17f81e3519f26d9fdb97bd3a3f2dc5ff`)

        if (!results.ok){
            throw new Error(`Erreur : ${results.status}`)
        }

        const data = await results.json()
        console.log(data);

        populateMainInfo(data);

        loader.classList.add("fade-out")
    }
    catch(e){
        loader.textContent = e;
    }
}

const currentTime = document.querySelector('.current-time');

const icon = document.querySelector(".weather-logo");
const description = document.querySelector(".description");

const temperature = document.querySelector(".temperature");

const city = document.querySelector(".city");
const country = document.querySelector(".country");

const tempMax = document.querySelector(".temp-max");
const tempMin = document.querySelector(".temp-min");
const feelsLike = document.querySelector(".feels-like");

const sunriseUnixTimestamp = document.querySelector(".sunrise-data");
const sunsetUnixTimestamp = document.querySelector(".sunset-data");

const pressure = document.querySelector(".pressure-data");
const humidity = document.querySelector(".humidity-data");
const wind = document.querySelector(".wind-data");

function populateMainInfo(data){
    currentTime.textContent = `${
        ("0" + new Date().getHours()).substr(-2) + ":" +
        ("0" + new Date().getMinutes()).substr(-2)
    }`

    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`
    description.textContent = `${data.weather[0].description}`

    temperature.textContent = `${Math.round(data.main.temp)}°`

    city.textContent = `${data.name}`
    country.textContent = `${data.sys.country}`

    tempMax.textContent = `${Math.round(data.main.temp_max)}°`
    tempMin.textContent = `${Math.round(data.main.temp_min)}°`
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°`

    sunriseUnixTimestamp.textContent = `${
        ("0" + new Date(data.sys.sunrise * 1000).getHours()).substr(-2) + ":" + 
        ("0" + new Date(data.sys.sunrise * 1000).getMinutes()).substr(-2) 
    }`;

    sunsetUnixTimestamp.textContent = `${
        ("0" + new Date(data.sys.sunset * 1000).getHours()).substr(-2) + ":" + 
        ("0" + new Date(data.sys.sunset * 1000).getMinutes()).substr(-2) 
    }`;

    pressure.textContent = `${data.main.pressure} hPa`
    humidity.textContent = `${data.main.humidity} %`
    wind.textContent = `${Math.round((data.wind.speed * 60) / 1000 * 60)} km/h`
    
}