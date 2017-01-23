import Rover from './Rover';
import Grid from './Grid';

const outputTmpl = (name, output) => `${name} - Location: [${output.positionX}, ${output.positionY}]  Direction: ${output.direction} degrees`;

var createRover = function(position, direction, grid) {
    try {
        let rover = new Rover({position: [1, 3], direction: 0, grid: grid});
        grid.addRover(rover);

        return rover;
    }
    catch(e) {
        console.log('Unable to create rover.');
        console.log(e.message);
    }
};

var launchRover = function(rover, sequence) {
    try {
        console.log('Attempting to move rover.');
        let output = rover.go(sequence);
        console.log(outputTmpl('Rover', output));
    }
    catch(e) {
        console.log(e.message);
        console.log(`Failure: Rover has stopped unexpectedly at ${rover.position}!`);
    }
    finally {
        console.log('Finished');
    }
};

let grid = new Grid([10, 7]);

/*---------------------------------------------------------------------------------------------------------------*/
/* Configure and launch rover from here
/*---------------------------------------------------------------------------------------------------------------*/
let rover1 = createRover([1, 3], 0, grid);

if(rover1) {
    launchRover(rover1, 'UUULUUUUUU');
}

let rover2 = createRover({position: [2, 2], direction: 90, grid});

if(rover2) {
    launchRover(rover2, 'UULLLDDDD');
}

let rover3 = createRover({position: [5, 9], direction: -90, grid});

if(rover3) {
    launchRover(rover3, 'DDDDRDRDDRUUUUUUUU');
}


            
/*let [positionX, positionY, direction] = 

// TODO: Smarten this up

console.log(`Position X: ${positionX}`);
console.log(`Position Y: ${positionY}`);
console.log(`Direction: ${direction}`);

let rover2 = new Rover({position: [2, 2], direction: 90, grid: grid});
grid.addRover(rover2);

[positionX, positionY, direction] = rover2.go('UULLLDDDD');

console.log(`Position X: ${positionX}`);
console.log(`Position Y: ${positionY}`);
console.log(`Direction: ${direction}`);

let rover3 = new Rover({position: [5, 9], direction: 270, grid: grid});
grid.addRover(rover3);

[positionX, positionY, direction] = rover3.go('DDDDRDRDDRUUUUUUUU');

console.log(`Position X: ${positionX}`);
console.log(`Position Y: ${positionY}`);
console.log(`Direction: ${direction}`);*/


//console.log(a.getValue())     