/* global chrome */
// trying to recognize chrome
//const { default: ProcessResults } = require("../src/containers/ProcessResults");
/*
let getURL = document.getElementById('getURL');
getURL.onclick = function(element){
    getCurrentUrl();
};
*/
const chrome = window.chrome;

window.getCurrentUrl = () => {
//function getCurrentUrl() {
    /*chrome.tabs.query({active: true, lastFocusedWindow: true}, (tabs) => {
        var tab = tabs[0];
        var url = tab.url;
        document.getElementById('url').innerHTML = url;
    });*/
    //console.log(url);
    chrome.tabs.query({active: true, lastFocusedWindow: true}), function(tabs){
        var url = tabs[0].url;
        console.log(url);
    }
}

/*
chrome.tabs.query({active: true, lastFocusedWindow: true}), function(tabs){
    var tab = tabs[0];
    console.log(tab.url);
} 
*/