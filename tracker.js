current_category = {};

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
    var category_name;
    if (chromeData.Categories !== undefined){
        chromeData.Categories.forEach(category => {
            category.urls.forEach(url =>{
                if (url === urlhost){
                    isInStorage = true;
                    category.name = category.category;
                    return true;
                }
            })
        });
    }
    if (isInStorage){   
        console.log(url.hostname + " is in storage");
        UpdateCategory(category_name);  
    } else {
        console.log(url.hostname + " is not in storage");
        UpdateCategory("None");
    }
}

async function UpdateCategory(curr_category){
    if (current_category.category !== curr_category){
        const chromeData = await chrome.storage.sync.get('Categories');
        chromeData.Categories.forEach(category => {
            if (category.category === curr_category){
                current_category = category;
                console.log(category);
            }
        });
    }
}

setInterval(() => {
    
}, 5000);