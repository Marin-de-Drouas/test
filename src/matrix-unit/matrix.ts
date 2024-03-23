import { Vector } from "./vector";

export class Matrix {
    elements: number[][];
    det: number;

    constructor(elements: number[][]) {
        this.elements = elements;
        this.det = this.determinant();
    }

    determinant(): number {
        const [[a, b, c], [d, e, f], [g, h, i]] = this.elements;
        return a * e * i + b * f * g + c * d * h - c * e * g - b * d * i - a * f * h;
    }

    inverse(): Matrix {
        const det = this.det;
        if (det === 0) {
            throw new Error('Matrix is not invertible');
        }
        const invDet = 1 / det;
        const [[a, b, c], [d, e, f], [g, h, i]] = this.elements;
        return new Matrix([
            [e * i - f * h, c * h - b * i, b * f - c * e],
            [f * g - d * i, a * i - c * g, c * d - a * f],
            [d * h - e * g, b * g - a * h, a * e - b * d]
        ]).scale(invDet);
    }

    scale(scalar: number): Matrix {
        return new Matrix(this.elements.map(row => row.map(x => x * scalar)));
    }

    multiplyMatrix(mat: Matrix): Matrix {
        const [[a, b, c], [d, e, f], [g, h, i]] = this.elements;
        const [[j, k, l], [m, n, o], [p, q, r]] = mat.elements;
        return new Matrix([
            [a * j + b * m + c * p, a * k + b * n + c * q, a * l + b * o + c * r],
            [d * j + e * m + f * p, d * k + e * n + f * q, d * l + e * o + f * r],
            [g * j + h * m + i * p, g * k + h * n + i * q, g * l + h * o + i * r]
        ]);
    }

    static translationMatrix(vector:Vector): Matrix {
        return new Matrix([
            [1, 0, vector.x],
            [0, 1, vector.y],
            [0, 0, 1]
        ]);
    }

    static rotationMatrix(angle: number): Matrix {
        const cosTheta = Math.cos(angle);
        const sinTheta = Math.sin(angle);
        return new Matrix([
            [cosTheta, -sinTheta, 0],
            [sinTheta, cosTheta, 0],
            [0, 0, 1]
        ]);
    }

    static scalingMatrix(sx: number, sy: number): Matrix {
        return new Matrix([
            [sx, 0, 0],
            [0, sy, 0],
            [0, 0, 1]
        ]);
    }
}