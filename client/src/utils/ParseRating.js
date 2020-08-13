/*
 * This function takes an input, usually the article's rating(%), and
 * returns an int
 */
function ParseRating( input ) {
    if(input === "") {
        return "empty string"
    }
    
    // require that the input be a number or a string
    if (typeof(input) !== "number" && typeof(input) !== "string") {
        return "invalid format";
    }
    
    // if input is a number, check if within the range [0, 100]
    if (typeof(input) == "number") {
        if(input >= 0 && input <= 100) {
            // may need extra error handling for decimals?
            return input;
        }
    }

    // else, the input must be a string
    var parsed;

    input = input.trim();
    if (input.charAt(input.length - 1) === '%') {
        input = input.substring(0, input.length - 1);
    }

    // input can be converted to number
    if(!isNaN(Number(input))) {
        parsed = parseInt(input, 10);
        if ((typeof(parsed) == "number") && (parsed >= 0) && (parsed <= 100)) {
            return parsed;
        }
    } 

    // input not a valid number
    return "Input " + input + " could not be converted to a number"

}

export default ParseRating;