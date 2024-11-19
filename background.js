chrome.action.onClicked.addListener(async function(tab) {
    await chrome.tabs.create({ url: "index.html" });
});