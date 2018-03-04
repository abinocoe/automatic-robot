getResponse = (input) => {
    let filteredInput = checkInputIsValid(input)
    let returnedMessage;
    if (!filteredInput) {
        returnedMessage = "<h1>Your input is not in the correct format</h1>"
    } else {
        returnedMessage = calculateEndPos(filteredInput)
    }
    return returnedMessage;
}

calculateEndPos = (instructions) => {
    let marsCoOrdinate = instructions[0];
    let currentRobotPos;
    let foundEdges = [];
    let endPositions = '';
    for (let j = 1; j < instructions.length; j++) {
        // if element is robot start position rather than movement instructions
        let status = '';
        if (j % 2 !== 0) {
            currentRobotPos = instructions[j]
        } else {
            let results = moveRobot(instructions[j], currentRobotPos, marsCoOrdinate, foundEdges)
            if (results[3]) {
                foundEdges.push([results[0], results[1]])
                status = "LOST"
            }
            endPositions += `<h2>${results[0]} ${results[1]} ${results[2]} ${status}</h2>`;
        }
    }
    return endPositions;
} 

moveRobot = (routeArray, robotPosition, mars, edges) => {
    let robotX = Number(robotPosition[0])
    let robotY = Number(robotPosition[1])
    const directions = ['N', 'E', 'S', 'W']
    let robotD = directions.indexOf(robotPosition[2].toUpperCase())
    let isLost = false;
    for (let k = 0; k < routeArray.length; k++) {
        let currentInstruction = routeArray[k].toUpperCase()
        // check type of instruction (turn or move)
        switch (currentInstruction) {
            case 'L': 
                robotD > 0 ? robotD -- : robotD = 3
                break;
            case 'R':
                robotD < 3 ? robotD ++ : robotD = 0
                break;
            case 'F':
                if (robotD === 0) {
                    if (robotY + 1 <= mars[1]) {
                        robotY++
                    } else {
                        if (!checkEdges(robotX, robotY, edges)) {
                            isLost = true;
                        }
                    }
                }
                if (robotD === 1) {
                    if (robotX + 1 <= mars[0]) {
                        robotX++
                    } else {
                        if (!checkEdges(robotX, robotY, edges)) {
                            isLost = true;
                        }
                    }
                }
                if (robotD === 2) {
                    if (robotY - 1 >= 0) {
                        robotY--
                    } else {
                        if (!checkEdges(robotX, robotY, edges)) {
                            isLost = true;
                        }
                    }
                }
                if (robotD === 3) {
                    if (robotX - 1 >= 0) {
                        robotX--
                    } else {
                        if (!checkEdges(robotX, robotY, edges)) {
                            isLost = true;
                        }
                    }
                }
                break;
        }
        if (isLost) break;
    }
    return [robotX, robotY, directions[robotD], isLost]
}

checkEdges = (posX, posY, edges) => {
    let match = false
    if (edges.length > 0) {
        for (let l = 0; l < edges.length; l++) {
            if (edges[l][0] === posX && edges[l][1] === posY) {
                return match = true;
            }
        }
    }
    return match;
}


checkInputIsValid = (input) => {
    let validatedInput = []
    if (input) {
        // split instructions into array and remove extra whitespace
        let instructionArray = input.trim().split(/\n/).filter((item) => item !== "");
        if (instructionArray.length < 3) {
            return false;
        }
        validatedInput.push(checkMarsInitialise(instructionArray[0]))
        // check remaining arguments for validity, alternating between route instructions
        // and robot start positions
        for (let i = 1; i < instructionArray.length; i++) {
            if (i % 2 === 0) {
                validatedInput.push(checkValidRoute(instructionArray[i]))
            } else {
                validatedInput.push(checkValidStartPos(instructionArray[i]))
            }
        }
    }
    // if all elements are returned valid, return the organised array, else
    return validatedInput.indexOf(false) === -1 ? validatedInput : false;
}

checkMarsInitialise = (input) => {
    let marsSize = input.split(' ');
    // check that mars size arguments are 2 long and both numbers
    if (marsSize.length === 2 && marsSize.every(checkIsInteger) && marsSize.every(checkBelowFifty)) {
        return marsSize;
    }
    return false;
}

checkValidStartPos = (input) => {
    let startPos = input.split(' ');
    // check that start pos is 3 characters &
    // check that first two chars are numbers &
    // check that third char is compass letter
    if (startPos.length === 3 && [startPos[0], startPos[1]].every(checkIsInteger) && checkIsCompassLetter(startPos[2]) && [startPos[0], startPos[1]].every(checkBelowFifty)) {
        return startPos
    }
    return false
}

checkValidRoute = (input) => {
    let route = input.split('');
    // check that route is less that 100 chars
    // check that route is comprised only of valid movement letters
    if (route.length <= 100 && route.every(checkIsMovementLetter)) {
        return route;
    }
    return false;
}

checkIsInteger = (number) => {
    return number % 1 === 0;
}

checkBelowFifty = (number) => {
    return number <= 50;
}

checkIsCompassLetter = (letter) => {
    letter.toLowerCase()
    return letter.length === 1 && letter.match(/[nsew]/i);
}

checkIsMovementLetter = (letter) => {
    letter.toLowerCase()
    return letter.length === 1 && letter.match(/[rlf]/i);
}