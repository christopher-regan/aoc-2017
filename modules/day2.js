let input = [
    [278, 1689, 250, 1512, 1792, 1974, 175, 1639, 235, 1635, 1690, 1947, 810, 224, 928, 859],
    [160,50,55,81,68,130,145,21,211,136,119,78,174,155,149,72],
    [4284,185,4499,273,4750,4620,4779,4669,2333,231,416,1603,197,922,5149,2993],
    [120,124,104,1015,1467,110,299,320,1516,137,1473,132,1229,1329,1430,392],
    [257,234,3409,2914,2993,3291,368,284,259,3445,245,1400,3276,339,2207,233],
    [1259,78,811,99,2295,1628,3264,2616,116,3069,2622,1696,1457,1532,268,82],
    [868,619,139,522,168,872,176,160,1010,200,974,1008,1139,552,510,1083],
    [1982,224,3003,234,212,1293,1453,3359,326,3627,3276,3347,1438,2910,248,2512],
    [4964,527,5108,4742,4282,4561,4070,3540,196,228,3639,4848,152,1174,5005,202],
    [1381,1480,116,435,980,1022,155,1452,1372,121,128,869,1043,826,1398,137],
    [2067,2153,622,1479,2405,1134,2160,1057,819,99,106,1628,1538,108,112,1732],
    [4535,2729,4960,241,4372,3960,248,267,230,5083,827,1843,3488,4762,2294,3932],
    [3245,190,2249,2812,2620,2743,2209,465,139,2757,203,2832,2454,177,2799,2278],
    [1308,797,498,791,1312,99,1402,1332,521,1354,1339,101,367,1333,111,92],
    [149,4140,112,3748,148,815,4261,138,1422,2670,32,334,2029,4750,4472,2010],
    [114,605,94,136,96,167,553,395,164,159,284,104,530,551,544,18]
];

const initialValue = 0;

/*
 *  Part 1
 *      Sum the difference between the max and min values in each row.
 *      Answer = 42378
 */
let sumMinAndMax = function (total, val, index, arr) {
    return total + (Math.max(...input[index]) - Math.min(...input[index]));
};

exports.star1 = function star1 () {
    return input.reduce(sumMinAndMax, initialValue);
};

/*
 *  Part 1
 *      Check each element in the array against every other element.  If it evenly divides into another element, return the result.
 *      Only one pair per row will match.
 * 
 *      Answer = 246
 */
let getRowResult = function getRowResult (total, val, index, arr) {
    let result = 0, found = 0;

    val.forEach((divisor, divisorIndex) => {
        // Skip the check if a divisor has already been found for the row.
        if (result === 0) {
            // Find the first number into which the current number even divides
            found = val.find((numerator, numeratorIndex) => {
                return numeratorIndex !== divisorIndex && numerator % divisor === 0;
            });

            // If find() returned a value, calculate the quotient, and increment the result by that much
            result += typeof found !== 'undefined' ? found / divisor : 0;
        }
    });

    return total + result;
}

exports.star2 = function star2 () {
    return input.reduce(getRowResult, initialValue);
};

// Brute force
// var number = 0;
// var sum = 0;
// var c = false;

// function run() {
//     for (var x = 0; x <= 15; x++) {
//         c = false;
//         input[x].sort();
//         for (var y = 0; y <= 18; y++) {
//             number = input[x][y];
//             //if (number > input[x][input[x].length-1]) break;
//             for (var z = 0; z <=18; z++) {
//                 if (input[x][z] > number && input[x][z] % number === 0) {
//                     sum += input[x][z]/number;
//                     c = true;
//                     break;
//                 }
//             }
//             if (c) {
//                 break;
//             }
//         }
//     }
//     return sum;
// }

// exports.star2 = function star2 () {
//     return run();
// };