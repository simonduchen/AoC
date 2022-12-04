import {getData} from "../modules/utils.js";

/*--------------------- PART 1 ---------------------*/
async function calcCommon(list) {

    let mostCommon = "";
    let leastCommon = "";

    for(let i = 0; i < list[0].length; i++) {
        
        let zeroCount = 0;
        let oneCount = 0;
        
        list.forEach(digit => digit[i] == '1' ? oneCount++ : zeroCount++);

        if(oneCount > zeroCount) {
            mostCommon += '1';
            leastCommon +='0';
        }
        else if(oneCount < zeroCount) {
            mostCommon += '0';
            leastCommon += '1';
        }
        else {
            mostCommon += '1';
            leastCommon += '0';
        }
    }

    return {mostCommon, leastCommon};
}
async function runPartOne() {
    const data = await getData("./input.txt");
    const {mostCommon, leastCommon} = await calcCommon(data);

    console.log(
        "RESULT PART 1:", 
        parseInt(mostCommon, 2)*parseInt(leastCommon, 2)
    );
}

/*--------------------- PART 2 ---------------------*/
async function calcLifeSupportRating(list, type) {
    const length = 12;

    for(let i = 0; i < length; i++) {
        const {leastCommon, mostCommon} = await calcCommon(list);
        const common = type === 1 ? mostCommon : leastCommon;
        
        let tempList = list.filter(binary => binary[i].normalize() == common[i].normalize());
        
        if(tempList.length === 1) return tempList[0];
        
        if(tempList.length === 0) continue;

        list = tempList;     
    }

    return list;
}

async function runPartTwo() {
    let data = await getData("./input.txt");
    let oxygen = await calcLifeSupportRating(data, 1);
    let co2Scrub = await calcLifeSupportRating(data, 0);

    console.log(
        "RESULT PART 2:",
        parseInt(oxygen, 2) * parseInt(co2Scrub, 2)
    );

};

runPartOne();
runPartTwo();