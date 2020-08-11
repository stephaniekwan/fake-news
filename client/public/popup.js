console.log(chrome)
console.log(chrome.tabs)

chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  let url = tabs[0].url;
  // use `url` here inside the callback because it's asynchronous!
  //console.log(url)
});

/*document.addEventListener('DOMContentLoaded', function() {
  console.log(chrome.tabs)
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    // use `url` here inside the callback because it's asynchronous!
    console.log(url)
  });
});*/



/*
// Inject the payload.js script into the current tab after the popout has loaded
window.addEventListener('load', function (evt) {
	chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
		file: 'payload.js'
	});;
});

// Listen to messages from the payload.js script and write to popout.html
chrome.runtime.onMessage.addListener(function (message) {
	document.getElementById('pagetitle').innerHTML = message;
});


function getCurrentTabUrl(callback) {  
  var queryInfo = {
    active: true, 
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var url = tabs[0].url; 
    // var url = tab.url;
    callback(url);
  });
  console.log(url)
}

function renderURL(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    renderURL(url); 
  });
}); */



//START OF RYAN'S CODE
/*  let changeColor = document.getElementById('changeColor');

  chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
  });
  changeColor.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      console.log("executing script");
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'document.body.style.backgroundColor = "' + color + '";'});
      console.log("script executed");
      let url = tabs[0].url;
      console.log(url);
    });
  };
*/

//pull url funtion
/*chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
	let url = tabs[0].url;
	// use `url` here inside the callback because it's asynchronous!
  	console.log(url);
  });*/


