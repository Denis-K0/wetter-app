import getWeatherData from "./getWeatherData";

"use strict";

// Schritt 2 - Logik:
//     Function    -> Starte App Logik
//                     -> openLoading Funktion
//                     -> Datenzugriff asynchrone Funktion:
                    
//                         -> then: Datenbasis ihrem Platz zuordnen Funktion
//                         -> catch: Error ungültiger Ort? Dann Meldung "Gib bitte einen gültigen Ort ein."
//                         -> catch: Error Server Probleme? Dann Meldung "Server Probleme. Wir arbeiten daran ..."
//                         -> finally: closeLoading Funktion
//     Function    -> Datenbasis wird ihrem Platz zugeordnet (Schritt 3)
//     Function    -> openLoading Funktion "Wait ..."
//     Function    -> closeLoading Function "Ready"

function openLoading() {
    console.log("Wait ...");
}

function closeLoading() {
    console.log("... complete.");
}

function addDataToPlace(data) {
    console.log(data);
}

function setWeatherData() {
    openLoading();
    getWeatherData()
        .then(data => addDataToPlace(data))
        .catch(err => console.log('Fehler:', err.message))
        .finally(closeLoading);
}

export default setWeatherData;