const test = [
    "0: 3",
    "1: 2",
    "4: 4",
    "6: 4"
];

const raw = [
    "0: 3",
    "1: 2",
    "2: 4",
    "4: 4",
    "6: 5",
    "8: 6",
    "10: 8",
    "12: 8",
    "14: 6",
    "16: 6",
    "18: 8",
    "20: 8",
    "22: 6",
    "24: 12",
    "26: 9",
    "28: 12",
    "30: 8",
    "32: 14",
    "34: 12",
    "36: 8",
    "38: 14",
    "40: 12",
    "42: 12",
    "44: 12",
    "46: 14",
    "48: 12",
    "50: 14",
    "52: 12",
    "54: 10",
    "56: 14",
    "58: 12",
    "60: 14",
    "62: 14",
    "66: 10",
    "68: 14",
    "74: 14",
    "76: 12",
    "78: 14",
    "80: 20",
    "86: 18",
    "92: 14",
    "94: 20",
    "96: 18",
    "98: 17"
];

class Layer {
    constructor (depth) {
        this.depth = depth;
        this.scannerPosition = 1;
        this.scannerDirection = 1;
    }
    
    resetScanner () {
        this.scannerPosition = 1;
        this.scannerDirection = 1;
    }

    moveScanner () {
        this.scannerPosition += this.scannerDirection;
        if (this.scannerPosition === this.depth || this.scannerPosition === 1) {
            this.scannerDirection = this.scannerDirection * -1;
        }
    }
}

let prepInput = function prepInput(raw) {
    raw.forEach((val) => {
        props = val.split(": ");
        let layer = new Layer(Number(props[1]));
        layers.set(Number(props[0]), layer);
    });
}

let moveScanners = function moveScanners() {
    layers.forEach((val) => {
        val.moveScanner();
    });
};

/*
 * Part 1
 *      Find the total severity of traversing the layers
 *      Answer = 2160
 */
let layers = new Map();

let run = function run () {
    let severity = 0;
    let position = 0;
    
    while (position < Math.max(...layers.keys())) {
        if (layers.has(position)) {
            l = layers.get(position);
            if (l.scannerPosition === 1) {
                severity += position * l.depth;
            }
        }
        moveScanners();
        position++;
    }

    return severity;
};

exports.star1 = function star1 () {
    prepInput(raw);
    return run();
};

/*
 * Part 2
 *      Find the delay that needs to be applied so the packet is not caught by a scanner
 *      Answer = 3907470
 */

let layerArray = [];

let prepInputFast = function prepInputFast (raw) {
    raw.forEach((val) => {
        layerArray[Number(val.split(": ")[0])] = Number(val.split(": ")[1]);
    });
};

let runFast = function runFast () {
    let delay = -1;
    let caught = true;

    while (caught) {
        delay++;
        caught = !layerArray.every((val, index) => {
            return (delay + index) % ((val * 2) - 2) !== 0;
        });
    }

    return delay;
};

exports.star2 = function star2 () {
    prepInputFast(raw);

    let delay = 0;
    delay = runFast();

    return delay;
};
