import getWeatherData from "./getWeatherData";

"use strict";

function formatDate(inputDate) {

    var date = new Date(inputDate);

    // Tagebezeichnung abrufen (z. B. Montag, Dienstag usw.)
    var daysOfWeek = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    var dayOfWeek = daysOfWeek[date.getDay()];

    // Datum extrahieren
    var day = date.getDate();
    var month = date.getMonth() + 1; // Monate beginnen bei 0, daher +1
    var year = date.getFullYear();

    // Führende Nullen für Tag und Monat hinzufügen, falls nötig
    day = (day < 10) ? '0' + day : day;
    month = (month < 10) ? '0' + month : month;

    // Formatieren und zurückgeben
    var formattedDate = dayOfWeek + ', ' + day + '.' + month + '.' + year;
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
    console.log(data);

    const selectors = {
        city: document.getElementById('city'),
        country: document.getElementById('country'),
        actualDateAndTime: document.getElementById('actualDateAndTime'),
        actualWeatherIcon: document.getElementById('actualWeatherIcon'),
        actualTemperatur: document.getElementById('actualTemperatur'),
        actualRainChance: document.getElementById('actualRainChance'),
        dateDay01: document.getElementById('dateDay01'),
        day01Container: document.getElementById('day01Container'),
        day01Icon01: document.getElementById('day01Icon01'),
        day01Temperatur01: document.getElementById('day01Temperatur01'),
        day01RainChance01: document.getElementById('day01RainChance01'),
        day01Icon02: document.getElementById('day01Icon02'),
        day01Temperatur02: document.getElementById('day01Temperatur02'),
        day01RainChance02: document.getElementById('day01RainChance02'),
        day01Icon03: document.getElementById('day01Icon03'),
        day01Temperatur03: document.getElementById('day01Temperatur03'),
        day01RainChance03: document.getElementById('day01RainChance03'),
        day01Icon04: document.getElementById('day01Icon04'),
        day01Temperatur04: document.getElementById('day01Temperatur04'),
        day01RainChance04: document.getElementById('day01RainChance04'),
        dateDay02: document.getElementById('dateDay02'),
        day02Container: document.getElementById('day02Container'),
        day02Icon01: document.getElementById('day02Icon01'),
        day02Temperatur01: document.getElementById('day02Temperatur01'),
        day02RainChance01: document.getElementById('day02RainChance01'),
        day02Icon02: document.getElementById('day02Icon02'),
        day02Temperatur02: document.getElementById('day02Temperatur02'),
        day02RainChance02: document.getElementById('day02RainChance02'),
        day02Icon03: document.getElementById('day02Icon03'),
        day02Temperatur03: document.getElementById('day02Temperatur03'),
        day02RainChance03: document.getElementById('day02RainChance03'),
        day02Icon04: document.getElementById('day02Icon04'),
        day02Temperatur04: document.getElementById('day02Temperatur04'),
        day02RainChance04: document.getElementById('day02RainChance04'),
        dateDay03: document.getElementById('dateDay03'),
        day03Container: document.getElementById('day03Container'),
        day03Icon01: document.getElementById('day03Icon01'),
        day03Temperatur01: document.getElementById('day03Temperatur01'),
        day03RainChance01: document.getElementById('day03RainChance01'),
        day03Icon02: document.getElementById('day03Icon02'),
        day03Temperatur02: document.getElementById('day03Temperatur02'),
        day03RainChance02: document.getElementById('day03RainChance02'),
        day03Icon03: document.getElementById('day03Icon03'),
        day03Temperatur03: document.getElementById('day03Temperatur03'),
        day03RainChance03: document.getElementById('day03RainChance03'),
        day03Icon04: document.getElementById('day03Icon04'),
        day03Temperatur04: document.getElementById('day03Temperatur04'),
        day03RainChance04: document.getElementById('day03RainChance04')
    };

    const now = new Date(); // Aktuelles Datum und Zeit
    const currentHour = now.getHours();

    selectors.city.textContent = data.location.name;
    selectors.country.textContent = data.location.country;
    selectors.actualDateAndTime.textContent = data.location.localtime.slice(-5);
    selectors.actualWeatherIcon.src = data.current.condition.icon;
    selectors.actualTemperatur.textContent = data.current.temp_c + "° " + data.current.feelslike_c + "°";
    selectors.actualRainChance.textContent = "Niederschlag: " + data.forecast.forecastday[1].hour[currentHour].chance_of_rain + "%";
    selectors.dateDay01.textContent = formatDate(data.forecast.forecastday[0].date);
    selectors.day01Icon01.src = data.forecast.forecastday[0].hour[6].condition.icon;
    selectors.day01Temperatur01.textContent = data.forecast.forecastday[0].hour[6].temp_c + "° " + data.forecast.forecastday[0].hour[6].feelslike_c + "°";
    selectors.day01RainChance01.textContent = "Niederschlag: " + data.forecast.forecastday[0].hour[6].chance_of_rain + "%";
    selectors.day01Icon02.src = data.forecast.forecastday[0].hour[12].condition.icon;
    selectors.day01Temperatur02.textContent = data.forecast.forecastday[0].hour[12].temp_c + "° " + data.forecast.forecastday[0].hour[12].feelslike_c + "°";
    selectors.day01RainChance02.textContent = "Niederschlag: " + data.forecast.forecastday[0].hour[12].chance_of_rain + "%";
    selectors.day01Icon03.src = data.forecast.forecastday[0].hour[18].condition.icon;
    selectors.day01Temperatur03.textContent = data.forecast.forecastday[0].hour[18].temp_c + "° " + data.forecast.forecastday[0].hour[18].feelslike_c + "°";
    selectors.day01RainChance03.textContent = "Niederschlag: " + data.forecast.forecastday[0].hour[18].chance_of_rain + "%";
    selectors.day01Icon04.src = data.forecast.forecastday[0].hour[23].condition.icon;
    selectors.day01Temperatur04.textContent = data.forecast.forecastday[0].hour[23].temp_c + "° " + data.forecast.forecastday[0].hour[23].feelslike_c + "°";
    selectors.day01RainChance04.textContent = "Niederschlag: " + data.forecast.forecastday[0].hour[23].chance_of_rain + "%";
    selectors.dateDay02.textContent = formatDate(data.forecast.forecastday[1].date);
    selectors.day02Icon01.src = data.forecast.forecastday[1].hour[6].condition.icon;
    selectors.day02Temperatur01.textContent = data.forecast.forecastday[1].hour[6].temp_c + "° " + data.forecast.forecastday[1].hour[6].feelslike_c + "°";
    selectors.day02RainChance01.textContent = "Niederschlag: " + data.forecast.forecastday[1].hour[6].chance_of_rain + "%";
    selectors.day02Icon02.src = data.forecast.forecastday[1].hour[12].condition.icon;
    selectors.day02Temperatur02.textContent = data.forecast.forecastday[1].hour[12].temp_c + "° " + data.forecast.forecastday[1].hour[12].feelslike_c + "°";
    selectors.day02RainChance02.textContent = "Niederschlag: " + data.forecast.forecastday[1].hour[12].chance_of_rain + "%";
    selectors.day02Icon03.src = data.forecast.forecastday[1].hour[18].condition.icon;
    selectors.day02Temperatur03.textContent = data.forecast.forecastday[1].hour[18].temp_c + "° " + data.forecast.forecastday[1].hour[18].feelslike_c + "°";
    selectors.day02RainChance03.textContent = "Niederschlag: " + data.forecast.forecastday[1].hour[18].chance_of_rain + "%";
    selectors.day02Icon04.src = data.forecast.forecastday[1].hour[23].condition.icon;
    selectors.day02Temperatur04.textContent = data.forecast.forecastday[1].hour[23].temp_c + "° " + data.forecast.forecastday[1].hour[23].feelslike_c + "°";
    selectors.day02RainChance04.textContent = "Niederschlag: " + data.forecast.forecastday[1].hour[23].chance_of_rain + "%";
    selectors.dateDay03.textContent = formatDate(data.forecast.forecastday[2].date);
    selectors.day03Icon01.src = data.forecast.forecastday[2].hour[6].condition.icon;
    selectors.day03Temperatur01.textContent = data.forecast.forecastday[2].hour[6].temp_c + "° " + data.forecast.forecastday[2].hour[6].feelslike_c + "°";
    selectors.day03RainChance01.textContent = "Niederschlag: " + data.forecast.forecastday[2].hour[6].chance_of_rain + "%";
    selectors.day03Icon02.src = data.forecast.forecastday[2].hour[12].condition.icon;
    selectors.day03Temperatur02.textContent = data.forecast.forecastday[2].hour[12].temp_c + "° " + data.forecast.forecastday[2].hour[12].feelslike_c + "°";
    selectors.day03RainChance02.textContent = "Niederschlag: " + data.forecast.forecastday[2].hour[12].chance_of_rain + "%";
    selectors.day03Icon03.src = data.forecast.forecastday[2].hour[18].condition.icon;
    selectors.day03Temperatur03.textContent = data.forecast.forecastday[2].hour[18].temp_c + "° " + data.forecast.forecastday[2].hour[18].feelslike_c + "°";
    selectors.day03RainChance03.textContent = "Niederschlag: " + data.forecast.forecastday[2].hour[18].chance_of_rain + "%";
    selectors.day03Icon04.src = data.forecast.forecastday[2].hour[23].condition.icon;
    selectors.day03Temperatur04.textContent = data.forecast.forecastday[2].hour[23].temp_c + "° " + data.forecast.forecastday[2].hour[23].feelslike_c + "°";
    selectors.day03RainChance04.textContent = "Niederschlag: " + data.forecast.forecastday[2].hour[23].chance_of_rain + "%";
};

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
    
}

export default setWeatherData;