import fs from "fs";
import readline from "readline";


const values = readline.createInterface({
    input : fs.createReadStream("./input.txt"),
    output : process.stdout,
    terminal: false
});

let currentValue = null;

async function countLines() {
    let c = 0;

    for await (const value of values) {
        if(currentValue !== null) {
            value >= currentValue ? c++ : c=c;
            console.log(currentValue, " | ", value, value > currentValue ? "-- Increase" : "---- Decrease", c);
        }

        currentValue = value;
    }
    
    return c;
}

countLines().then((result) => console.log("RESULT:", result));




