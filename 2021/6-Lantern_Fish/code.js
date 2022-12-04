import { getData } from "../modules/utils.js";

// Creates new lantern fish once every 7 days

// So, you can model each fish as a single number
// that represents the number of days until it creates a new lanternfish.

// new fishes need 2 more days (internal timer starts on 8) and start count the day after it was born

/*
After one day, its internal timer would become 2.
After another day, its internal timer would become 1.
After another day, its internal timer would become 0.
After another day, its internal timer would reset to 6, and it would create a new lanternfish with an internal timer of 8.
After another day, the first lanternfish would have an internal timer of 5, and the second lanternfish would have an internal timer of 7.
*/

// Reset timer to 6 (0 included) when fish has been created
const DAYS = 256;
const NEW_BORN_TIMER = 8;
const BIRTHING_TIMER = 6;
(async () => {
    const fishTimers = await (await getData("./input.txt"))
    .map((list) => list.split(",").map((value) => Number(value)))[0];

    const buckets = new Array(NEW_BORN_TIMER + 1).fill(0);
    fishTimers.forEach(fishTimer => buckets[fishTimer]++);

    for(let i = 0; i < DAYS; i++) {
        const births = buckets.shift();
        buckets.push(births);
        buckets[BIRTHING_TIMER]+=births;
    }

    let resultFishes = buckets.reduce((a,b) => a+b);
    console.log(resultFishes);

})()
