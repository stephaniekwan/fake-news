//import React from 'react';

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
    //request.responseType = "something";
    request.responseType = "text";
    request.send();
    //REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
    //WORK
    var title = document.getElementsByTagName("title")[0].innerHTML;
    //document.getElementsByTagName("title")[0].innerHTML = request.responseText;
   //var title = (/<title>(.*?)<\/title>/m).exec(request.responseText)[0];
    //var title = document.title;
    //var title = document.querySelector('title');
    console.log(title);
    //var titleString = title.toString();
    //var title = document.getElementsByTagName("title")[0].innerHTML;
    
    return title;
    
}

export default ParseTitle;