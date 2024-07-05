import getWeatherData from "./getWeatherData";
import { FullDayOverview } from "./ui";

"use strict";

function formatDate(inputDate) {

    var date = new Date(inputDate);

    // Tagebezeichnung abrufen (z.B. Montag, Dienstag usw.)
    let daysOfWeek = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    let dayOfWeek = daysOfWeek[date.getDay()];

    // Datum extrahieren
    let day = date.getDate();
    let month = date.getMonth() + 1; // Monate beginnen bei 0, daher +1
    let year = date.getFullYear();

    // Führende Nullen für Tag und Monat hinzufügen, falls nötig
    day = (day < 10) ? '0' + day : day;
    month = (month < 10) ? '0' + month : month;

    // Formatieren und zurückgeben
    let formattedDate = dayOfWeek + ', ' + day + '.' + month + '.' + year;
    return formattedDate;
};

function openLoading() {
    console.log("Wait ...");
    const modal = document.getElementById('modal');
    modal.showModal();

};

function closeLoading() {
    console.log("... complete.");
    modal.close();
};

function addDataToPlace(data) {

    const selectors = {
        city: document.getElementById('city'),
        country: document.getElementById('country'),
        currentDateAndTime: document.getElementById('currentDateAndTime'),
        currentWeatherIcon: document.getElementById('currentWeatherIcon'),
        currentWeatherDescription: document.getElementById('currentWeatherDescription'),
        currentTemperature: document.getElementById('currentTemperature'),
        currentRainChance: document.getElementById('currentRainChance'),
        currentHumidity: document.getElementById('currentHumidity'),
        currentWind: document.getElementById('currentWind'),
        day01Name: document.getElementById('day01Name'),
        day01Icon: document.getElementById('day01Icon'),
        day01MaxTemperature: document.getElementById('day01MaxTemperature'),
        day01MinTemperature: document.getElementById('day01MinTemperature'),
        day02Name: document.getElementById('day02Name'),
        day02Icon: document.getElementById('day02Icon'),
        day02MaxTemperature: document.getElementById('day02MaxTemperature'),
        day02MinTemperature: document.getElementById('day02MinTemperature'),
        day03Name: document.getElementById('day03Name'),
        day03Icon: document.getElementById('day03Icon'),
        day03MaxTemperature: document.getElementById('day03MaxTemperature'),
        day03MinTemperature: document.getElementById('day03MinTemperature'),
        dateDay: document.getElementById('dateDay'),
        dayIcon01: document.getElementById('dayIcon01'),
        dayTemperature01: document.getElementById('dayTemperature01'),
        dayRainChance01: document.getElementById('dayRainChance01'),
        dayHumidity01: document.getElementById('dayHumidity01'),
        dayWind01: document.getElementById('dayWind01'),
        dayIcon02: document.getElementById('dayIcon02'),
        dayTemperature02: document.getElementById('dayTemperature02'),
        dayRainChance02: document.getElementById('dayRainChance02'),
        dayHumidity02: document.getElementById('dayHumidity02'),
        dayWind02: document.getElementById('dayWind02'),
        dayIcon03: document.getElementById('dayIcon03'),
        dayTemperature03: document.getElementById('dayTemperature03'),
        dayRainChance03: document.getElementById('dayRainChance03'),
        dayHumidity03: document.getElementById('dayHumidity03'),
        dayWind03: document.getElementById('dayWind03'),
        dayIcon04: document.getElementById('dayIcon04'),
        dayTemperature04: document.getElementById('dayTemperature04'),
        dayRainChance04: document.getElementById('dayRainChance04'),
        dayHumidity04: document.getElementById('dayHumidity04'),
        dayWind04: document.getElementById('dayWind04'),
        // dateDay02: document.getElementById('dateDay02'),
        // day02Icon01: document.getElementById('day02Icon01'),
        // day02Temperature01: document.getElementById('day02Temperature01'),
        // day02RainChance01: document.getElementById('day02RainChance01'),
        // day02Humidity01: document.getElementById('day02Humidity01'),
        // day02Wind01: document.getElementById('day02Wind01'),
        // day02Icon02: document.getElementById('day02Icon02'),
        // day02Temperature02: document.getElementById('day02Temperature02'),
        // day02RainChance02: document.getElementById('day02RainChance02'),
        // day02Humidity02: document.getElementById('day02Humidity02'),
        // day02Wind02: document.getElementById('day02Wind02'),
        // day02Icon03: document.getElementById('day02Icon03'),
        // day02Temperature03: document.getElementById('day02Temperature03'),
        // day02RainChance03: document.getElementById('day02RainChance03'),
        // day02Humidity03: document.getElementById('day02Humidity03'),
        // day02Wind03: document.getElementById('day02Wind03'),
        // day02Icon04: document.getElementById('day02Icon04'),
        // day02Temperature04: document.getElementById('day02Temperature04'),
        // day02RainChance04: document.getElementById('day02RainChance04'),
        // day02Humidity04: document.getElementById('day02Humidity04'),
        // day02Wind04: document.getElementById('day02Wind04'),
        // dateDay03: document.getElementById('dateDay03'),
        // day03Icon01: document.getElementById('day03Icon01'),
        // day03Temperature01: document.getElementById('day03Temperature01'),
        // day03RainChance01: document.getElementById('day03RainChance01'),
        // day03Humidity01: document.getElementById('day03Humidity01'),
        // day03Wind01: document.getElementById('day03Wind01'),
        // day03Icon02: document.getElementById('day03Icon02'),
        // day03Temperature02: document.getElementById('day03Temperature02'),
        // day03RainChance02: document.getElementById('day03RainChance02'),
        // day03Humidity02: document.getElementById('day03Humidity02'),
        // day03Wind02: document.getElementById('day03Wind02'),
        // day03Icon03: document.getElementById('day03Icon03'),
        // day03Temperature03: document.getElementById('day03Temperature03'),
        // day03RainChance03: document.getElementById('day03RainChance03'),
        // day03Humidity03: document.getElementById('day03Humidity03'),
        // day03Wind03: document.getElementById('day03Wind03'),
        // day03Icon04: document.getElementById('day03Icon04'),
        // day03Temperature04: document.getElementById('day03Temperature04'),
        // day03RainChance04: document.getElementById('day03RainChance04'),
        // day03Humidity04: document.getElementById('day03Humidity04'),
        // day03Wind04: document.getElementById('day03Wind04')
    };

    updateDayOverviewWeatherData(data);

    const now = new Date(); // current Date and Time
    const currentHour = now.getHours();

    selectors.city.textContent = data.location.name;
    selectors.country.textContent = data.location.country;
    selectors.currentDateAndTime.textContent = data.location.localtime.slice(-5) + ' - Aktuell';
    selectors.currentWeatherIcon.src = chooseImg(data.current.condition.code, decideDayOrNight(data.current.condition.icon));
    selectors.currentWeatherDescription.textContent = chooseDescription(data.current.condition.code, decideDayOrNight(data.current.condition.icon));
    selectors.currentTemperature.textContent = data.current.temp_c + "° ";
    selectors.currentRainChance.textContent = data.forecast.forecastday[0].hour[currentHour].chance_of_rain + " %";
    selectors.currentHumidity.textContent = data.current.humidity + " %";
    selectors.currentWind.textContent = data.current.wind_kph + " km/h";
    selectors.day01Name.textContent = formatDate(data.forecast.forecastday[0].date).slice(0, -12);
    selectors.day01Icon.src = chooseImg(data.forecast.forecastday[0].day.condition.code, decideDayOrNight(data.forecast.forecastday[0].day.condition.icon));
    selectors.day01MaxTemperature.textContent = data.forecast.forecastday[0].day.maxtemp_c + "°";
    selectors.day01MinTemperature.textContent = data.forecast.forecastday[0].day.mintemp_c + "°";
    selectors.day02Name.textContent = formatDate(data.forecast.forecastday[1].date).slice(0, -12);
    selectors.day02Icon.src = chooseImg(data.forecast.forecastday[1].day.condition.code, decideDayOrNight(data.forecast.forecastday[1].day.condition.icon));
    selectors.day02MaxTemperature.textContent = data.forecast.forecastday[1].day.maxtemp_c + "°";
    selectors.day02MinTemperature.textContent = data.forecast.forecastday[1].day.mintemp_c + "°";
    selectors.day03Name.textContent = formatDate(data.forecast.forecastday[2].date).slice(0, -12);
    selectors.day03Icon.src = chooseImg(data.forecast.forecastday[2].day.condition.code, decideDayOrNight(data.forecast.forecastday[2].day.condition.icon));
    selectors.day03MaxTemperature.textContent = data.forecast.forecastday[2].day.maxtemp_c + "°";
    selectors.day03MinTemperature.textContent = data.forecast.forecastday[2].day.mintemp_c + "°";
    selectors.dateDay.textContent = formatDate(data.forecast.forecastday[0].date);
    selectors.dayIcon01.src = chooseImg(data.forecast.forecastday[0].hour[6].condition.code, decideDayOrNight(data.forecast.forecastday[0].hour[6].condition.icon));
    selectors.dayTemperature01.textContent = data.forecast.forecastday[0].hour[6].temp_c + "° ";
    selectors.dayRainChance01.textContent = data.forecast.forecastday[0].hour[6].chance_of_rain + " %";
    selectors.dayHumidity01.textContent = data.forecast.forecastday[0].hour[6].humidity + " %";
    selectors.dayWind01.textContent = data.forecast.forecastday[0].hour[6].wind_kph;
    selectors.dayIcon02.src = chooseImg(data.forecast.forecastday[0].hour[12].condition.code, decideDayOrNight(data.forecast.forecastday[0].hour[12].condition.icon));
    selectors.dayTemperature02.textContent = data.forecast.forecastday[0].hour[12].temp_c + "° ";
    selectors.dayRainChance02.textContent = data.forecast.forecastday[0].hour[12].chance_of_rain + " %";
    selectors.dayHumidity02.textContent = data.forecast.forecastday[0].hour[12].humidity + " %";
    selectors.dayWind02.textContent = data.forecast.forecastday[0].hour[12].wind_kph;
    selectors.dayIcon03.src = chooseImg(data.forecast.forecastday[0].hour[18].condition.code, decideDayOrNight(data.forecast.forecastday[0].hour[18].condition.icon));
    selectors.dayTemperature03.textContent = data.forecast.forecastday[0].hour[18].temp_c + "° ";
    selectors.dayRainChance03.textContent = data.forecast.forecastday[0].hour[18].chance_of_rain + " %";
    selectors.dayHumidity03.textContent = data.forecast.forecastday[0].hour[18].humidity + " %";
    selectors.dayWind03.textContent = data.forecast.forecastday[0].hour[18].wind_kph;
    selectors.dayIcon04.src = chooseImg(data.forecast.forecastday[0].hour[23].condition.code, decideDayOrNight(data.forecast.forecastday[0].hour[23].condition.icon));
    selectors.dayTemperature04.textContent = data.forecast.forecastday[0].hour[23].temp_c + "° ";
    selectors.dayRainChance04.textContent = data.forecast.forecastday[0].hour[23].chance_of_rain + " %";
    selectors.dayHumidity04.textContent = data.forecast.forecastday[0].hour[23].humidity + " %";
    selectors.dayWind04.textContent = data.forecast.forecastday[0].hour[23].wind_kph;
    // selectors.dateDay02.textContent = formatDate(data.forecast.forecastday[1].date);
    // selectors.day02Icon01.src = chooseImg(data.forecast.forecastday[1].hour[6].condition.code, decideDayOrNight(data.forecast.forecastday[1].hour[6].condition.icon));
    // selectors.day02Temperature01.textContent = data.forecast.forecastday[1].hour[6].temp_c + "° ";
    // selectors.day02RainChance01.textContent = "Niederschlag: " + data.forecast.forecastday[1].hour[6].chance_of_rain + "%";
    // selectors.day02Humidity01.textContent = "Luftfeuchte: " + data.forecast.forecastday[1].hour[6].humidity + "%";
    // selectors.day02Wind01.textContent = "Wind: " + data.forecast.forecastday[1].hour[6].wind_kph + " km/h";
    // selectors.day02Icon02.src = chooseImg(data.forecast.forecastday[1].hour[12].condition.code, decideDayOrNight(data.forecast.forecastday[1].hour[12].condition.icon));
    // selectors.day02Temperature02.textContent = data.forecast.forecastday[1].hour[12].temp_c + "° ";
    // selectors.day02RainChance02.textContent = "Niederschlag: " + data.forecast.forecastday[1].hour[12].chance_of_rain + "%";
    // selectors.day02Humidity02.textContent = "Luftfeuchte: " + data.forecast.forecastday[1].hour[12].humidity + "%";
    // selectors.day02Wind02.textContent = "Wind: " + data.forecast.forecastday[1].hour[12].wind_kph + " km/h";
    // selectors.day02Icon03.src = chooseImg(data.forecast.forecastday[1].hour[18].condition.code, decideDayOrNight(data.forecast.forecastday[1].hour[18].condition.icon));
    // selectors.day02Temperature03.textContent = data.forecast.forecastday[1].hour[18].temp_c + "° ";
    // selectors.day02RainChance03.textContent = "Niederschlag: " + data.forecast.forecastday[1].hour[18].chance_of_rain + "%";
    // selectors.day02Humidity03.textContent = "Luftfeuchte: " + data.forecast.forecastday[1].hour[18].humidity + "%";
    // selectors.day02Wind03.textContent = "Wind: " + data.forecast.forecastday[1].hour[18].wind_kph + " km/h";
    // selectors.day02Icon04.src = chooseImg(data.forecast.forecastday[1].hour[23].condition.code, decideDayOrNight(data.forecast.forecastday[1].hour[23].condition.icon));
    // selectors.day02Temperature04.textContent = data.forecast.forecastday[1].hour[23].temp_c + "° ";
    // selectors.day02RainChance04.textContent = "Niederschlag: " + data.forecast.forecastday[1].hour[23].chance_of_rain + "%";
    // selectors.day02Humidity04.textContent = "Luftfeuchte: " + data.forecast.forecastday[1].hour[23].humidity + "%";
    // selectors.day02Wind04.textContent = "Wind: " + data.forecast.forecastday[1].hour[23].wind_kph + " km/h";
    // selectors.dateDay03.textContent = formatDate(data.forecast.forecastday[2].date);
    // selectors.day03Icon01.src = chooseImg(data.forecast.forecastday[2].hour[6].condition.code, decideDayOrNight(data.forecast.forecastday[2].hour[6].condition.icon));
    // selectors.day03Temperature01.textContent = data.forecast.forecastday[2].hour[6].temp_c + "° ";
    // selectors.day03RainChance01.textContent = "Niederschlag: " + data.forecast.forecastday[2].hour[6].chance_of_rain + "%";
    // selectors.day03Humidity01.textContent = "Luftfeuchte: " + data.forecast.forecastday[2].hour[6].humidity + "%";
    // selectors.day03Wind01.textContent = "Wind: " + data.forecast.forecastday[2].hour[6].wind_kph + " km/h";
    // selectors.day03Icon02.src = chooseImg(data.forecast.forecastday[2].hour[12].condition.code, decideDayOrNight(data.forecast.forecastday[2].hour[12].condition.icon));
    // selectors.day03Temperature02.textContent = data.forecast.forecastday[2].hour[12].temp_c + "° ";
    // selectors.day03RainChance02.textContent = "Niederschlag: " + data.forecast.forecastday[2].hour[12].chance_of_rain + "%";
    // selectors.day03Humidity02.textContent = "Luftfeuchte: " + data.forecast.forecastday[2].hour[12].humidity + "%";
    // selectors.day03Wind02.textContent = "Wind: " + data.forecast.forecastday[2].hour[12].wind_kph + " km/h";
    // selectors.day03Icon03.src = chooseImg(data.forecast.forecastday[2].hour[18].condition.code, decideDayOrNight(data.forecast.forecastday[2].hour[18].condition.icon));
    // selectors.day03Temperature03.textContent = data.forecast.forecastday[2].hour[18].temp_c + "° ";
    // selectors.day03RainChance03.textContent = "Niederschlag: " + data.forecast.forecastday[2].hour[18].chance_of_rain + "%";
    // selectors.day03Humidity03.textContent = "Luftfeuchte: " + data.forecast.forecastday[2].hour[18].humidity + "%";
    // selectors.day03Wind03.textContent = "Wind: " + data.forecast.forecastday[2].hour[18].wind_kph + " km/h";
    // selectors.day03Icon04.src = chooseImg(data.forecast.forecastday[2].hour[23].condition.code, decideDayOrNight(data.forecast.forecastday[2].hour[23].condition.icon));
    // selectors.day03Temperature04.textContent = data.forecast.forecastday[2].hour[23].temp_c + "° ";
    // selectors.day03RainChance04.textContent = "Niederschlag: " + data.forecast.forecastday[2].hour[23].chance_of_rain + "%";
    // selectors.day03Humidity04.textContent = "Luftfeuchte: " + data.forecast.forecastday[2].hour[23].humidity + "%";
    // selectors.day03Wind04.textContent = "Wind: " + data.forecast.forecastday[2].hour[23].wind_kph + " km/h";

}

