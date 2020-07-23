import request from 'request';
import cheerio from 'cheerio';

function fetchTitle(url, onComplete = null) {
    request(url, function (error, response, body) {
        var output = url;   // default to URL
        
        if (!response) {
            console.log('empty response')
        } else if (!error && response.statusCode === 200) {
            var $ = cheerio.load(body);
            console.log(`URL = ${url}`);
            
            var title = $("head > title").text().trim();
            console.log(`Title = ${title}`);
            
            output = `[${title}](${url})`;
        } else {
            console.log(`Error = ${error}, code = ${response.statusCode}`);
        }

        console.log(`output = ${output} \n\n`);
    
        if (onComplete) onComplete(output);
    });
}
export default fetchTitle;