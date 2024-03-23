import './index.css';
import { Watch, Matrix, Vector} from './example-unit';

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

function createWatch(watchNumber:number) {

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

function transformElement(element: HTMLElement, rotationPoint: { x: number, y: number }, rotationAngle: number, scaleFactor: number, distance: number = 100) {

    const rotationMatrix = Matrix.rotationMatrix(rotationAngle);
    
    const scalingMatrix = Matrix.scalingMatrix(scaleFactor, scaleFactor);
    
    const v1 = new Vector(-rotationPoint.x, -rotationPoint.y);
    const v2 = new Vector(rotationPoint.x, rotationPoint.y);
    const translationMatrix1 = Matrix.translationMatrix(v1);
    const rotationMatrix2 = Matrix.rotationMatrix(rotationAngle);
    const translationMatrix2 = Matrix.translationMatrix(v2);
    const combinedMatrix = translationMatrix2.multiplyMatrix(rotationMatrix2.multiplyMatrix(translationMatrix1));
    
    const finalMatrix:Matrix = new Matrix([
        [scalingMatrix.elements[0][0], rotationMatrix.elements[0][1], combinedMatrix.elements[0][2]],
        [rotationMatrix.elements[1][0], scalingMatrix.elements[1][1], combinedMatrix.elements[1][2]],
        [0, 0, 1]
    ]);
    
    applyTransformation(element, finalMatrix);
}

function applyTransformation(element: HTMLElement, matrix: Matrix) {
    const transformString = `matrix(${matrix.elements[0][0]}, ${matrix.elements[1][0]}, ${matrix.elements[0][1]}, ${matrix.elements[1][1]}, ${matrix.elements[0][2]}, ${matrix.elements[1][2]})`;
    element.style.transform = transformString;
}

function updateAnimation(){
    var Watches = document.getElementsByClassName('watchContainer');

    const rotationAngle = (Date.now() / 10000) % (2 * Math.PI);
    const scalingFactor = 1 + Math.sin(Date.now() / 1000) * 0.05;

    for (var i = 0; i < Watches.length; i++) {
        transformElement(Watches[i] as HTMLElement, rotationPoint, rotationAngle + i* 10, scalingFactor);
    }
}

setInterval(updateAnimation, 16);