function setWeatherData(selectedLocation = "Göttingen") {
    const firstStart = true;
    openLoading();
    setTimeout(() => {
        getWeatherData(selectedLocation)
            .then(data => {
                addDataToPlace(data);
                return data;
            })
            .then(data => {
                FullDayOverview.weatherData = data;
                FullDayOverview.addScrollEvent();
                FullDayOverview.addClassCenteredElement(firstStart, firstStart);
            })
            .catch(error)
            .finally(closeLoading);
    }, 1000);
}

const error = (err) => {
    console.log('Fehler:', err.message);

    const selector = {
        errorBtn: document.getElementById('errorBtn'),
        errorMsg: document.getElementById('errorMsg'),
        errorModal: document.getElementById('errorModal')
    };

    selector.errorModal.showModal();
    selector.errorMsg.textContent = 'Fehler: ' + err.message;
    selector.errorBtn.addEventListener('click', () => selector.errorModal.close()); 
};

function chooseImg(code, dayOrNight) {
    if (dayOrNight === 'day') {
        switch (code) {
            case 1000:
                return require('../assets/weatherIcons/day.svg');
            case 1003:
                return require('../assets/weatherIcons/cloudy-day-1.svg');
            case 1006:
            case 1009:
            case 1030:
                return require('../assets/weatherIcons/cloudy.svg');
            case 1063:
                return require('../assets/weatherIcons/rainy-2.svg');
            case 1066:
                return require('../assets/weatherIcons/snowy-3.svg');
            case 1069:
            case 1072:
                return require('../assets/weatherIcons/rainy-2.svg');
            case 1087:
                return require('../assets/weatherIcons/thunder.svg');
            case 1114:
                return require('../assets/weatherIcons/snowy-5.svg');
            case 1117:
                return require('../assets/weatherIcons/snowy-6.svg');
            case 1135:
            case 1147:
                return require('../assets/weatherIcons/cloudy.svg');
            case 1150:
            case 1153:
                return require('../assets/weatherIcons/rainy-7.svg');
            case 1168:
            case 1171:
                return require('../assets/weatherIcons/rainy-7.svg');
            case 1180:
            case 1183:
                return require('../assets/weatherIcons/rainy-2.svg');
            case 1186:
            case 1189:
            case 1192:
            case 1195:
                return require('../assets/weatherIcons/rainy-3.svg');
            case 1198:
                return require('../assets/weatherIcons/rainy-4.svg');
            case 1201:
                return require('../assets/weatherIcons/rainy-6.svg');
            case 1204:
                return require('../assets/weatherIcons/rainy-4.svg');
            case 1207:
                return require('../assets/weatherIcons/rainy-6.svg');
            case 1210:
                return require('../assets/weatherIcons/snowy-2.svg');
            case 1213:
                return require('../assets/weatherIcons/snowy-4.svg');
            case 1216:
                return require('../assets/weatherIcons/snowy-3.svg');
            case 1219:
                return require('../assets/weatherIcons/snowy-5.svg');
            case 1222:
                return require('../assets/weatherIcons/snowy-3.svg');
            case 1225:
                return require('../assets/weatherIcons/snowy-6.svg');
            case 1237:
                return require('../assets/weatherIcons/snowy-4.svg');
            case 1240:
                return require('../assets/weatherIcons/rainy-2.svg');
            case 1243:
            case 1246:
                return require('../assets/weatherIcons/rainy-3.svg');
            case 1249:
                return require('../assets/weatherIcons/rainy-2.svg');
            case 1252:
                return require('../assets/weatherIcons/rainy-3.svg');
            case 1255:
                return require('../assets/weatherIcons/snowy-2.svg');
            case 1258:
                return require('../assets/weatherIcons/snowy-3.svg');
            case 1261:
                return require('../assets/weatherIcons/snowy-2.svg');
            case 1264:
                return require('../assets/weatherIcons/snowy-3.svg');
            case 1273:
            case 1276:
            case 1279:
            case 1282:
                return require('../assets/weatherIcons/thunder.svg');
            default:
              console.log('Error: Invalid weather code!')
          }
    }

    if (dayOrNight === 'night') {
        switch (code) {
            case 1000:
                return require('../assets/weatherIcons/night.svg');
            case 1003:
                return require('../assets/weatherIcons/cloudy-night-3.svg');
            case 1006:
            case 1009:
            case 1030:
                return require('../assets/weatherIcons/cloudy.svg');
            case 1063:
                return require('../assets/weatherIcons/rainy-4.svg');
            case 1066:
                return require('../assets/weatherIcons/snowy-4.svg');
            case 1069:
            case 1072:
                return require('../assets/weatherIcons/rainy-4.svg');
            case 1087:
                return require('../assets/weatherIcons/thunder.svg');
            case 1114:
                return require('../assets/weatherIcons/snowy-5.svg');
            case 1117:
                return require('../assets/weatherIcons/snowy-6.svg');
            case 1135:
            case 1147:
                return require('../assets/weatherIcons/cloudy.svg');
            case 1150:
            case 1153:
                return require('../assets/weatherIcons/rainy-7.svg');
            case 1168:
            case 1171:
                return require('../assets/weatherIcons/rainy-6.svg');
            case 1180:
            case 1183:
                return require('../assets/weatherIcons/rainy-4.svg');
            case 1186:
            case 1189:
                return require('../assets/weatherIcons/rainy-5.svg');
            case 1192:
            case 1195:
                return require('../assets/weatherIcons/rainy-6.svg');
            case 1198:
                return require('../assets/weatherIcons/rainy-4.svg');
            case 1201:
                return require('../assets/weatherIcons/rainy-6.svg');
            case 1204:
                return require('../assets/weatherIcons/rainy-4.svg');
            case 1207:
                return require('../assets/weatherIcons/rainy-6.svg');
            case 1210:
            case 1213:
                return require('../assets/weatherIcons/snowy-4.svg');
            case 1216:
            case 1219:
                return require('../assets/weatherIcons/snowy-5.svg');
            case 1222:
            case 1225:
                return require('../assets/weatherIcons/snowy-6.svg');
            case 1237:
                return require('../assets/weatherIcons/snowy-4.svg');
            case 1240:
                return require('../assets/weatherIcons/rainy-4.svg');
            case 1243:
                return require('../assets/weatherIcons/rainy-5.svg');
            case 1246:
                return require('../assets/weatherIcons/rainy-6.svg');
            case 1249:
                return require('../assets/weatherIcons/rainy-4.svg');
            case 1252:
                return require('../assets/weatherIcons/rainy-6.svg');
            case 1255:
                return require('../assets/weatherIcons/snowy-4.svg');
            case 1258:
                return require('../assets/weatherIcons/snowy-6.svg');
            case 1261:
                return require('../assets/weatherIcons/snowy-4.svg');
            case 1264:
                return require('../assets/weatherIcons/snowy-6.svg');
            case 1273:
            case 1276:
            case 1279:
            case 1282:
                return require('../assets/weatherIcons/thunder.svg');
            default:
              console.log('Error: Invalid weather code!')
        }
    }
};

