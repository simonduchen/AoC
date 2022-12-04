import fs from "fs";
import { type } from "os";
import readline from "readline";


export async function getData(path, type="string") {

    const lines = readline.createInterface({
        input: fs.createReadStream(path),
        output: process.stdout,
        terminal: false
    });

    let array = [];

    for await (let line of lines) {
        if(type == "number")
            array.push(Number(line));
        else if(type === "string") {
            array.push(line.toString().normalize())
        }else {
            array.push(line);
        }
    }

    return array;
}