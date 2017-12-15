const test = "flqrgnkx";
const raw = "xlqgujun";

let pos = 0, skip = 0;

let resetList = function resetList (list) {
    for (let x = 0; x < 256; x++) {
        list[x] = x;
    }
}

let calculateHash = function calculateHash (byteArray, iterations = 64) {
    let list = new Array(256);

    pos = 0;
    skip = 0;

    resetList(list);

    for (let x = 0; x < iterations; x++) {
        list = knotHash(list, byteArray);
    }

    return convertToHex(list);
};

let knotHash = function knotHash(array, input) {
    let rebased = [];
    let shift = 0;

    input.forEach((val, index) => {

        // Shift target segment to the front of the array
        shift = array.length - pos;

        rebased = array.slice(0, pos);
        rebased.unshift(...array.slice(pos));

        // Reverse the elements in the target segment
        rebased = rebased.slice(0, val)
                         .reverse()
                         .concat(rebased.slice(val));

        array = rebased.slice(shift);
        array.push(...rebased.slice(0, shift));

        pos = (pos + val + skip++) % array.length;
    });

    return array;
};

let convertToHex = function convertToHex(input) {
    let results = [];

    for (let y = 0; y < 16; y++) {
        let xor = input.slice(y * 16, (y * 16) + 16).join("^");
        results[y] = eval(xor);
    }
    
    let hash = results.map((v) => { 
        return v.toString(16).length < 2 ? "0" + v.toString(16) : v.toString(16);
    });
    
    return hash.join("");
}

/*
 *  Part 1
 *  Find how may blocks are used in the grid.
 *  Answer = 8204
 */

let h2b = require("./hex2binary");

exports.star1 = function star1 () {
    let grid = []; 

    let value = raw; // raw or test

    for (let x = 0; x < 128; x++) {
        let input = (value + "-" + x).split("").map(val => val.charCodeAt());
        input = input.concat(..."17,31,73,47,23".split(",").map(Number));
        grid[x] = calculateHash(input).split("").map(val => h2b(val)).join("");
    }

    let total = 0;

    grid.forEach((val) => {
        total += val.split("").filter(n => n === "1").length;
    });

    return total;
}

// Test to generate same output as Day 10
// exports.star2 = function star2 () {
//     let bytes = "157,222,1,2,177,254,0,228,159,140,249,187,255,51,76,30".split("").map(val => val.charCodeAt());
//     bytes = bytes.concat(..."17,31,73,47,23".split(",").map(Number));
    
//     return calculateHash(bytes);
// };

/*
 *  Part 2
 *  Find the number of distinct groups in the grid.
 *  Answer = 1089
 */

let grid = [];
let groups = [];
let group = 0;
let level = 0;

let populateGrid = function populateGrid (value) {

    for (let x = 0; x < 128; x++) {
        let input = (value + "-" + x).split("").map(val => val.charCodeAt());
        input = input.concat(..."17,31,73,47,23".split(",").map(Number));

        grid[x] = calculateHash(input).split("").map(val => h2b(val)).join("").split("");
    }

    let total = 0;
}

let checkMembership = function checkMembership (key) {
    for (let x = 0; x < groups.length; x++) {
        if (groups[index].has(key)) return true;
    }
    return false;
};

let inRange = function inRange(num, min, max) {
    return (min <= num && num < max);
}

let buildGroups = function buildGroups (x, y) {   
    let key = `${x},${y}`;
    
    if (!inRange(x, 0, grid.length) || !inRange(y, 0, grid.length)) return;
    if (checkMembership(key)) return;
    if (grid[x][y] === "0") return;
    
    level++;

    if (typeof groups[group] === "undefined") groups[group] = new Set();
    groups[group].add(key);

    buildGroups(x, y - 1); // left
    buildGroups(x - 1, y); // up
    buildGroups(x, y + 1); // right
    buildGroups(x + 1, y); // down

    if (--level === 0) group++;
};

exports.star2 = function star2 () {
    let value = raw; // raw or test

    populateGrid(value);

    grid.forEach((val, x) => {
        val.forEach((v, y) => {
            if (v === "1") {
                level = 0;
                buildGroups(x, y);
            }
        });
    });

    return groups.filter(x => typeof x !== "undefined").length;
}