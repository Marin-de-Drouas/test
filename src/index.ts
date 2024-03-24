import './index.css';
import { createWatch } from './watch-unit';
import { transformElement } from './animation-unit';
import { createSelectWithOptions } from './watch-unit';

var watchNumber = 0;
var rotationPoint = {x: 200, y: 300};
const newWatchButton = document.getElementById('newWatchButton');

newWatchButton.addEventListener("click", () => {
    watchNumber++;
    const pointX = document.getElementById('x') as  HTMLInputElement;
    const pointY = document.getElementById('y') as HTMLInputElement;
    rotationPoint = {x: parseInt(pointX.value), y: parseInt(pointY.value)};
    createWatch(watchNumber);
});

const menu = document.getElementById('menu');
menu.appendChild(createSelectWithOptions());

function updateAnimation(){
    var Watches = document.getElementsByClassName('watchContainer');

    const rotationAngle = (Date.now() / 10000) % (2 * Math.PI);
    const scalingFactor = 1 + Math.sin(Date.now() / 1000) * 0.05;

    for (var i = 0; i < Watches.length; i++) {
        transformElement(Watches[i] as HTMLElement, rotationPoint, rotationAngle + i* 10, scalingFactor);
    }
}

setInterval(updateAnimation, 16);