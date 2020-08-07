import React from 'react'; 

function ParseDomain( url ) {
    /* Takes a url and parses for domain */

    if(url === "" || url === "null") return "Empty url provided" // error handling
    
    var parser = document.createElement('a'), search = {}, queries, splitQueries, i;
    parser.href = url;

    queries = parser.search.replace(/^\?/, '').split('&');
    for (i = 0; i < queries.length; i++){
        splitQueries = queries[i].split('=');
        search[splitQueries[0]] = splitQueries[1];
    }

    return {
            host: parser.host,
            hostname: parser.hostname
    }
}

export default ParseDomain;