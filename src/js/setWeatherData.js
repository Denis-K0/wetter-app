import getWeatherData from "./getWeatherData";

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
        actualDateAndTime: document.getElementById('actualDateAndTime'),
        actualWeatherIcon: document.getElementById('actualWeatherIcon'),
        actualTemperatur: document.getElementById('actualTemperatur'),
        actualRainChance: document.getElementById('actualRainChance'),
        actualHumidity: document.getElementById('actualHumidity'),
        actualWind: document.getElementById('actualWind'),
        dateDay01: document.getElementById('dateDay01'),
        day01Container: document.getElementById('day01Container'),
        day01Icon01: document.getElementById('day01Icon01'),
        day01Temperatur01: document.getElementById('day01Temperatur01'),
        day01RainChance01: document.getElementById('day01RainChance01'),
        day01Humidity01: document.getElementById('day01Humidity01'),
        day01Wind01: document.getElementById('day01Wind01'),
        day01Icon02: document.getElementById('day01Icon02'),
        day01Temperatur02: document.getElementById('day01Temperatur02'),
        day01RainChance02: document.getElementById('day01RainChance02'),
        day01Humidity02: document.getElementById('day01Humidity02'),
        day01Wind02: document.getElementById('day01Wind02'),
        day01Icon03: document.getElementById('day01Icon03'),
        day01Temperatur03: document.getElementById('day01Temperatur03'),
        day01RainChance03: document.getElementById('day01RainChance03'),
        day01Humidity03: document.getElementById('day01Humidity03'),
        day01Wind03: document.getElementById('day01Wind03'),
        day01Icon04: document.getElementById('day01Icon04'),
        day01Temperatur04: document.getElementById('day01Temperatur04'),
        day01RainChance04: document.getElementById('day01RainChance04'),
        day01Humidity04: document.getElementById('day01Humidity04'),
        day01Wind04: document.getElementById('day01Wind04'),
        dateDay02: document.getElementById('dateDay02'),
        day02Container: document.getElementById('day02Container'),
        day02Icon01: document.getElementById('day02Icon01'),
        day02Temperatur01: document.getElementById('day02Temperatur01'),
        day02RainChance01: document.getElementById('day02RainChance01'),
        day02Humidity01: document.getElementById('day02Humidity01'),
        day02Wind01: document.getElementById('day02Wind01'),
        day02Icon02: document.getElementById('day02Icon02'),
        day02Temperatur02: document.getElementById('day02Temperatur02'),
        day02RainChance02: document.getElementById('day02RainChance02'),
        day02Humidity02: document.getElementById('day02Humidity02'),
        day02Wind02: document.getElementById('day02Wind02'),
        day02Icon03: document.getElementById('day02Icon03'),
        day02Temperatur03: document.getElementById('day02Temperatur03'),
        day02RainChance03: document.getElementById('day02RainChance03'),
        day02Humidity03: document.getElementById('day02Humidity03'),
        day02Wind03: document.getElementById('day02Wind03'),
        day02Icon04: document.getElementById('day02Icon04'),
        day02Temperatur04: document.getElementById('day02Temperatur04'),
        day02RainChance04: document.getElementById('day02RainChance04'),
        day02Humidity04: document.getElementById('day02Humidity04'),
        day02Wind04: document.getElementById('day02Wind04'),
        dateDay03: document.getElementById('dateDay03'),
        day03Container: document.getElementById('day03Container'),
        day03Icon01: document.getElementById('day03Icon01'),
        day03Temperatur01: document.getElementById('day03Temperatur01'),
        day03RainChance01: document.getElementById('day03RainChance01'),
        day03Humidity01: document.getElementById('day03Humidity01'),
        day03Wind01: document.getElementById('day03Wind01'),
        day03Icon02: document.getElementById('day03Icon02'),
        day03Temperatur02: document.getElementById('day03Temperatur02'),
        day03RainChance02: document.getElementById('day03RainChance02'),
        day03Humidity02: document.getElementById('day03Humidity02'),
        day03Wind02: document.getElementById('day03Wind02'),
        day03Icon03: document.getElementById('day03Icon03'),
        day03Temperatur03: document.getElementById('day03Temperatur03'),
        day03RainChance03: document.getElementById('day03RainChance03'),
        day03Humidity03: document.getElementById('day03Humidity03'),
        day03Wind03: document.getElementById('day03Wind03'),
        day03Icon04: document.getElementById('day03Icon04'),
        day03Temperatur04: document.getElementById('day03Temperatur04'),
        day03RainChance04: document.getElementById('day03RainChance04'),
        day03Humidity04: document.getElementById('day03Humidity04'),
        day03Wind04: document.getElementById('day03Wind04')
    };

    const now = new Date(); // actual Date and Time
    const currentHour = now.getHours();

    selectors.city.textContent = data.location.name;
    selectors.country.textContent = data.location.country;
    selectors.actualDateAndTime.textContent = data.location.localtime.slice(-5);
    selectors.actualWeatherIcon.src = chooseImg(data.current.condition.code, decideDayOrNight(data.current.condition.icon));
    selectors.actualTemperatur.textContent = data.current.temp_c + "° ";
    selectors.actualRainChance.textContent = "Niederschlag: " + data.forecast.forecastday[1].hour[currentHour].chance_of_rain + "%";
    selectors.actualHumidity.textContent = "Luftfeuchte: " + data.current.humidity + "%";
    selectors.actualWind.textContent = "Wind: " + data.current.wind_kph + " km/h";
    selectors.dateDay01.textContent = formatDate(data.forecast.forecastday[0].date);
    selectors.day01Icon01.src = chooseImg(data.forecast.forecastday[0].hour[6].condition.code, decideDayOrNight(data.forecast.forecastday[0].hour[6].condition.icon));
    selectors.day01Temperatur01.textContent = data.forecast.forecastday[0].hour[6].temp_c + "° ";
    selectors.day01RainChance01.textContent = "Niederschlag: " + data.forecast.forecastday[0].hour[6].chance_of_rain + "%";
    selectors.day01Humidity01.textContent = "Luftfeuchte: " + data.forecast.forecastday[0].hour[6].humidity + "%";
    selectors.day01Wind01.textContent = "Wind: " + data.forecast.forecastday[0].hour[6].wind_kph + " km/h";
    selectors.day01Icon02.src = chooseImg(data.forecast.forecastday[0].hour[12].condition.code, decideDayOrNight(data.forecast.forecastday[0].hour[12].condition.icon));
    selectors.day01Temperatur02.textContent = data.forecast.forecastday[0].hour[12].temp_c + "° ";
    selectors.day01RainChance02.textContent = "Niederschlag: " + data.forecast.forecastday[0].hour[12].chance_of_rain + "%";
    selectors.day01Humidity02.textContent = "Luftfeuchte: " + data.forecast.forecastday[0].hour[12].humidity + "%";
    selectors.day01Wind02.textContent = "Wind: " + data.forecast.forecastday[0].hour[12].wind_kph + " km/h";
    selectors.day01Icon03.src = chooseImg(data.forecast.forecastday[0].hour[18].condition.code, decideDayOrNight(data.forecast.forecastday[0].hour[18].condition.icon));
    selectors.day01Temperatur03.textContent = data.forecast.forecastday[0].hour[18].temp_c + "° ";
    selectors.day01RainChance03.textContent = "Niederschlag: " + data.forecast.forecastday[0].hour[18].chance_of_rain + "%";
    selectors.day01Humidity03.textContent = "Luftfeuchte: " + data.forecast.forecastday[0].hour[18].humidity + "%";
    selectors.day01Wind03.textContent = "Wind: " + data.forecast.forecastday[0].hour[18].wind_kph + " km/h";
    selectors.day01Icon04.src = chooseImg(data.forecast.forecastday[0].hour[23].condition.code, decideDayOrNight(data.forecast.forecastday[0].hour[23].condition.icon));
    selectors.day01Temperatur04.textContent = data.forecast.forecastday[0].hour[23].temp_c + "° ";
    selectors.day01RainChance04.textContent = "Niederschlag: " + data.forecast.forecastday[0].hour[23].chance_of_rain + "%";
    selectors.day01Humidity04.textContent = "Luftfeuchte: " + data.forecast.forecastday[0].hour[23].humidity + "%";
    selectors.day01Wind04.textContent = "Wind: " + data.forecast.forecastday[0].hour[23].wind_kph + " km/h";
    selectors.dateDay02.textContent = formatDate(data.forecast.forecastday[1].date);
    selectors.day02Icon01.src = chooseImg(data.forecast.forecastday[1].hour[6].condition.code, decideDayOrNight(data.forecast.forecastday[1].hour[6].condition.icon));
    selectors.day02Temperatur01.textContent = data.forecast.forecastday[1].hour[6].temp_c + "° ";
    selectors.day02RainChance01.textContent = "Niederschlag: " + data.forecast.forecastday[1].hour[6].chance_of_rain + "%";
    selectors.day02Humidity01.textContent = "Luftfeuchte: " + data.forecast.forecastday[1].hour[6].humidity + "%";
    selectors.day02Wind01.textContent = "Wind: " + data.forecast.forecastday[1].hour[6].wind_kph + " km/h";
    selectors.day02Icon02.src = chooseImg(data.forecast.forecastday[1].hour[12].condition.code, decideDayOrNight(data.forecast.forecastday[1].hour[12].condition.icon));
    selectors.day02Temperatur02.textContent = data.forecast.forecastday[1].hour[12].temp_c + "° ";
    selectors.day02RainChance02.textContent = "Niederschlag: " + data.forecast.forecastday[1].hour[12].chance_of_rain + "%";
    selectors.day02Humidity02.textContent = "Luftfeuchte: " + data.forecast.forecastday[1].hour[12].humidity + "%";
    selectors.day02Wind02.textContent = "Wind: " + data.forecast.forecastday[1].hour[12].wind_kph + " km/h";
    selectors.day02Icon03.src = chooseImg(data.forecast.forecastday[1].hour[18].condition.code, decideDayOrNight(data.forecast.forecastday[1].hour[18].condition.icon));
    selectors.day02Temperatur03.textContent = data.forecast.forecastday[1].hour[18].temp_c + "° ";
    selectors.day02RainChance03.textContent = "Niederschlag: " + data.forecast.forecastday[1].hour[18].chance_of_rain + "%";
    selectors.day02Humidity03.textContent = "Luftfeuchte: " + data.forecast.forecastday[1].hour[18].humidity + "%";
    selectors.day02Wind03.textContent = "Wind: " + data.forecast.forecastday[1].hour[18].wind_kph + " km/h";
    selectors.day02Icon04.src = chooseImg(data.forecast.forecastday[1].hour[23].condition.code, decideDayOrNight(data.forecast.forecastday[1].hour[23].condition.icon));
    selectors.day02Temperatur04.textContent = data.forecast.forecastday[1].hour[23].temp_c + "° ";
    selectors.day02RainChance04.textContent = "Niederschlag: " + data.forecast.forecastday[1].hour[23].chance_of_rain + "%";
    selectors.day02Humidity04.textContent = "Luftfeuchte: " + data.forecast.forecastday[1].hour[23].humidity + "%";
    selectors.day02Wind04.textContent = "Wind: " + data.forecast.forecastday[1].hour[23].wind_kph + " km/h";
    selectors.dateDay03.textContent = formatDate(data.forecast.forecastday[2].date);
    selectors.day03Icon01.src = chooseImg(data.forecast.forecastday[2].hour[6].condition.code, decideDayOrNight(data.forecast.forecastday[2].hour[6].condition.icon));
    selectors.day03Temperatur01.textContent = data.forecast.forecastday[2].hour[6].temp_c + "° ";
    selectors.day03RainChance01.textContent = "Niederschlag: " + data.forecast.forecastday[2].hour[6].chance_of_rain + "%";
    selectors.day03Humidity01.textContent = "Luftfeuchte: " + data.forecast.forecastday[2].hour[6].humidity + "%";
    selectors.day03Wind01.textContent = "Wind: " + data.forecast.forecastday[2].hour[6].wind_kph + " km/h";
    selectors.day03Icon02.src = chooseImg(data.forecast.forecastday[2].hour[12].condition.code, decideDayOrNight(data.forecast.forecastday[2].hour[12].condition.icon));
    selectors.day03Temperatur02.textContent = data.forecast.forecastday[2].hour[12].temp_c + "° ";
    selectors.day03RainChance02.textContent = "Niederschlag: " + data.forecast.forecastday[2].hour[12].chance_of_rain + "%";
    selectors.day03Humidity02.textContent = "Luftfeuchte: " + data.forecast.forecastday[2].hour[12].humidity + "%";
    selectors.day03Wind02.textContent = "Wind: " + data.forecast.forecastday[2].hour[12].wind_kph + " km/h";
    selectors.day03Icon03.src = chooseImg(data.forecast.forecastday[2].hour[18].condition.code, decideDayOrNight(data.forecast.forecastday[2].hour[18].condition.icon));
    selectors.day03Temperatur03.textContent = data.forecast.forecastday[2].hour[18].temp_c + "° ";
    selectors.day03RainChance03.textContent = "Niederschlag: " + data.forecast.forecastday[2].hour[18].chance_of_rain + "%";
    selectors.day03Humidity03.textContent = "Luftfeuchte: " + data.forecast.forecastday[2].hour[18].humidity + "%";
    selectors.day03Wind03.textContent = "Wind: " + data.forecast.forecastday[2].hour[18].wind_kph + " km/h";
    selectors.day03Icon04.src = chooseImg(data.forecast.forecastday[2].hour[23].condition.code, decideDayOrNight(data.forecast.forecastday[2].hour[23].condition.icon));
    selectors.day03Temperatur04.textContent = data.forecast.forecastday[2].hour[23].temp_c + "° ";
    selectors.day03RainChance04.textContent = "Niederschlag: " + data.forecast.forecastday[2].hour[23].chance_of_rain + "%";
    selectors.day03Humidity04.textContent = "Luftfeuchte: " + data.forecast.forecastday[2].hour[23].humidity + "%";
    selectors.day03Wind04.textContent = "Wind: " + data.forecast.forecastday[2].hour[23].wind_kph + " km/h";

}

function setWeatherData(selectedLocation = "Hamburg") {
    openLoading();
    setTimeout(() => {
        getWeatherData(selectedLocation)
            .then(data => addDataToPlace(data))
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

export default setWeatherData;