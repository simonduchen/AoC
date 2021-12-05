import fs from "fs";
import readline from "readline";

async function getData() {

    const lines = readline.createInterface({
        input : fs.createReadStream("./input.txt"),
        output : process.stdout,
        terminal: false
    });
    
    let array = [];

    for await (let line of lines) {
        array.push(Number(line));
    }

    return array;
}

async function concatData(array) {
    
    return await array.map((measurement, index) => {
        if(index + 2 <= array.length)
            return measurement + array[index + 1] + array[index + 2]
    });

}

async function countIncreases(array) {
    
    let increaseCount = 0;
    let currentMeasurement = null;

    await array.forEach(measurement => {
        measurement > currentMeasurement && 
        currentMeasurement !== null ? increaseCount++ : null;
        
        currentMeasurement = measurement;
    });
    
    return increaseCount;
}


getData()
.then( data => countIncreases(data)
.then((result) => console.log("RESULT PART 1:", result)));

getData()
.then(data => concatData(data)
.then(concatedData => countIncreases(concatedData)
.then(result => console.log("RESULT PART 2:", result))));