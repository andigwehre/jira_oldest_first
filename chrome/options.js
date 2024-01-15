function saveOptions(e) {
  e.preventDefault();
  chrome.storage.sync.set({
    urlFilter: document.querySelector("#urlFilter").value,
  });
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#urlFilter").value = result.urlFilter || "";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = chrome.storage.sync.get("urlFilter");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
