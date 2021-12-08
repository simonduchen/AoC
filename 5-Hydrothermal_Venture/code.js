import {getData} from "../modules/utils.js";


(async () => {
    let data = await getData("./input.txt", "string");
    let lines = data.map(line => {
        const point = line.split(" -> ").map(point => point.split(','));
        return {
            x1: parseInt(point[0][0]), y1:  parseInt(point[0][1]), 
            x2:  parseInt(point[1][0]), y2:  parseInt(point[1][1])
        };
    });
 
    
    let diagram = new Array(1000);
    for(let i = 0; i < diagram.length; i++){
        diagram[i] = new Array(1000).fill(Number(0));
    }

    for(const line of lines) {
        
        // calc points in horisontal line
        if(line.y1 === line.y2) 
            await calcLineForDiagram(diagram, line.x1, line.x2, line.y1, "horisontal");
            
        // calc points in vertical line
        else if(line.x1 === line.x2) 
            await calcLineForDiagram(diagram, line.y1, line.y2, line.x1, "vertical");
        // calc points in diagonal line
        else 
            await calcDiagonalLineForDiagram(diagram, line);
    }

    let dangerZones = 0;
    
    for(const row of diagram) {
        for(const point of row) {
            if(point > 1)
                dangerZones++;
        }
    }
    console.log("DANGER ZONES", dangerZones);
})();

async function calcDiagonalLineForDiagram(diagram, line) {
    const xDiff = line.x1 - line.x2;
    const yDiff = line.y1 - line.y2;
    const xDirr = xDiff > 0 ? -1 : 1;
    const yDirr = yDiff > 0 ? -1 : 1;
    let x = 0;
    let y = 0;
    let it = 0;
    while(it <= Math.abs(xDiff)) {
        x = line.x1 + xDirr*it;
        y = line.y1 + yDirr*it;
        diagram[y][x] += 1;
        it++;
    }
}
async function calcLineForDiagram(diagram, point1, point2, staticPoint, orientation) {
    
    const start = point1 < point2 ? point1 : point2;
    const end = point1 > point2 ? point1 : point2;

    for(let p = start; p <= end; p++) {
        if(orientation === "horisontal") diagram[staticPoint][p] += 1;
        
        if(orientation === "vertical") diagram[p][staticPoint] += 1;
    } 
}