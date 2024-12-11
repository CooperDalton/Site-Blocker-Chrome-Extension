current_category = {};
curr_date = Date.now();
curr_document = document.querySelector('body');
console.log("Extension started");
//When active tab is changed

siteBlocked = false;
activeTab = window.location.href;
var url = new URL(activeTab);

UpdateTimeForCategory();
IsUrlInStorage(url);

CheckIfNewDay();

if (url.hostname === "www.youtube.com" || url.hostname === "youtube.com") {
    const buttons = document.getElementById('buttons');
    //const buttons = document.querySelector('buttons');
    buttons.remove();
}

url.onChanged = function () {
    if (url.hostname === "www.youtube.com" || url.hostname === "youtube.com") {
        const buttons = document.getElementById('buttons');
        //const buttons = document.querySelector('buttons');
        buttons.remove();
    }
}

async function CheckIfNewDay() {
    const saved_date = await chrome.storage.sync.get('date');
    curr_date_object = new Date(curr_date);
    saved_date_object = new Date(saved_date.date);
    if (saved_date.date !== undefined) {
        if (curr_date_object.getFullYear() !== saved_date_object.getFullYear() || curr_date_object.getMonth() !== saved_date_object.getMonth() || curr_date_object.getDate() !== saved_date_object.getDate()) {
            ResetTimeLimits();
        }
    }
}

document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') {
        console.log("visible");
        UpdateTimeForCategory();
        IsUrlInStorage(url);
    }
});

async function UpdateTimeForCategory() {
    const chromeData = await chrome.storage.sync.get('Categories');
    if (chromeData.Categories === undefined) {
        return;
    }
    chromeData.Categories.forEach(category => {
        if (category.category === current_category.category) {
            category.timeElapsed = current_category.timeElapsed;
        }
    });
    chrome.storage.sync.set({ 'Categories': chromeData.Categories });
}

//When tab is changed
//Checks if tab url is in chrome storage
async function IsUrlInStorage(url) {
    const urlhost = url.hostname + "";
    const chromeData = await chrome.storage.sync.get('Categories');
    isInStorage = false;
    var category_name;
    if (chromeData.Categories !== undefined) {
        chromeData.Categories.forEach(category => {
            category.urls.forEach(url => {
                if (url === urlhost) {
                    isInStorage = true;
                    category_name = category.category;
                    return true;
                }
            })
        });
    }
    if (isInStorage) {
        UpdateCategory(category_name);
    } else {
        UpdateCategory("None");
    }
}

async function UpdateCategory(curr_category) {
    if (curr_category === "None") {
        current_category = {};
        return;
    }
    if (current_category.category !== curr_category) {
        const chromeData = await chrome.storage.sync.get('Categories');
        chromeData.Categories.forEach(category => {
            if (category.category === curr_category) {
                current_category = category;
            }
        });
    }
}

setInterval(() => {
    if (current_category) {
        const elapsed = Date.now() - curr_date;
        curr_date = Date.now();
        current_category.timeElapsed += elapsed;



        if (current_category.timeElapsed >= current_category.time * 1000 && !siteBlocked) {
            BlockSite();
        }
    }
}, 1000);

async function ResetTimeLimits() {
    const chromeData = await chrome.storage.sync.get('Categories');

    if (chromeData.Categories !== undefined) {
        chromeData.Categories.forEach(category => {
            category.timeElapsed = 0;
            chrome.storage.sync.set({ 'Categories': chromeData.Categories });
        });
    }
}

function BlockSite() {
    const body = document.querySelector('body');
    body.innerHTML = `<div style='border-radius: 20px;margin-top: 200px; width: 600px; height: 200px; margin-left: auto; margin-right: auto; background-color: #3B1E54'><div> <h1 style='text-align: center; color: white'>Time's Up</h1></div> <div> <p style='text-align: center; color: white'>You have used up your daily ${String(Math.floor(current_category.time / (60 * 60))).padStart(2, '0')}:${String(Math.floor(current_category.time / 60) % 60).padStart(2, '0')}</p></div></div>;`
    siteBlocked = true;
}

window.addEventListener('beforeunload', function (event) {
    const date = Date.now();
    chrome.storage.sync.set({ 'date': date });
});

chrome.storage.onChanged.addListener((changes, namespace) => {
    IsUrlInStorage(url);
});

setInterval(() => {
    if (current_category) {
        const elapsed = Date.now() - curr_date;
        curr_date = Date.now();
        current_category.timeElapsed += elapsed;

        if (current_category.timeElapsed >= current_category.time * 1000 && !siteBlocked) {
            BlockSite();
        }
    }
}, 1000);