import { Matrix } from './matrix';
import { Vector } from './vector';

export function transformElement(element: HTMLElement, rotationPoint: { x: number, y: number }, rotationAngle: number, scaleFactor: number, distance: number = 100) {

    const rotationMatrix = Matrix.rotationMatrix(rotationAngle);
    
    const scalingMatrix = Matrix.scalingMatrix(scaleFactor, scaleFactor);
    
    const v1 = new Vector(-250, -250);
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