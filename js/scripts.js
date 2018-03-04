getResponse = (input) => {
    if (!checkInputIsValid(input)) {
        return "Your input is not in the correct format"
    }
    return true;
}

checkInputIsValid = (input) => {
    if (input) {
        // split instructions into array and remove extra whitespace
        let instructionArray = input.trim().split(/\n/).filter((item) => item !== "");
        if (instructionArray.length < 3) {
            return false;
        }
        checkMarsInitialise(instructionArray[0])
        // check remaining arguments for validity, alternating between route instructions
        // and robot start positions
        for (let i = 1; i < instructionArray.length; i++) {
            if (i % 2 === 0) {
                checkValidRoute()
            } else {
                checkValidStartPos()
            }
        }
    }
    return false
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