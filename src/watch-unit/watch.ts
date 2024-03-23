export class Watch {
    el: HTMLElement;
    mode: Modes;
    addedHours: number;
    addedMinutes: number;
    lightState: boolean;
    timeZone: string;
    hour12: boolean;

    constructor(element: HTMLElement, timeZone: string) {
        this.el = element;
        this.mode = Modes.Uneditable;
        this.addedHours = 0;
        this.addedMinutes = 0;
        this.lightState = false;
        this.timeZone = timeZone;
        this.hour12 = false;
        setInterval(() => this.run(), 1000)
    }

    run() {
        var time = new Date();

        var options = { timeZone: this.timeZone};

        var time = new Date(time.toLocaleString('en-US', options));

        var hours = ((time.getHours() + this.addedHours) % (this.hour12? 12: 24)).toString();
        var minutes = ((time.getMinutes() + this.addedMinutes) % 60).toString();
        var seconds = time.getSeconds().toString();

        if (hours.length < 2) {
            hours = '0' + hours;
        }

        if (minutes.length < 2) {
            minutes = '0' + minutes;
        }

        if (seconds.length < 2) {
            seconds = '0' + seconds;
        }

        const amPmIndicator = this.hour12 ? ((time.getHours() + this.addedHours)%24 < 12 ? ' AM' : ' PM') : '';

        const clockStr = hours + ' : ' + minutes + ' : ' + seconds + amPmIndicator;

        this.el.textContent = clockStr;
    }

    changeMode() {
        if (this.mode == Modes.Uneditable) {
            this.mode = Modes.Hour;
        } else if (this.mode == Modes.Hour) {
            this.mode = Modes.Minutes;
        } else if (this.mode == Modes.Minutes) {
            this.mode = Modes.Uneditable;
        }
    }

    addTime() {
        if (this.mode == Modes.Hour) {
            this.addedHours = this.addedHours + 1;
        } else if (this.mode == Modes.Minutes) {
            this.addedMinutes = this.addedMinutes + 1;
        }

        this.run();
    }

    light() {
        this.lightState = !this.lightState;

        if (this.lightState) {
            this.el.style.backgroundColor = 'white';
            this.el.style.color = 'rgb(0, 158, 250)';
        } else {
            this.el.style.backgroundColor = 'black';
            this.el.style.color = 'lightgreen';
        }
    }

    reset() {
        this.addedHours = 0;
        this.addedMinutes = 0;
        this.run();
    }

    display() {
        this.hour12 = !this.hour12;
        this.run();
    }
}

enum Modes {
    Uneditable,
    Hour,
    Minutes
}
