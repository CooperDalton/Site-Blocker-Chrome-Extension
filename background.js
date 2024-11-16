try {
    chromeData.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        if (changeInfo.status == 'complete') {
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ['content.js']
            });
        }
    });
} catch (e) {

    console.log(e);
}