import "./style/style.css";
import { DataPlacement } from "./js/setWeatherData";
import { SearchBar, FullDayOverview, DayBtns, ThreeDaysOverviewHeadline, ThreeDaysOverviewWindow } from "./js/ui";

"use strict";


DataPlacement.setWeatherData();
SearchBar.addEvents();
ThreeDaysOverviewWindow.addSwipeEvents();
FullDayOverview.start();
DayBtns.addEvents();
DayBtns.handleActiveBtnByScreenSize();
ThreeDaysOverviewHeadline.addEvents();

