import fs from "fs";
import readline from "readline";
import { getData } from "../modules/utils.js"

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


getData("./input.txt", "number")
.then( data => countIncreases(data)
.then((result) => console.log("RESULT PART 1:", result)));

getData("./input.txt", "number")
.then(data => concatData(data)
.then(concatedData => countIncreases(concatedData)
.then(result => console.log("RESULT PART 2:", result))));