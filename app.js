let day = 13;
let aoc = require(`./modules/day${day}`);

// Star 1
console.time("star1");
console.log(`Day ${day}, Star 1 output: ${aoc.star1()}`);
console.timeEnd("star1");

// Star 2
if (typeof aoc.star2 === "function") {
    console.time("star2");
    console.log(`Day ${day}, Star 2 output: ${aoc.star2()}`);
    console.timeEnd("star2");
}