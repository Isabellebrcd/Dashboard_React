// API : https://openweathermap.org/api
import axios from "axios";
import "./style.css";
import {useEffect} from "react";
// Clé api
const API_KEY = "****";
// Url API
const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_URL_FORECAST = "https://api.openweathermap.org/data/2.5/forecast/daily";
// Base source icon
const API_URL_ICON = "http://openweathermap.org/img/wn/";
const Affichage = () => {
    const location = localStorage.getItem('location');

    useEffect(() => {
        let name;
        switch (location) {
            case "ethiopa": {
                name = "Addis-Abeba";
                break;
            }
            case "czech republic": {
                name = "Prague";
                break;
            }
            case "italy": {
                name = "Rome";
                break;
            }
            case "greece": {
                name = "Athènes";
                break;
            }
            case "china": {
                name = "Pékin";
                break;
            }
            case "poland": {
                name = "Varsovie";
                break;
            }
            case "thailand": {
                name = "Bangkok";
                break;
            }
            case "morocco": {
                name = "Rabat";
                break;
            }
            case "malaysia": {
                name = "Kuala Lumpur";
                break;
            }
            case "slovenia": {
                name = "Ljubljana";
                break;
            }
            case "philippines": {
                name = "Manille";
                break;
            }
            case "mexico": {
                name = "Mexico";
                break;
            }
            case "ecuador": {
                name = "Quito";
                break;
            }
            case "albania": {
                name = "Tirana";
                break;
            }
            case "japan": {
                name = "Tokyo";
                break;
            }
            case "peru": {
                name = "Lima";
                break;
            }
            case "russia": {
                name = "Moscou";
                break;
            }
            default: {
                name = "Paris";
                break;
            }
        }
        start(name);
        getThreeDayForecast(name);
    }, []);
    return (
        <>
            <div className="card-deck-container">
                <div className="container">
                    <div className="card-deck mb-3 text-center">
                        <div className="card mb-4 shadow-sm offset-sm-1">
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">Aujourd'hui</h4>
                            </div>
                            <div className="card-body">
                                <h1 id="city-name" className="city-style">Paris</h1>
                                <h2 id="today-forecast-main-0" className="card-title">
                                </h2>
                                <div>
                                    <p id="today-forecast-more-info-0"></p>
                                    <div id="icon-weather-container-0"></div>
                                    <h3 id="today-forecast-temp-0"></h3>
                                </div>
                            </div>
                        </div>
                        <div className="card-deck mb-3 text-center">
                            <div className="card mb-4 shadow-sm offset-sm-1">
                                <div className="card-header">
                                    <h4 className="my-0 font-weight-normal">Demain</h4>
                                </div>
                                <div className="card-body">
                                    <h2 id="today-forecast-main-1" className="card-title">
                                    </h2>
                                    <div>
                                        <p id="today-forecast-more-info-1"></p>
                                        <div id="icon-weather-container-1"></div>
                                        <h3 id="today-forecast-temp-1"></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
class API_WEATHER {
    constructor(city) {
        this.city = city;
    }
    fetchTodayForecast() {
        return axios
            .get(`${API_URL}?q=${this.city}&units=metric&appid=${API_KEY}`, {
                crossdomain: true
            })
    }
    //requete pour forecast
    fetch3DaysForecast() {
        return axios
            .get(`${API_URL_FORECAST}?q=${this.city}&cnt=4&appid=${API_KEY}`, {
                crossdomain: true
            })
    }
    // Retourne l'element HTML de l'icon symbolisant la méteo.
    getHTMLElementFromIcon(icon) {
        return `<img src=${API_URL_ICON}${icon}@2x.png class="weather-icon" alt="ICON"/>`
    }
}
function start(city) {
    // Création de l'objet apiWeather
    const apiWeather = new API_WEATHER(city);
    // Appel de la fonction fetchTodayForecast
    //console.log("Allo Start");
    apiWeather
        .fetchTodayForecast()
        .then(function (response) {
            // Récupère la donnée d'une API
            const data = response.data;
            // Regarder la date du jour J
            const timestamp = data.dt;
            const date = new Date(timestamp * 1000);
            const forecastDay = date.getDate();
            const forecastMonth = date.getMonth() + 1;
            const forecastYear = date.getFullYear();
            console.log(`Date for Day 0 : ${forecastDay}/${forecastMonth}/${forecastYear}`);

            // On récupère l'information principale
            const main = data.weather[0].main;
            const description = data.weather[0].description;
            const temp = data.main.temp;
            const icon = apiWeather.getHTMLElementFromIcon(data.weather[0].icon);
            // Modifier le DOM
            document.getElementById(`today-forecast-main-0`).innerHTML = main;
            document.getElementById(`today-forecast-more-info-0`).innerHTML = description;
            document.getElementById(`icon-weather-container-0`).innerHTML = icon;
            document.getElementById(`today-forecast-temp-0`).innerHTML = `${temp}°C`;
            document.getElementById(`city-name`).innerHTML = city;
        })
        .catch(function (error) {
            // Affiche une erreur
            console.error(error);
        });
}
function getThreeDayForecast(city) {
    // Création de l'objet apiWeather
    const apiWeather = new API_WEATHER(city);
    apiWeather
        .fetch3DaysForecast()
        .then(function (response) {
            const data = response.data.list;
            for (let i = 1; i < 2; i++) {
                // Regarder la date des jours suivants
                const timestamp = data[i].dt;
                const date = new Date(timestamp * 1000);
                const forecastDay = date.getDate();
                const forecastMonth = date.getMonth() + 1;
                const forecastYear = date.getFullYear();
                console.log(`Date for Day ${i}: ${forecastDay}/${forecastMonth}/${forecastYear}`);
                const main = data[i].weather[0].main;
                const description = data[i].weather[0].description;
                const temp = (data[i].temp.day - 273.15).toFixed(2);
                const icon = apiWeather.getHTMLElementFromIcon(data[i].weather[0].icon);

                // Modifier le DOM pour les trois jours suivants
                document.getElementById(`today-forecast-main-${i}`).innerHTML = main;
                document.getElementById(`today-forecast-more-info-${i}`).innerHTML = description;
                document.getElementById(`icon-weather-container-${i}`).innerHTML = icon;
                document.getElementById(`today-forecast-temp-${i}`).innerHTML = `${temp}°C`;
            }
        })
        .catch(function (error) {
            // Affiche une erreur
            console.error(error);
        });
}
export default Affichage;
