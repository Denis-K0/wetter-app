import "./style/style.css";
import setWeatherData from "./js/setWeatherData";
import setLocation from "./js/setLocation";

"use strict";


setWeatherData();
setLocation();

const btnLeft = document.getElementById('swipeLeftFullDayOverviewBtn');
const btnRight = document.getElementById('swipeRightFullDayOverviewBtn');

btnLeft.addEventListener('click', function() {
    handleClick('previous');
});
btnRight.addEventListener('click', function() {
    handleClick('next');
});


const list = document.getElementById('fullDayOverviewList');

// Get the width to scroll
const item = document.querySelector(".hour");
const itemWidth = item.offsetWidth;

function handleClick(direction) {
  if(direction === "previous") {
    list.scrollBy({ left: -itemWidth, behavior: "smooth" });
  } else {
    list.scrollBy({ left: itemWidth, behavior: "smooth" });
  }
};