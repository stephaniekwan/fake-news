import React from 'react';

/*function makeHttpObject(){
    try {return new XMLHttpRequest();}
    catch (error) {}
    try {return new ActiveXObject("Msxml2.XMLHTTP");}
    catch (error) {}
    try {return new ActiveXObject("Microsoft.XMLHTTP");}
    catch (error) {}
  
    throw new Error("Could not create HTTP request object.");
}*/

function ParseTitle ( {url} ) {
    
    if(url === "" || url === "null") return "Empty url provided" // error handling

    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send(null);
    var title = document.getElementsByTagName("title")[0];
    return title;
    
}

export default ParseTitle;