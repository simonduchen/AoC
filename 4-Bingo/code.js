import {getData} from "../modules/utils.js";

/*--------------------- PART 1 ---------------------*/
async function generateBingo(brickPath = "./bricks.txt", numbersPath = "./numbers.txt") {
    let bricks_raw = (await getData(brickPath));
    let numbers = (await getData(numbersPath))[0].split(",");
    let bricks = [];

    for(let i = 0; i < bricks_raw.length; i+=6){
        let brick_raw = bricks_raw.slice(i, i + 5);
        let brick = [];

        brick_raw.forEach(line => {
            let formattedLine = line.split(' ').filter(cell => cell != ' ' && cell != '')
            let newLine = [];
            formattedLine.forEach(cell => newLine.push({number: cell, marked: false}));
            brick.push(newLine);
        });

        bricks.push(brick);
    }

    return {numbers, bricks};
}

async function hasBingo(brick) {

    let result = false;

    brick.forEach((row, i) => {
        let winningRow = 0;
        let winningColumn = 0;
        for(let j = 0; j < row.length; j++) {
            // Check row i
            if(brick[i][j].marked) winningRow++;
            // Check column i
            if(brick[j][i].marked) winningColumn++;
        }

        if(winningRow === 5) {
            result = true;
            return;
        }
        if(winningColumn === 5) {
            result = true;
            return;
        }
    });

    return result;
}

async function playBingo(numbers, bricks) {    

    for(const number of numbers) {
        // 1. mark all bricks
        bricks = 
        bricks.map((brick) => 
            brick.map((row) => 
                row.map(cell => cell.number == number ? {number: cell.number, marked: true} : cell)
            )
        );
        // 2. check all bricks
        for (const brick of bricks) {
            
            let result = await hasBingo(brick)
                    
            // 3. if a brick has won, calc result
            if(result){
                let sum = 0

                for(const row of brick) {
                    for(const cell of row) {
                        if(!cell.marked) sum += parseInt(cell.number);
                    } 
                }

                return sum*number;
            }
        }
    }
}
(async () => {
    let {numbers, bricks} = await generateBingo();
    console.log("RESULT PART 1:", await playBingo(numbers, bricks));
})();


/*--------------------- PART 2 ---------------------*/
async function playBingoAndLoose(numbers, bricks) {    
    
    for(const number of numbers) {
        // 1. mark all bricks
        bricks =  
        bricks.map((brick) => 
            brick.map((row) => 
                row.map(cell => parseInt(cell.number) === parseInt(number) ? {number: cell.number, marked: true} : cell)
            )
        );
        
        // 2. check all bricks
        for (const brick of bricks) {
            let result = await hasBingo(brick);
            
            // 3. if a brick has won, remove it from the bricks list
            if(result && bricks.length > 1) bricks.splice(bricks.indexOf(brick), 1);

            
            //4. if the brick has won and is the last brick, calc result
            else if(result) {
             

                let sum = 0;

                for(const row of brick) {
                    for(const cell of row) {
                        if(!cell.marked) sum += parseInt(cell.number);
                    } 
                }
                console.log(sum, number);
                return sum*number;
            }
        }
    }
}

(async () => {
    let {numbers, bricks} = await generateBingo();
    console.log("RESULT PART 2:", await playBingoAndLoose(numbers, bricks));
})();
