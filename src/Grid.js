import arrayEqual from 'array-equal';

export default class Grid {

    constructor([width, height]) {

        if(!Number.isInteger(width) || width < 1) {
            throw new Error("Grid width should be a number > 0");
        }

        if(!Number.isInteger(height) || height < 1) {
            throw new Error("Grid height should be a number > 0");
        }

        this._rovers = new Map();
        this._width = width;
        this._height = height;
    }

    get size() {
        return [this._width, this._height];
    }

    addRover(rover) {
        if(this.ensurePositionEmpty(rover.id, rover.position)) {
           this._rovers.set(rover.id, rover); 
        }
        else {
            throw new Error(`Unable to land rover as there is another rover in the space [${rover.position[0]}, ${rover.position[1]}]`);
        }
    }

    ensurePositionEmpty(roverId, nextPosition) {
        let positionAvailable = true;
        let [nextX, nextY] = [...nextPosition];

        // Checks that the rover is not straying outside the bounds of the grid
        if(nextX > this._width || nextX < 0 || nextY > this._height || nextY < 0) {
            console.warn(`Unable to move to [${nextX}, ${nextY}] as it is outside the bounds of the grid`);
            positionAvailable = false;

        }
        
        // Loops through each of the rovers on the grid to check that a position is empty
        this._rovers.forEach((rover, id) => {
            if(roverId != id) {
                if(arrayEqual(nextPosition, rover.position)) {
                    console.warn(`Unable to move to [${nextX}, ${nextY}] as there is another rover there`);
                    positionAvailable = false;
                }
            }
        });

        return positionAvailable;
    }
}