let urlFilter = "blue";

function onError(error) {
  console.log(`Error: ${error}`);
}

function onGot(item) {
  if (item.urlFilter) {
    urlFilter = item.urlFilter;
  }
  console.log("urlFilter: ", urlFilter);

}

let getting = browser.storage.sync.get("urlFilter");
getting.then(onGot, onError);


function logStorageChange(changes) {
  const changedItems = Object.keys(changes);

  for (const item of changedItems) {
    console.log(`${item} has changed:`);
    console.log("Old value: ", changes[item].oldValue);
    console.log("New value: ", changes[item].newValue);
  }
  getting = browser.storage.sync.get("urlFilter");
  getting.then(onGot, onError);
  console.log(getting);
}

browser.storage.sync.onChanged.addListener(logStorageChange);


chrome.webRequest.onBeforeRequest.addListener((details) => {
	const url = details.url;
	// getting = browser.storage.sync.get("urlFilter");
	// getting.then(onGot, onError);
	console.log("urlFilter on load : ", urlFilter);
	if (url.search(urlFilter) > 0 && url.search('actionOrder=asc') == -1 && url.search('Dashboard') == -1) {
		if (url.search('\\?') == -1 ) {
			return {redirectUrl: url.concat("?actionOrder=asc")};
		}
		if (url.search('\\?') != -1 ) {
			return {redirectUrl: url.concat("&actionOrder=asc")};
		} 
}
},
{urls: ['https://*/*'], types: ['main_frame']}, ['blocking']);