function decideDayOrNight(src) {
    if (src.includes('day')) return 'day';
    return 'night' 
}

function chooseDescription(code, dayOrNight, selectedLang = 'German') {
    const langData = require('../assets/langData.json');

    // Find the weather-data based on the code
    const weather = langData.find(item => item.code === code);
    if (!weather) {
        return console.log('Wettercode nicht gefunden');
    }

    // find the language-data based on the language
    const language = weather.languages.find(lang => lang.lang_name === selectedLang);
    if (!language) {
        return console.log('Sprache nicht gefunden');
    }

    // Return the description based on the daytime
    if (dayOrNight === 'day') {
        return language.day_text;
    } else if (dayOrNight === 'night') {
        return language.night_text;
    } else {
        return console.log('Ungültige Tageszeit');
    }
}

function updateDayOverviewWeatherData(data) {
    const hours = data.forecast.forecastday[0].hour;
    
    hours.forEach((hourData, index) => {
        const hour = String(index).padStart(2, '0'); // Formate to 2 numbers
        document.getElementById(`hour${hour}Temperature`).textContent = `${hourData.temp_c}°`;
        document.getElementById(`hour${hour}Icon`).src = chooseImg(hourData.condition.code, decideDayOrNight(hourData.condition.icon));
    });
}

export default setWeatherData;