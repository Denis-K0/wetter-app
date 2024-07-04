import setWeatherData from "./setWeatherData";

"use strict";

function setLocation() {
    const selector = {
        submitButton: document.getElementById('submitLocationBtn'),
        locationInput: document.getElementById('locationInput')
    };

    selector.submitButton.addEventListener('click', () => {
        const selectedLocation = selector.locationInput.value;
        setWeatherData(selectedLocation);
    });

    selector.locationInput.addEventListener('keypress', (event) => {
        if (event.key === "Enter" || event.keyCode === 13) {
            const selectedLocation = selector.locationInput.value;
            console.log(selectedLocation);
            setWeatherData(selectedLocation);
        }
    });
};

export default setLocation;