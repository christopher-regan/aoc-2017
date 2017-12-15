// Generator A starts with 277
// Generator B starts with 349

let realA = 277;
let realB = 349;

let testA = 65;
let testB = 8921;

const aF = 16807; 
const bF = 48271;

const d = 2147483647;

/*
 *  Part 1
 *  
 *  Answer = 
 */

let d2b = function d2b (i) {
    return i.toString(2).padStart(32, "0");
}

exports.star1 = function star1 () {
    let results = [];
    
    let a = realA;
    let b = realB;

    let aR = "";
    let bR = "";

    for (let i = 0; i < 40000000; i++) {
        if (i % 1000000 === 0) console.log(`${i}: ${results.length}`);
        a = (a * aF) % d;
        b = (b * bF) % d;

        aR = d2b(a).slice(16);
        bR = d2b(b).slice(16);;

        if (aR.slice(aR.length-16) === bR.slice(bR.length-16)) {
            let index = results.length;
            results[index] = `${a}|${b}`;
            // results[index][0] = (a * aF) % d;
            // results[index][1] = (b * bF) % d;
            // results[index][2] = aR;
            // results[index][3] = bR;
        }
    }

    return results.length;
}

 /*
 *  Part 2
 *  
 *  Answer = 
 */
let judge = function judge (a, b) {
    let count = 0;
    console.time("judge");
    for (let x = 0; x < length; x++) {
        if (a[x] === b[x])
            count++;
    }
    console.timeEnd("judge");
    return count;
};

let seedArray = function seedArray (array, length, value, factor, divisor, remainder) {
    console.time("seedArray");
    while (array.length < 5000000) {
        if (array.length % 100000 === 0) console.log(`${array.length}`);

        value = (value * factor) % divisor;
        if (value % remainder === 0) {
            array.push(d2b(value).slice(16));
        }
    }
    console.timeEnd("seedArray");
}

exports.star2 = function star2 () {
    let length = 5000000;

    let a = testA;
    let b = testB;

    let as = [], bs = [];

    seedArray(as, length, a, aF, d, 4);
    seedArray(bs, length, b, bF, d, 8);

    return judge(as, bs);
}
