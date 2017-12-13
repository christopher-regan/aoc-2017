let input = [11, 11, 13, 7, 0, 15, 5, 5, 4, 4, 1, 1, 7, 1, 15, 11];

/*  
 *   Part 1
 *      Rebalance the memory until an allocation is achieved that has been seen before.
 *      Answer = 4074
 */

let findLoop = function findLoop() {
    let history = [];
    let cycles = 0, banks = input.length;    

    while (history.indexOf(input.join(",")) < 0) {
        history.push(input.join(","));
        
        let maxBlocks = Math.max(...input);
        let index = input.indexOf(maxBlocks);
        input[index] = 0;

        index++;

        while(maxBlocks > 0) {
            input[index]++;
            maxBlocks--;
            index < banks - 1 ? index++ : index = 0;
        }

        // Functional attempt
        // let start = loopIndex(banks, input.indexOf(maxBlocks), 1);
        // let end = loopIndex(banks, start, maxBlocks % banks);

        // input.forEach((val, index) => {
        //     let increment = parseInt(maxBlocks/banks);
        //     // if index is between the start and the offset (number of blocks to distribute % the number banks), increment by an additional block
        //     if ((start <= index && index < start + maxBlocks % banks) || index < end && end < start) 
        //         increment++;
        //     input[index] += increment;
        // });

        // Jesse Florig solution - Google+
        while(maxBlocks){
            input[++highest % input.length]++;
            maxBlocks--;
        }

        cycles++;
    }
    return cycles;
}

let loopIndex = function loopIndex (count, start, offset) {
    return (start + offset) % count;
};

exports.star1 = function () {
    return findLoop();
};

/*  
 *   Part 2
 *      Rebalance the memory until an allocation is achieved that has been seen before.
 *      Answer = 2793
 */

exports.star2 = function () {
    return findLoop();
};