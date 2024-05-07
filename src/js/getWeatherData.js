"use strict";

const getWeatherData = async (selectedLocation) => {
    
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=4576e37b3e004227b9191411240505&q=${selectedLocation}&days=3&aqi=no&alerts=no`)
        .catch(() => console.log("Error: Server not available"));   //If fetch throw his own Error,
                                                                    //this prevents that the Code stopps.
    if (response?.status === 400) {
        throw new Error('Bitte geben Sie einen gültigen Ort ein.');
    }

    if (!response?.ok) {
        throw new Error('Wetter Server nicht abrufbar');
    };

    const data = await response.json();

    return data;
};

export default getWeatherData;