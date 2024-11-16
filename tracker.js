current_category = {};
curr_date = Date.now();
curr_document = document;

//When extension is started
chrome.runtime.onStartup.addListener(function() {
    current_category = {};
    curr_date = Date.now();

});

//When active tab is changed
chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTab = tabs[0];
        console.log("Active tab URL:", activeTab.url);
        var url = new URL(activeTab.url);
        curr_date = Date.now();
        curr_document = activeTab.

        UpdateTimeForCategory();
        IsUrlInStorage(url);
    });
});

async function UpdateTimeForCategory(){
    const chromeData = await chrome.storage.sync.get('Categories');
    if(chromeData.Categories === undefined){
        return;
    }
    chromeData.Categories.forEach(category => {
        console.log(category.category + " " + current_category.category)
        if (category.category === current_category.category){
            category.timeElapsed = current_category.timeElapsed;
        }
    });
    chrome.storage.sync.set({'Categories': chromeData.Categories});
}

//When tab is changed
//Checks if tab url is in chrome storage
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
                    category_name = category.category;
                    return true;
                }
            })
        });
    }
    if (isInStorage){   
        //console.log(url.hostname + " is in storage");
        UpdateCategory(category_name);  
    } else {
        //console.log(url.hostname + " is not in storage");
        UpdateCategory("None");
    }
}

async function UpdateCategory(curr_category){
    if (curr_category === "None") {
        current_category = {};
        return;
    }
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
    if (current_category){
        const elapsed = Date.now() - curr_date;
        curr_date = Date.now();
        current_category.timeElapsed += elapsed;

        if (current_category.timeElapsed >= current_category.time * 1000) {
            BlockSite();
        }
    }
}, 1000);

async function ResetTimeLimits(){
    //Loop through all categories and set elapsed time to 0
}