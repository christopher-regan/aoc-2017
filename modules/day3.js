const input = 312051;

// Generate the empty grid to hold the spiral
// Size is based on the square root of the input plus some headroom
let deathSpiral = new Array(600);

for (var index = 0; index < 600; index++) {
    deathSpiral[index] = new Array(600);
}

// Start in the middle
let x = 300, y = 300;
let num = 1;

let adjacent = new Map();
adjacent.set("below", (grid, x, y) => { return grid[x][--y] });
adjacent.set("above", (grid, x, y) => { return grid[x][++y] });
adjacent.set("left", (grid, x, y) => { return grid[--x][y] });
adjacent.set("right", (grid, x, y) => { return grid[++x][y] });
adjacent.set("belowRight", (grid, x, y) => { return grid[++x][--y] });
adjacent.set("belowLeft", (grid, x, y) => { return grid[--x][--y] });
adjacent.set("aboveRight", (grid, x, y) => { return grid[++x][++y] });
adjacent.set("aboveLeft", (grid, x, y) => { return grid[--x][++y] });

let getValue = function getValue (direction) {
    //#region Original
    // let checkX = x, checkY = y;
    // let value = 0;

    // switch (direction) {
    //     case "below":
    //         checkY = y - 1;
    //         break;
    //     case "above":
    //         checkY = y + 1;
    //         break;
    //     case "left":
    //         checkX = x - 1;
    //         break;
    //     case "right":
    //         checkX = x + 1;
    //         break;
    //     case "aboveleft":
    //         checkX = x - 1;
    //         checkY = y + 1;
    //         break;
    //     case "aboveright":
    //         checkX = x + 1;
    //         checkY = y + 1;
    //         break;
    //     case "belowleft":
    //         checkX = x - 1;
    //         checkY = y - 1;
    //         break;
    //     case "belowright":
    //         checkX = x + 1;
    //         checkY = y - 1;
    //         break;
    // }

    //return deathSpiral[checkX][checkY];
    //#endregion

    return adjacent.get(direction)(deathSpiral, x, y);
}

let isUndefined = function isUndefined (value) {
    return typeof value == 'undefined';
}

let move = function move() {
    //If no value above but there is a value to the left of the current position, move up
    if (!isUndefined(getValue("left")) && isUndefined(getValue("above"))) {
        y++;
    }
    //If there is a value below and no value to the left, move left
    else if (!isUndefined(getValue("below")) && isUndefined(getValue("left"))) {
        x--;
    }
    //If there is a value to the right and no value below, move down
    else if (!isUndefined(getValue("right")) && isUndefined(getValue("below"))) {
        y--;
    }
    //If there is a value to above, move right
    else if (!isUndefined(getValue("above"))) {
        x++;
    }
}

let generateSpiral = function generateSpiral(cellValue, exitCondition) {

    deathSpiral[x][y] = num;
    x++;
    deathSpiral[x][y] = cellValue();

    while (exitCondition) {
        move();
        deathSpiral[x][y] = cellValue();
    }
}

/*
 *  Part 1
 *      Calculate the "Manhattan" distance to a given cell in a spiral storage pattern
 *      Answer = 
 */

// Seed the spiral with the first two numbers

exports.star1 = function star1 () {
    generateSpiral(() => { return num++; }, () => { num < input; });
    return `${num} ${x} ${y} ${deathSpiral[x][y]}`;
};

/*  
 *   Part 2
 *      Sum elements of an array that are identical to the element halfway around the array.
 *      Answer = 1072    
 */
 let calculateNeighborSum = function () {
    return valueBelow() + valueAbove() + valueLeft() + valueRight() + valueBelowRight() + valueAboveRight() + valueBelowLeft() + valueAboveLeft();
}

exports.star2 = function star2 () {
    generateSpiral(() => { return calculateNeighborSum; }, () => { calculateNeighborSum() < input; });
    return `${num} ${x} ${y} ${deathSpiral[x][y]}`;
};