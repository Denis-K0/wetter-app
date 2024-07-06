import { DataPlacement, weatherData } from "./setWeatherData";

"use strict";

const SearchBar = {
    submitButton: document.getElementById('submitLocationBtn'),
    locationInput: document.getElementById('locationInput'),
    addEvents() {
        this.submitButton.addEventListener('click', () => {
            const selectedLocation = this.locationInput.value;
            DataPlacement.setWeatherData(selectedLocation);
        });
        this.locationInput.addEventListener('keypress', (event) => {
            if (event.key === "Enter" || event.keyCode === 13) {
                const selectedLocation = this.locationInput.value;
                DataPlacement.setWeatherData(selectedLocation);
            }
        });
    },
}

const FullDayOverview = {
    leftBtn: document.getElementById('swipeLeftFullDayOverviewBtn'),
    rightBtn: document.getElementById('swipeRightFullDayOverviewBtn'),
    itemWidth: document.querySelector(".hour").offsetWidth,
    list: document.getElementById('fullDayOverviewList'),
    listItems: document.querySelectorAll('.hour'),
    centeredElement: null,
    start() {
        this.addEvents();
        this.setCenteredViewPosition();
    },
    setCenteredViewPosition() {
        // Calculate the middle of the list
        const listWidth = this.list.scrollWidth;
        const middlePosition = listWidth / 2;

        // Scroll to the middle of the list
        this.list.scrollTo({
            left: middlePosition - (this.list.clientWidth / 2) + (this.list.clientWidth / 30),
            behavior: "smooth"
        });
    },
    getCenteredElement() {
        // Calculate middle position of visible area
        const middlePosition = FullDayOverview.list.scrollLeft + 
                            (FullDayOverview.list.clientWidth / 2);
    
        // Find the element in the middle Position of the visible area
        let centeredElement = null;
    
        FullDayOverview.listItems.forEach(item => {
            const itemLeft = item.offsetLeft;
            const itemWidth = item.offsetWidth;
            const itemRight = itemLeft + itemWidth;
    
            // Check the distance of item to the middle position
            if (itemLeft <= middlePosition && itemRight >= middlePosition) {
                centeredElement = item;
            }
        });
    
        return centeredElement;
            
    },
    addEvents() {
        this.leftBtn.addEventListener('click', function() {
            FullDayOverview.handleClick('previous');
        });
        this.rightBtn.addEventListener('click', function() {
            FullDayOverview.handleClick('next');
        });

    },
    addScrollEvent() {
        FullDayOverview.list.removeEventListener('scroll', FullDayOverview.addClassCenteredElement);
        FullDayOverview.list.addEventListener('scroll', FullDayOverview.addClassCenteredElement);
    },
    addClassCenteredElement(event, firstStart = false) {
        const centeredElement = FullDayOverview.getCenteredElement();

        // Prevent multiple execution
        if (centeredElement === FullDayOverview.centeredElement && !firstStart) return;
        FullDayOverview.centeredElement = centeredElement;
        
        // Check if the item was spotted (and not the gap between items)
        if (!centeredElement) return;
        
        // Remove all 'show' classes from all children
        FullDayOverview.listItems.forEach(child => {
            child.classList.remove('show')
        });

        // Add the 'show' class for highlighting the Element
        centeredElement.classList.add('show');



        // Show the Conditions of the centered Element
        DataPlacement.setConditions(centeredElement);
    },
    handleClick(direction) {
        if(direction === "previous") {
          this.list.scrollBy({ left: -this.itemWidth, behavior: "smooth" });
        } else {
          this.list.scrollBy({ left: this.itemWidth, behavior: "smooth" });
        }
    },
};

const DayBtns = {
    day01Btn: document.getElementById('day01Btn'),
    day02Btn: document.getElementById('day02Btn'),
    day03Btn: document.getElementById('day03Btn'),
    addEvents() {
        this.day01Btn.addEventListener('click', () => {
            DataPlacement.changeDay(0);
        });
        this.day02Btn.addEventListener('click', () => {
            DataPlacement.changeDay(1);
        });
        this.day03Btn.addEventListener('click', () => {
            DataPlacement.changeDay(2);
        });
    },
    changeClass (day) {
        this.day01Btn.classList.remove('active');
        this.day02Btn.classList.remove('active');
        this.day03Btn.classList.remove('active');

        document.getElementById(`day0${day + 1}Btn`).classList.add('active');
    }
};

const ThreeDaysOverviewHeadline = {
    arrowLeft: document.getElementById('arrowLeft'),
    arrowRight: document.getElementById('arrowRight'),
    dot01: document.getElementById('dot01'),
    dot02: document.getElementById('dot02'),
    dot03: document.getElementById('dot03'),
    addEvents () {
        this.arrowLeft.addEventListener('click', () => {
            DataPlacement.changeDay(-1, 'arrow');
        });
        this.arrowRight.addEventListener('click', () => {
            DataPlacement.changeDay(1, 'arrow');
        });
    },
    changeDotClass (day) {
        this.dot01.classList.remove('active');
        this.dot02.classList.remove('active');
        this.dot03.classList.remove('active');

        document.getElementById(`dot0${day + 1}`).classList.add('active');
    },
}

export { SearchBar, FullDayOverview, DayBtns, ThreeDaysOverviewHeadline };