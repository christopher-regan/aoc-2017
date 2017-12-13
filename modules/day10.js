let lengths = "157,222,1,2,177,254,0,228,159,140,249,187,255,51,76,30".split(",").map(Number);
let list = new Array(256);

for (let x = 0; x < 256; x++) {
    list[x] = x;
}

/*
 * Part 1
 *      Answer = 62238
 */
let pos = 0;
let skip = 0;

let run = function run() {
    lengths.forEach((val, index) => {
        let sub = list.slice(pos, pos + val);
        if ((pos + val) >= list.length)
            sub = sub.concat(list.slice(0, (pos + val) % list.length));
        sub.reverse();
        let sub1 = sub.slice(0, list.length - pos);
        list.splice(pos, val, ...sub1);
        if ((pos + val) >= list.length) {
            sub2 = sub.slice(sub1.length);
            list.splice(0, sub2.length, ...sub2);
        }
        pos = (pos + val + skip) % list.length;
        skip++;
    });
};

exports.star1 = function star1 () {
    //run();
    return list[0] * list[1];
};

let bytes = "157,222,1,2,177,254,0,228,159,140,249,187,255,51,76,30".split("").map(val => val.charCodeAt());
bytes = bytes.concat(..."17,31,73,47,23".split(",").map(Number));

// list = new Array(256);
let rebased = [], ordered = [];
let shift = 0;

// for (let x = 0; x < 256; x++) {
//     list[x] = x;
// }

let run2 = function run() {
    bytes.forEach((val, index) => {

        // -----------------------------
        // Original
        
        // let wrap = (pos + val) > list.length ? (pos + val) % list.length : 0;
        // let sub = list.slice(pos, pos + val)
        //     .concat(list.slice(0, wrap))
        //     .reverse();
        
        // list.splice(pos, val, ...sub.slice(0, list.length - pos))
        // if ((pos + val) >= list.length) {
        //     sub2 = sub.slice(list.length - pos);
        //     list.splice(0, sub2.length, ...sub2);
        // }
        // -----------------------------

        // Shift target segment to the front of the array
        shift = list.length - pos;

        rebased = list.slice(0, pos);
        rebased.unshift(...list.slice(pos));

        // Reverse the elements in the target segment
        rebased = rebased.slice(0, val)
                         .reverse()
                         .concat(rebased.slice(val));
        
        list = rebased.slice(shift);
        list.push(...rebased.slice(0, shift));

        pos = (pos + val + skip++) % list.length;
    });

    // Attempt to defer "un-rebasing" until the end -- not working in current form.
    // segment = list.slice(shift);
    // segment.push(...list.slice(0, shift));
    // list = segment;
};

/*
 *
 *  Answer = 2b0c9cc0449507a0db3babd57ad9e8d8
 */

exports.star2 = function star2 () {
    pos = 0;
    skip = 0;

    for (let x = 0; x < 64; x++) {
        run2();
    }
    let results = [];
    for (let y = 0; y < 16; y++) {
        let xor = list.slice(y * 16, (y * 16) + 16).join("^");
        results[y] = eval(xor);
    }
    let hash = results.map((v) => { 
        return v.toString(16).length < 2 ? "0" + v.toString(16) : v.toString(16);
    });
    return hash.join("");
}