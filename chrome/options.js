let Rule =   {
    "id": 1,
    "condition": {
      "regexFilter": "^https://([^?]+)$",
      "requestDomains": ["google.at"],
      "resourceTypes": ["main_frame"]
    },
    "action": {
      "type": "redirect",
      "redirect": {
        "regexSubstitution": "https://\\1?actionOrder=asc"
      }
    }
  }
chrome.declarativeNetRequest.updateDynamicRules({removeRuleIds: [1], addRules: [Rule]})

function saveOptions(e) {
  e.preventDefault();
  chrome.storage.sync.set({
    urlFilter: document.querySelector("#urlFilter").value,
  });
  console.log("saved "+document.querySelector("#urlFilter").value);
  Rule.condition.requestDomains=[document.querySelector("#urlFilter").value];
  chrome.declarativeNetRequest.updateDynamicRules({removeRuleIds: [1], addRules: [Rule]});
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#urlFilter").value = result.urlFilter || "";
	console.log("restored "+ result.urlFilter);
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = chrome.storage.sync.get("urlFilter");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
