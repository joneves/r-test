import Rover from './Rover';
import Grid from './Grid';

let grid = new Grid([10, 7]);

let rover1 = new Rover({position: [1, 3], direction: 0, grid: grid});
grid.addRover(rover1);
            
let [positionX, positionY, direction] = rover1.go('UUULUUUUUU');

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

let rover3 = new Rover({position: [9, 9], direction: 270, grid: grid});
grid.addRover(rover3);

[positionX, positionY, direction] = rover3.go('DDDDRDRDDRUUUUUUUU');

console.log(`Position X: ${positionX}`);
console.log(`Position Y: ${positionY}`);
console.log(`Direction: ${direction}`);


//console.log(a.getValue())     