import "./style/style.css";
import { DataPlacement } from "./js/setWeatherData";
import { SearchBar, FullDayOverview, DayBtns, ThreeDaysOverviewHeadline } from "./js/ui";

"use strict";


DataPlacement.setWeatherData();
SearchBar.addEvents();
FullDayOverview.start();
DayBtns.addEvents();
DayBtns.handleActiveBtnByScreenSize();
ThreeDaysOverviewHeadline.addEvents();

