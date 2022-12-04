import fs from "fs";
import readline from "readline";


/*--------------------- PART 1 ---------------------*/
async function calcPosition() {
    const lines = readline.createInterface({
        input : fs.createReadStream("./input.txt"),
        output : process.stdout,
        terminal: false
    });

    let xPos = 0;
    let yPos = 0;

    for await (let line of lines) {
        let direction = line.split(" ")[0];
        let value = Number(line.split(" ")[1]);

        direction === "forward" ? xPos += value :
        direction === "up" ? yPos -= value : yPos += value;
    }

    return xPos * yPos;
}
calcPosition().then(result => console.log("RESULT PART 1:", result));

/*--------------------- PART 2 ---------------------*/
async function calcPositionWithAim() {
    const lines = readline.createInterface({
        input : fs.createReadStream("./input.txt"),
        output : process.stdout,
        terminal: false
    });
    
    let aim = 0;
    let xPos = 0;
    let yPos = 0;

    for await (let line of lines) {
        let direction = line.split(" ")[0];
        let value = Number(line.split(" ")[1]);

        if(direction === "forward") {
            yPos = yPos + (aim * value);
            console.log("Y", yPos, "=", aim, "*", value);
            xPos += value;
        }
        else
            if(direction === "up")
                aim -= value
            if(direction === "down")
                aim += value;
    }

    return xPos * yPos;
}
calcPositionWithAim().then(result => console.log("RESULT PART 2:", result));


