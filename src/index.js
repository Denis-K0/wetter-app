import "./style/style.css";
import setWeatherData from "./js/setWeatherData";
import setLocation from "./js/setLocation";

"use strict";


setWeatherData();
setLocation();

/* 
Schritt 1 - Datenbasis:
X    Objekt      -> Bereitstellen des Ortes (default = Hamburg)
X    asyncFunc.  -> API Zugriff auf die Daten für die nächsten 3 Tage
X                    -> Tag 1/2/3:
X                        -> 6:00/12:00/18:00/00:00/Aktuell:
X                            -> Datum, Grad, Grad gefühlt, Niederschlagswarscheinlichkeit, Uhrzeit
X                    -> if:
X                        -> throw: Error ungültiger Ort?
X                        -> throw: Error Server Probleme?
X                    -> return -> Export der Daten

Schritt 2 - Logik:
X    Function    -> Starte App Logik
X                    -> openLoading Funktion
X                    -> Datenzugriff asynchrone Funktion:
X                        -> then: Datenbasis ihrem Platz zuordnen Funktion
X                        -> catch: Error ungültiger Ort? Dann Meldung "Gib bitte einen gültigen Ort ein."
X                        -> catch: Error Server Probleme? Dann Meldung "Server Probleme. Wir arbeiten daran ..."
X                        -> finally: closeLoading Funktion
X    Function    -> Datenbasis wird ihrem Platz zugeordnet (Schritt 3)
X    Function    -> openLoading Funktion "Wait ..."
X    Function    -> closeLoading Function "Ready"

Schritt 3 - Design:
X    HTML        -> Input ändert Ort + Button der die App erneut startet
X    Function    -> Klick auf Button: Speicherung des Inputs im Objekt für den Ort, dann start.
X   HTML/Func.  -> Error Message als Modulo (ändern in Schritt 1)
X    HTML/Func.  -> Ersetzen der Functionen Loading durch das Öffnen eines Modulo mit Ladebalken.
X    HTML        -> 3x4 Divs untereinander für Wetter Heute, Morgen und Übermorgen mit jeweils Morgens, Mittags, Abends und Nachts.
X                    -> Jeder Reihe ein Header mit Datum + Heute/Morge...
X                    -> Die einzelnen Divs in 4 Teile
X                        -> Tageszeit
X                        -> Wetter Icon
X                        -> Grad / Grad gefühlt
X                        -> Niederschlagswarscheinlichkeit
X    HTML        -> Div für aktuelles Wetter mit aktueller Uhrzeit.
X    Function    -> Wetter Icon ändert sich jedesmal nach Änderung der Daten entsprechend dieser Daten.
    
*/