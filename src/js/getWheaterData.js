"use strict";

// Schritt 1 - Datenbasis:
//     Objekt      -> Bereitstellen des Ortes (default = Hamburg)
//     asyncFunc.  -> API Zugriff auf die Daten für die nächsten 3 Tage
//                     -> Tag 1/2/3:
//                         -> 6:00/12:00/18:00/00:00/Aktuell:
//                             -> Datum, Grad, Grad gefühlt, Niederschlagswarscheinlichkeit, Uhrzeit
//                 -> Error? Dann Meldung "Gib bitte einen gültigen Ort ein."
//     Funktion    -> Filtern der benötigten Daten und Rückgabe an Objekt
//     Objekt      -> Export der gesammelten Daten
    

let selectedLocation = "Hamburg";

const getWheaterData = async () => {
    
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=4576e37b3e004227b9191411240505&q=${selectedLocation}&days=3&aqi=no&alerts=no`);
    

}