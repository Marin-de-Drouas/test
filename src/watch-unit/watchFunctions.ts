import{Watch} from './watch';

export function createWatch(watchNumber:number) {

    const timeZoneElement = document.getElementById('timeZone') as HTMLInputElement;
    const timeZone = timeZoneElement.value;

    const watchesContainer = document.getElementById('watchesContainer');

    const watchContainer = document.createElement('div');
    watchContainer.id = 'watchContainer' + watchNumber;
    watchContainer.className = 'watchContainer';
    watchesContainer.appendChild(watchContainer);

    const title = document.createElement('h1');
    title.id = 'title' + watchNumber;
    title.className = 'title';
    title.textContent = timeZone;
    watchContainer.appendChild(title);

    const watchElement = document.createElement('h1');
    watchElement.id = 'watch' + watchNumber;
    watchElement.className = 'watch';
    watchContainer.appendChild(watchElement);

    var watch = new Watch(watchElement, timeZone);

    const modeButton = document.createElement('button');
    modeButton.textContent = 'Mode';
    modeButton.className = 'modeButton';
    watchContainer.appendChild(modeButton);

    const increaseButton = document.createElement('button');
    increaseButton.textContent = 'Increase';
    increaseButton.className = 'increaseButton';
    watchContainer.appendChild(increaseButton);

    const lightButton = document.createElement('button');
    lightButton.textContent = 'Light';
    lightButton.className = 'lightButton';
    watchContainer.appendChild(lightButton);

    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.className = 'resetButton';
    watchContainer.appendChild(resetButton);

    const displayButton = document.createElement('button');
    displayButton.textContent = 'Display';
    displayButton.className = 'DisplayButton';
    watchContainer.appendChild(displayButton);

    modeButton.addEventListener("click", () => {
        watch.changeMode();
    });

    increaseButton.addEventListener("click", () => {
        watch.addTime();
    });

    lightButton.addEventListener("click", () => {
        watch.light();
    });

    resetButton.addEventListener("click", () => {
        watch.reset();
    });

    displayButton.addEventListener("click", () => {
       watch.display();
    });
}