getResponse = (input) => {
    if (!checkInputIsValid(input)) {
        return "Your input is not in the correct format"
    }
    return true;
}

checkInputIsValid = (input) => {
    if (input) {
        // split instructions into array
        let instructionArray = input.trim().split(/\n/);
        if (instructionArray.length < 3) {
            return false;
        }
        checkMarsInitialise(instructionArray[0])
    }
    return false
}

checkMarsInitialise = (input) => {
    let marsSize = input.split('');
    // check that mars size arguments are 2 long and both numbers
    if (marsSize.length === 2 && marsSize.every(checkIsInteger)) {
        return marsSize;
    }
    return false;
}

checkIsInteger = (number) => {
    return number % 1 === 0;
}
