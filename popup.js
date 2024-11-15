document.getElementById("settings").addEventListener("click", () => {  

    chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
});

document.getElementById("clear").addEventListener("click", () => {  

    chrome.storage.sync.clear();
});