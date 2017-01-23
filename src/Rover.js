import uuid from 'node-uuid';
import Grid from './Grid';

const VALID_DIRECTIONS = [0, 90, 180, 270, -90];

export default class Rover {
    constructor({position, direction, grid}) {

        if(!Array.isArray(position)) {
            throw new Error('Position should be specified in the format [x, y]');
        }

        if(![...position].every(axis => Number.isInteger(axis))) {
            throw new Error('Position array parameters should be integers');
        }

        if(!Number.isInteger(direction) || !VALID_DIRECTIONS.includes(direction)) {
            throw new Error(`Direction should be either ${VALID_DIRECTIONS.join(', ')} `);
        }

        if(typeof grid == 'undefined' || !(grid instanceof Grid)) {
            throw new Error('Object passed as grid is not valid');
        }

        if(!Array.isArray(grid.size)) {
            throw new Error('Grid size should be specified in the format [x, y]');
        }

        if(![...position.every(axis => Number.isInteger(axis))]) {
            throw new Error('Position parameters should be integers');
        }

        if(![...grid.size].every(axis => Number.isInteger(axis))) {
            throw new Error('Grid axis parameters should be integers');
        }

        if(position[0] > grid.size[0] || position[1] > grid.size[1]) {
            throw new Error('Unable to land rover as grid is too small');
        }

        this._id = uuid.v4();
        [this._currentX, this._currentY] = [...position];
        [this._gridWidth, this._gridHeight] = [...grid.size]; 

        if(direction == -90) {
            direction = 270;
        }
 
        this._currentDirection = direction;
        this._grid = grid;
    }   

    get id() {
        return this._id;
    }

    get position() {
        return [this._currentX, this._currentY];
    }

    get direction() {
        return this._currentDirection;
    }

    left() {
        this._currentDirection = this._currentDirection === 0 ? 270 : this._currentDirection - 90;
    }

    right() {   
        this._currentDirection = this._currentDirection === 270 ? 0 : this._currentDirection + 90;
    }   

    up() {
        let nextPosition;

        switch(this._currentDirection) {
            case 0 :
                nextPosition = [this._currentX, this._currentY + 1];
                break;
            case 90 :
                nextPosition = [this._currentX + 1, this._currentY];
                break;
            case 180 : 
                nextPosition = [this._currentX, this._currentY - 1];
                break;
            case 270 : 
                nextPosition = [this._currentX - 1, this._currentY];
                break;
        }

        this.attemptMove(nextPosition);
    }

    down() {
        let nextPosition;

        switch(this._currentDirection) {
            case 0 :
                nextPosition = [this._currentX, this._currentY - 1];
                break;
            case 90 :
                nextPosition = [this._currentX - 1, this._currentY];
                break;
            case 180 : 
                nextPosition = [this._currentX, this._currentY + 1];
                break;
            case 270 : 
                nextPosition = [this._currentX + 1, this._currentY];
                break;
        }

        this.attemptMove(nextPosition);
    }

    attemptMove(nextPosition) {
        if(this._grid.ensurePositionEmpty(this.id, nextPosition)) {
            [this._currentX, this._currentY] = [...nextPosition];
        }
    }

    go(sequence) {
        if(/[^RUDL]+/.test(sequence)) {
            throw new Error(`Unhandled character in move sequence: ${sequence}`);
        }

        [...sequence].forEach(move => {
            switch(move) {
                case 'U' :
                    this.up();
                    break;
                case 'R' :
                    this.right();
                    break;
                case 'D' : 
                    this.down();
                    break;
                case 'L' : 
                    this.left();
                    break;
                default :
                    throw new Error(`Unhandled character in direction sequence: ${move}`);
            }
        });

        return {positionX: this._currentX, positionY: this._currentY, direction: this._currentDirection};
    }
}