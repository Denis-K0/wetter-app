import "./style/style.css";
import setWeatherData from "./js/setWeatherData";

"use strict";

setWeatherData();

/* 
Schritt 1 - Datenbasis:
    Objekt      -> Bereitstellen des Ortes (default = Hamburg)
    asyncFunc.  -> API Zugriff auf die Daten für die nächsten 3 Tage
                    -> Tag 1/2/3:
                        -> 6:00/12:00/18:00/00:00/Aktuell:
                            -> Datum, Grad, Grad gefühlt, Niederschlagswarscheinlichkeit, Uhrzeit
                    -> if:
                        -> throw: Error ungültiger Ort?
                        -> throw: Error Server Probleme?
                    -> return -> Export der Daten

Schritt 2 - Logik:
    Function    -> Starte App Logik
                    -> openLoading Funktion
                    -> Datenzugriff asynchrone Funktion:
                    
                        -> then: Datenbasis ihrem Platz zuordnen Funktion
                        -> catch: Error ungültiger Ort? Dann Meldung "Gib bitte einen gültigen Ort ein."
                        -> catch: Error Server Probleme? Dann Meldung "Server Probleme. Wir arbeiten daran ..."
                        -> finally: closeLoading Funktion
    Function    -> Datenbasis wird ihrem Platz zugeordnet (Schritt 3)
    Function    -> openLoading Funktion "Wait ..."
    Function    -> closeLoading Function "Ready"

Schritt 3 - Design:
    HTML        -> Input ändert Ort + Button der die App erneut startet
    Function    -> Klick auf Button: Speicherung des Inputs im Objekt für den Ort, dann start.
    HTML/Func.  -> Error Message als Modulo (ändern in Schritt 1)
    HTML/Func.  -> Ersetzen der Functionen Loading durch das Öffnen eines Modulo mit Ladebalken.
    HTML        -> 3x4 Divs untereinander für Wetter Heute, Morgen und Übermorgen mit jeweils Morgens, Mittags, Abends und Nachts.
                    -> Jeder Reihe ein Header mit Datum + Heute/Morge...
                    -> Die einzelnen Divs in 4 Teile
                        -> Tageszeit
                        -> Wetter Icon
                        -> Grad / Grad gefühlt
                        -> Niederschlagswarscheinlichkeit
    HTML        -> Div für aktuelles Wetter mit aktueller Uhrzeit.
    Function    -> Wetter Icon ändert sich jedesmal nach Änderung der Daten entsprechend dieser Daten.
    
*/