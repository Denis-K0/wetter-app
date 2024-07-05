import "./style/style.css";
import setWeatherData from "./js/setWeatherData";
import { SearchBar, FullDayOverview } from "./js/ui";

"use strict";


setWeatherData();
SearchBar.addEvents();
FullDayOverview.start();