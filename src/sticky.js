'use strict';
class Sticky {
    constructor(element, options) {
        this.element = element;
        this.options = {
            start: null,
            end: null,
            stickTo: 'top',
            movePosition: 0,
            moveStart: 0,
            moveEnd: 0,
            classStart: 'sticky-start',
            classEnd: 'sticky-end',
            ...options
        };
        this.init();
    }

    init() {
        this.setStateElement();
        this.addEventScroll();
        this.actionScroll();
    }

    setStateElement() {
        if (!this.stateElement) {
            this.stateElement = {
                axisX: this.element.getBoundingClientRect().x,
                width: this.element.getBoundingClientRect().width,
                ratioWidthParentVsSticky: (this.element.parentElement.offsetWidth / this.element.getBoundingClientRect().width)
            };
        } else {
            this.stateElement.axisX = this.element.parentElement.getBoundingClientRect().x * this.stateElement.ratioWidthParentVsSticky;
            this.stateElement.width = (this.element.parentElement.offsetWidth * this.stateElement.ratioWidthParentVsSticky);
        }
    }

    addEventScroll() {
        document.addEventListener('scroll', () => this.actionScroll());
        window.addEventListener('resize', () => this.actionResize());
    }

    actionScroll() {
        this.startReload();
        this.endReload();
        this.addInlineStyle();
    }

    actionResize() {
        this.setStateElement();
        this.actionScroll();
    }

    addInlineStyle() {
        if (this.startActive) {
            this.addStyle({
                width: this.stateElement.width,
                axioX: this.options.movePosition,
                axioY: this.stateElement.axisX
            })
            if (this.endActive) {
                let axisY = document.getElementById(this.options.end).getBoundingClientRect().y;
                const windowCoordinates = this.getWindowCoordinates();

                // add element height
                if (this.options.stickTo === 'bottom') {
                    axisY = (axisY - windowCoordinates.windowHeight);
                    this.element.style.marginBottom = axisY*(-1) + 'px';
                } else {
                    axisY = (axisY - this.element.getBoundingClientRect().height);
                    axisY = axisY - this.options.movePosition;
                    this.element.style.marginTop = axisY + 'px';
                }
            } else {
                if (this.options.stickTo === 'bottom') {
                    this.element.style.marginBottom = 0 + 'px';
                } else {
                    this.element.style.marginTop = 0 + 'px';
                }
            }
        } else {
            this.element.removeAttribute('style');
        }
    }

    getWindowCoordinates() {
        return {
            pageXOffset: window.pageXOffset,
            pageYOffset: window.pageYOffset,
            windowWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            windowHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
            documnetHeight: document.documentElement.scrollHeight
        }
    }

    getElementOffsetHeight() {
        return this.options.offsetHeight ? this.element.offsetHeight : 0;
    }

    startReload() {
        let axisY = document.getElementById(this.options.start).getBoundingClientRect().y;
        const windowCoordinates = this.getWindowCoordinates();

        // move position
        axisY = axisY - this.options.movePosition;
        console.log(this.options.moveStart);

        if (this.options.stickTo === 'bottom') {
            // add element height
            axisY = axisY + this.element.getBoundingClientRect().height;
            // add window height
            axisY = axisY - windowCoordinates.windowHeight;
        }

        if (axisY <= 0) {
            this.element.classList.add(this.options.classStart);
            this.startActive = true;
        } else {
            this.element.classList.remove(this.options.classStart);
            this.startActive = false;
        }
    }

    endReload() {
        if (!this.startActive) {
            return;
        }

        const elementCoordinates = document.getElementById(this.options.end).getBoundingClientRect();
        const windowCoordinates = this.getWindowCoordinates();
        let axisY = elementCoordinates.y;

        axisY = axisY - this.options.movePosition;

        if (this.options.stickTo === 'bottom') {
            // add window height
            axisY = axisY - windowCoordinates.windowHeight;
        } else {
            // add element height
            axisY = axisY - this.element.getBoundingClientRect().height;
            // moveTop
            axisY = axisY + this.options.moveStart;
        }

        if (axisY <= 0) {
            this.element.classList.add(this.options.classEnd);
            this.endActive = true;
        } else {
            this.element.classList.remove(this.options.classEnd);
            this.endActive = false;
        }
    }

    addStyle({width, axioX, axioY}) {
        if (this.options.stickTo === 'bottom') {
            this.element.style.cssText = `width: ${width}px; position: fixed; bottom: ${axioX}px; margin-left: 0px; margin-bottom: 0px; left: ${axioY}px;`;
            return;
        }
        this.element.style.cssText = `width: ${width}px; position: fixed; top: ${axioX}px; margin-left: 0px; margin-top: 0px; left: ${axioY}px;`;
    }
}