import getWeatherData from "./getWeatherData";
import { FullDayOverview, DayBtns, ThreeDaysOverviewHeadline, ThreeDaysOverviewWindow } from "./ui";

"use strict";

let weatherData = null;

const DataPlacement = {
    showDay: 0,
    selectors: {
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
    },
    setWeatherData(selectedLocation = "Göttingen") {
        const firstStart = true;
        DataPlacement.openLoading();
        setTimeout(() => {
            getWeatherData(selectedLocation)
                .then(data => {
                    DataPlacement.addDataToPlace(data);
                    return data;
                })
                .then(data => {
                    weatherData = data;
                    FullDayOverview.addScrollEvent();
                    FullDayOverview.addClassCenteredElement(firstStart, firstStart);
                })
                .catch(DataPlacement.error)
                .finally(DataPlacement.closeLoading);
        }, 1000);
    },
    openLoading() {
        console.log("Wait ...");
        const modal = document.getElementById('modal');
        modal.showModal();
    
    },
    closeLoading() {
        console.log("... complete.");
        modal.close();
    },
    error: (err) => {
        console.log('Fehler:', err.message);
    
        const selector = {
            errorBtn: document.getElementById('errorBtn'),
            errorMsg: document.getElementById('errorMsg'),
            errorModal: document.getElementById('errorModal')
        };
    
        selector.errorModal.showModal();
        selector.errorMsg.textContent = 'Fehler: ' + err.message;
        selector.errorBtn.addEventListener('click', () => selector.errorModal.close()); 
    },
    addDataToPlace(data) {
        this.selectors.city.textContent = data.location.name;
        this.selectors.country.textContent = data.location.country;
        this.selectors.currentDateAndTime.textContent = data.location.localtime.slice(-5) + ' - Aktuell';
        this.selectors.currentWeatherIcon.src = this.chooseImg(data.current.condition.code, this.decideDayOrNight(data.current.condition.icon));
        this.selectors.currentWeatherDescription.textContent = this.chooseDescription(data.current.condition.code, this.decideDayOrNight(data.current.condition.icon));
        this.selectors.currentTemperature.textContent = data.current.temp_c + "° ";
        this.selectors.currentRainChance.textContent = data.forecast.forecastday[0].hour[this.getCurrentHour()].chance_of_rain + " %";
        this.selectors.currentHumidity.textContent = data.current.humidity + " %";
        this.selectors.currentWind.textContent = data.current.wind_kph + " km/h";
        this.selectors.day01Name.textContent = this.formatDate(data.forecast.forecastday[0].date).slice(0, -12);
        this.selectors.day01Icon.src = this.chooseImg(data.forecast.forecastday[0].day.condition.code, this.decideDayOrNight(data.forecast.forecastday[0].day.condition.icon));
        this.selectors.day01MaxTemperature.textContent = data.forecast.forecastday[0].day.maxtemp_c + "°";
        this.selectors.day01MinTemperature.textContent = data.forecast.forecastday[0].day.mintemp_c + "°";
        this.selectors.day02Name.textContent = this.formatDate(data.forecast.forecastday[1].date).slice(0, -12);
        this.selectors.day02Icon.src = this.chooseImg(data.forecast.forecastday[1].day.condition.code, this.decideDayOrNight(data.forecast.forecastday[1].day.condition.icon));
        this.selectors.day02MaxTemperature.textContent = data.forecast.forecastday[1].day.maxtemp_c + "°";
        this.selectors.day02MinTemperature.textContent = data.forecast.forecastday[1].day.mintemp_c + "°";
        this.selectors.day03Name.textContent = this.formatDate(data.forecast.forecastday[2].date).slice(0, -12);
        this.selectors.day03Icon.src = this.chooseImg(data.forecast.forecastday[2].day.condition.code, this.decideDayOrNight(data.forecast.forecastday[2].day.condition.icon));
        this.selectors.day03MaxTemperature.textContent = data.forecast.forecastday[2].day.maxtemp_c + "°";
        this.selectors.day03MinTemperature.textContent = data.forecast.forecastday[2].day.mintemp_c + "°";
        
        this.updateThreeDaysOverview(data)
        this.updateFullDayOverview(data);
    },
    getCurrentHour() {
        // Necessary for the current RainChance
        const now = new Date(); // current Date and Time
        const currentHour = now.getHours();
        return currentHour;
    },
    formatDate(inputDate) {

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
    },
    chooseImg(code, dayOrNight) {
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
    },
    decideDayOrNight(src) {
        if (src.includes('day')) return 'day';
        return 'night' 
    },
    chooseDescription(code, dayOrNight, selectedLang = 'German') {
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
    },
    updateFullDayOverview(data = weatherData, day = DataPlacement.showDay) {
        const hours = data.forecast.forecastday[day].hour;
        
        hours.forEach((hourData, index) => {
            const hour = String(index).padStart(2, '0'); // Formate to 2 numbers
            document.getElementById(`hour${hour}Temperature`).textContent = `${hourData.temp_c}°`;
            document.getElementById(`hour${hour}Icon`).src = this.chooseImg(hourData.condition.code, this.decideDayOrNight(hourData.condition.icon));
        });
    },
    updateThreeDaysOverview(data = weatherData, day = DataPlacement.showDay) {
                this.selectors.dateDay.textContent = this.formatDate(data.forecast.forecastday[day].date);
                this.selectors.dayIcon01.src = this.chooseImg(data.forecast.forecastday[day].hour[6].condition.code, this.decideDayOrNight(data.forecast.forecastday[day].hour[6].condition.icon));
                this.selectors.dayTemperature01.textContent = data.forecast.forecastday[day].hour[6].temp_c + "° ";
                this.selectors.dayRainChance01.textContent = data.forecast.forecastday[day].hour[6].chance_of_rain + " %";
                this.selectors.dayHumidity01.textContent = data.forecast.forecastday[day].hour[6].humidity + " %";
                this.selectors.dayWind01.textContent = data.forecast.forecastday[day].hour[6].wind_kph;
                this.selectors.dayIcon02.src = this.chooseImg(data.forecast.forecastday[day].hour[12].condition.code, this.decideDayOrNight(data.forecast.forecastday[day].hour[12].condition.icon));
                this.selectors.dayTemperature02.textContent = data.forecast.forecastday[day].hour[12].temp_c + "° ";
                this.selectors.dayRainChance02.textContent = data.forecast.forecastday[day].hour[12].chance_of_rain + " %";
                this.selectors.dayHumidity02.textContent = data.forecast.forecastday[day].hour[12].humidity + " %";
                this.selectors.dayWind02.textContent = data.forecast.forecastday[day].hour[12].wind_kph;
                this.selectors.dayIcon03.src = this.chooseImg(data.forecast.forecastday[day].hour[18].condition.code, this.decideDayOrNight(data.forecast.forecastday[day].hour[18].condition.icon));
                this.selectors.dayTemperature03.textContent = data.forecast.forecastday[day].hour[18].temp_c + "° ";
                this.selectors.dayRainChance03.textContent = data.forecast.forecastday[day].hour[18].chance_of_rain + " %";
                this.selectors.dayHumidity03.textContent = data.forecast.forecastday[day].hour[18].humidity + " %";
                this.selectors.dayWind03.textContent = data.forecast.forecastday[day].hour[18].wind_kph;
                this.selectors.dayIcon04.src = this.chooseImg(data.forecast.forecastday[day].hour[23].condition.code, this.decideDayOrNight(data.forecast.forecastday[day].hour[23].condition.icon));
                this.selectors.dayTemperature04.textContent = data.forecast.forecastday[day].hour[23].temp_c + "° ";
                this.selectors.dayRainChance04.textContent = data.forecast.forecastday[day].hour[23].chance_of_rain + " %";
                this.selectors.dayHumidity04.textContent = data.forecast.forecastday[day].hour[23].humidity + " %";
                this.selectors.dayWind04.textContent = data.forecast.forecastday[day].hour[23].wind_kph;
    },
    setConditions(element = FullDayOverview.centeredElement, day = DataPlacement.showDay) {
        if (!weatherData) return; // No Data = Nothing to do

        const hours = weatherData.forecast.forecastday[day].hour;
    
        hours.forEach((hourData, index) => {
            const hour = String(index).padStart(2, '0'); // Formate to 2 numbers
            if (!element.classList.contains(hour)) return; // Right Hour? Continue 
            document.getElementById(`hourRainChanceValue`).textContent = `${hourData.chance_of_rain} %`;
            document.getElementById(`hourHumidityValue`).textContent = `${hourData.humidity} %`;
            document.getElementById(`hourWindValue`).textContent = `${hourData.wind_kph}`;
        });
    },
    changeDay(day, arrow) {
        // Handle right day, when a arrow was clicked
        if (arrow) {
            day = this.showDay + day;
            if(day === 3) day = 0;
            if(day === -1) day = 2;
        };
        
        this.showDay = day;

        DayBtns.changeClass(day);
        ThreeDaysOverviewHeadline.changeDotClass(day);
        ThreeDaysOverviewWindow.changeClasses();

        // Change the data depending to the Day
        this.updateFullDayOverview();
        this.updateThreeDaysOverview();
        this.setConditions();
    }
}

export { DataPlacement, weatherData };