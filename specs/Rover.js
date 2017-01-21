import {expect} from 'chai';
import Rover from '../src/Rover';
import Grid from '../src/Grid';

describe('Rover', function() {  
    describe('When initialised with invalid params', function() {
        it('Should throw an error if the position is not valid', function() {
            expect(() => new Rover({})).to.throw('Position should be specified in the format [x, y]');
            expect(() => new Rover({position: 12})).to.throw('Position should be specified in the format [x, y]');
            expect(() => new Rover({position: ['d', 12]})).to.throw('Position array parameters should be integers');
        });

        it('Should throw an error if the direction is not valid', function() {
            expect(() => new Rover({position: [4, 4]})).to.throw('Direction should be either 0, 90, 180, 270');
        });

        it('Should throw an error if grid size is not valid', function() {
            expect(() => new Rover({position: [4, 4], direction: 0})).
                to.throw('Object passed as grid is not valid');
        });

        it('Should throw an error if the start coords are outside of the grid bounds', function() {
            expect(() => new Rover({position: [4, 4], direction: 0, grid: new Grid([2, 2])})).
                to.throw('Unable to land rover as grid is too small');
            
        });
    });

    describe('When initialised with valid params', function() {
        let rover, grid;

        before(function() {
            grid = new Grid([5, 5]);
            rover = new Rover({position: [2, 3], direction: 0, grid});
            grid.addRover(rover);
        });

        it('Should have a the correct position and direction', function() {
            expect(rover.position).to.eql([2, 3]);
            expect(rover.direction).to.equal(0);
        }); 

        describe('And given invalid sequence parameters', function() {
            const sequence = 'UUUP';

            it('Should throw an error', function() {
                expect(() => { rover.go(sequence); }).to.throw(`Unhandled character in move sequence: ${sequence}`);
            });
        });

        describe('And given a valid sequence', function() {
            it('Should move forward when given the direction \'U\'', function() {
                rover.go('U');
                expect(rover.position).to.eql([2, 4]);
            });

            it('Should move backward when given the direction \'D\'', function() {
                rover.go('D');
                expect(rover.position).to.eql([2, 3]);
            });

            it('Should rotate right when given the direction \'R\'', function() {
                rover.go('R');
                expect(rover.position).to.eql([2, 3]);
                expect(rover.direction).to.equal(90);
            });

            it('Should rotate left when given the direction \'L\'', function() {
                rover.go('L');
                expect(rover.position).to.eql([2, 3]);
                expect(rover.direction).to.equal(0);
            });

            it('Should move in the direction it is facing after turning', function() {
                rover.go('RRU');
                expect(rover.position).to.eql([2, 2]);
                expect(rover.direction).to.equal(180);
            });

            it('Should not move off the grid', function() {
                rover.go('UUUUUUUU');
                expect(rover.position).to.eql([2, 0]);

            });

            it('Should not allow a rover to be added to a space occupied by another rover', function() {
                let position = [2, 0];
                expect(() => { grid.addRover(new Rover({position, direction: 90, grid})); }).
                    to.throw(`Unable to land rover as there is another rover in the space [${position[0]}, ${position[1]}]`);
            });

            it('Should not move into a space occupied by another rover', function() {
                let rover2 = new Rover({position: [1, 0], direction: 90, grid});
                grid.addRover(rover2);
                rover2.go('U');

                expect(rover2.position).to.eql([1, 0]);        
            });
        });
    });
});