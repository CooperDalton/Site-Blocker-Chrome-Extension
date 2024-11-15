

chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const activeTab = tabs[0];
      console.log("Active tab URL:", activeTab.url);
      var url = new URL(activeTab.url);

      IsUrlInStorage(url);
    });
});

async function IsUrlInStorage(url){
    const urlhost = url.hostname+"";
    const chromeData = await chrome.storage.sync.get('Categories');
    isInStorage = false;
    var category;
    if (chromeData.Categories !== undefined){
        chromeData.Categories.forEach(category => {
            category.urls.forEach(url =>{
                if (url === urlhost){
                    isInStorage = true;
                    category = category.category;
                    return true;
                }
            })
        });
    }
    if (isInStorage){   
        console.log(url.hostname + " is in storage");  
    } else {
        console.log(url.hostname + " is not in storage");
    }
}