import ParseRating from './ParseRating';

/*
 * async function to wait for rating to parse and then choose a color
 * accordingly 
 * 
 * Returns a dictionary with the keys rating and color
 */
function PickColor(input) {
    var dict = {};
    var color;
    var riskLevel;

    var rating = ParseRating(input);
    if (typeof(rating) !== "number") {
        // error occurred while parsing
        console.log("Rating could not be parsed correctly.");
        console.log("Rating: " + rating);
        return "Rating could not be parsed correctly.";
    } else {
        if (rating < 50) {
            color = "red";
            riskLevel = "high";
        } else if (rating < 75) {
            color = "yellow";
            riskLevel = "moderate";
        } else {
            color = "green";
            riskLevel = "low";
        }
    }

    dict['rating'] = rating;
    dict['color'] = color;
    dict['riskLevel'] = riskLevel;

    return dict;
}

export default PickColor;