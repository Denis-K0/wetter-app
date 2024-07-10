import { DataPlacement, weatherData } from "./setWeatherData";

"use strict";

const SearchBar = {
    submitButton: document.getElementById('submitLocationBtn'),
    locationInput: document.getElementById('locationInput'),
    searchCityInputContainer: document.getElementById('searchCityInputContainer'),
    addEvents() {
        this.submitButton.addEventListener('click', () => {
            this.locationInput.focus();
            this.searchCityInputContainer.classList.add('active');
        });
        this.locationInput.addEventListener('keypress', (event) => {
            if (event.key === "Enter" || event.keyCode === 13) {
                const selectedLocation = this.locationInput.value;
                this.searchCityInputContainer.classList.remove('active');
                DataPlacement.setWeatherData(selectedLocation);
            }
        });
        this.locationInput.addEventListener('blur', () => {
            this.searchCityInputContainer.classList.remove('active')
            // If no input added, than set to default
            if (this.locationInput.value === '') this.locationInput.value = 'Das Wetter in ...';
        });
        this.locationInput.addEventListener('focus', () => {
            this.clearInputByFocus();
        });
    },
    clearInputByFocus() {
        this.locationInput.value = '';
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

        // Slider-Events
        this.list.addEventListener('mousedown', (e) => this.startDragging(e), false);
        this.list.addEventListener('mouseup', () => this.stopDragging(), false);
        this.list.addEventListener('mouseleave', () => this.stopDragging(), false);
        this.list.addEventListener('mousemove', (e) => this.handleDragging(e), false);

        // Slider-Events - Touch
        this.list.addEventListener('touchstart', (e) => this.startDragging(e), false);
        this.list.addEventListener('touchend', () => this.stopDragging(), false);
        this.list.addEventListener('touchmove', (e) => this.handleDragging(e), false);
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
    slider: {
        mouseDown: false,
        startX: null,
        scrollLeft: null,
    },
    startDragging(e) {
        this.slider.mouseDown = true;
        this.slider.startX = (e.pageX || e.touches[0].pageX) - this.list.offsetLeft; // Position Mouse relative to list position
        this.slider.scrollLeft = this.list.scrollLeft; // Actual scroll-position
    },
    stopDragging() {
        this.slider.mouseDown = false;
    },
    handleDragging(e) {
        e.preventDefault(); // Prevent the standard behavior 
        if (!this.slider.mouseDown) return; // Mouse not clicked? Finish.
        const x = (e.pageX || e.touches[0].pageX) - this.list.offsetLeft; // Position Mouse relative to list position
        const scroll = x - this.slider.startX; // Calculate scroll-distance
        this.list.scrollLeft = this.slider.scrollLeft - scroll; // The scrolling
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
        this.removeClasses();

        document.getElementById(`day0${day + 1}Btn`).classList.add('active');
    },
    removeClasses () {
        this.day01Btn.classList.remove('active');
        this.day02Btn.classList.remove('active');
        this.day03Btn.classList.remove('active');
    },
    handleActiveBtnByScreenSize () {
        const mediaQuery = window.matchMedia("(max-width: 800px), (max-height: 590px)");

        // Check if screen size match
        if (mediaQuery.matches) {
            this.removeClasses();
        } else {
            document.getElementById(`day0${ThreeDaysOverviewHeadline.checkDotsClasses()}Btn`)
            .classList.add('active');
        }

        // Reaction on screen changes
        mediaQuery.addEventListener('change', (e) => {
            if (e.matches) {
                this.removeClasses();
            } else {
                document.getElementById(`day0${ThreeDaysOverviewHeadline.checkDotsClasses()}Btn`)
                .classList.add('active');
            }
        });
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
        this.removeClasses();

        document.getElementById(`dot0${day + 1}`).classList.add('active');
    },
    removeClasses () {
        this.dot01.classList.remove('active');
        this.dot02.classList.remove('active');
        this.dot03.classList.remove('active');
    },
    checkDotsClasses() {
        if (this.dot01.classList.contains('active')) return 1;
        if (this.dot02.classList.contains('active')) return 2;
        if (this.dot03.classList.contains('active')) return 3;
    },
}

const ThreeDaysOverviewWindow = {
    threeDaysOverviewDay: document.getElementById('threeDaysOverviewDay'),
    closeWindowBtn: document.getElementById('closeWindowBtn'),
    searchCityInputContainer: document.getElementById('searchCityInputContainer'),
    touchStartX: 0,
    touchEndX: 0,
    minSwipeDistance: 50,
    touchStartTime: 0,
    maxClickDuration: 200,
    addSwipeEvents() {
        this.threeDaysOverviewDay.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
            this.touchStartTime = new Date().getTime();
        });
    
        this.threeDaysOverviewDay.addEventListener('touchmove', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
        });
    
        this.threeDaysOverviewDay.addEventListener('touchend', (e) => {
            const touchEndTime = new Date().getTime();
            const touchDuration = touchEndTime - this.touchStartTime;
            // Check if it was only a click
            if (touchDuration > this.maxClickDuration) this.handleSwipe();
        });
    },
    addEvent () {
        this.closeWindowBtn.addEventListener('click', () => {
            this.removeClasses();
        }, { once: true });
    },
    changeClasses () {
        this.threeDaysOverviewDay.classList.add('show', 'transition');
        this.closeWindowBtn.classList.add('show');
        this.searchCityInputContainer.classList.add('hide');

        this.addEvent();
    },
    removeClasses () {
        DayBtns.removeClasses();
        this.threeDaysOverviewDay.classList.remove('show');
        this.closeWindowBtn.classList.remove('show');
        this.searchCityInputContainer.classList.remove('hide');
    },
    handleSwipe() {
        const distance = this.touchEndX - this.touchStartX;

        if (Math.abs(distance) >= this.minSwipeDistance) {
            // Swiped left
            if (distance < 0) DataPlacement.changeDay(-1, 'arrow');
            // Swiped right
            if (distance > 0) DataPlacement.changeDay(1, 'arrow');
        }
    },
}

export { SearchBar, FullDayOverview, DayBtns, ThreeDaysOverviewHeadline, ThreeDaysOverviewWindow };