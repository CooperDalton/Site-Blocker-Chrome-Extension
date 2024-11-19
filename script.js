
const category_add = document.getElementById("category_add");
const category_input = document.getElementById("category_input");
const main_container = document.getElementById("main_container");
var chromeData = [];

window.addEventListener('load', StartUp);

async function StartUp(){
    const data = await chrome.storage.sync.get('Categories');
    chromeData = data;
    if (chromeData.Categories !== undefined){
        data.Categories.forEach(category => {
            const div_category_item = document.createElement('div');
            div_category_item.innerHTML = `<div class="header">
                            <a class="category">${category.category}</a>
                                <select class="hour">
                                    <option value="00">00</option>
                                    <option value="01">01</option>
                                    <option value="02">02</option>
                                    <option value="03">03</option>
                                    <option value="04">04</option>
                                    <option value="05">05</option>
                                    <option value="06">06</option>
                                    <option value="07">07</option>
                                    <option value="08">08</option>
                                    <option value="09">09</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                                <select class="minute">
                                    <option value="00">00</option>
                                    <option value="05">05</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                    <option value="20">20</option>
                                    <option value="25">25</option>
                                    <option value="30">30</option>
                                    <option value="35">35</option>  
                                    <option value="40">40</option>
                                    <option value="45">45</option>
                                    <option value="50">50</option>
                                    <option value="55">55</option>
                                </select>
                            <button type="button" class="remove"><svg width="24px" height="24px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.144"></g><g id="SVGRepo_iconCarrier"> <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" stroke="#e81717" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
                            <button type="button" class="add" ><svg width="24px" height="24px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle opacity="0.5" cx="12" cy="12" r="10" stroke="#ffffff" stroke-width="1.56"></circle> <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#ffffff" stroke-width="1.56" stroke-linecap="round"></path> </g></svg></button>
                            <form class="urlForm">
                                <input type="text" class="url" placeholder="URL...">
                            </form>
                        </div>
                        <ul class="listContainer">
                        </ul>
                        `;
            const minute = div_category_item.getElementsByClassName("minute")[0];
            const hour = div_category_item.getElementsByClassName("hour")[0];
            const time = category.time;

            hour.selectedIndex = Math.floor(time / 3600);
            minute.selectedIndex = Math.floor((time% 3600) / 300);

            category.urls.forEach(url => {
                const list = document.createElement('li');
                list.innerHTML = `<a href="${"https://"+url}" target="_blank">${url.substring(4)}</a><button type="button" class="remove"><svg width="24px" height="24px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.144"></g><g id="SVGRepo_iconCarrier"> <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" stroke="#e81717" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>`;
                list.getElementsByClassName("remove")[0].addEventListener("click", () => {
                    RemoveUrl(url, category.category);
                    list.remove();
                });
                div_category_item.getElementsByClassName("listContainer")[0].appendChild(list);
            });
            AddEventListeners(category.category, div_category_item);
            
            main_container.appendChild(div_category_item);
        });
    }
}

 category_add.addEventListener("click", () => {
    const category = category_input.value+"";
    category_input.value = "";
    const div_category_item = document.createElement('div');
    div_category_item.innerHTML = `<div class="header">
                            <a class="category">${category}</a>
                                <select class="hour">
                                    <option value="00">00</option>
                                    <option value="01">01</option>
                                    <option value="02">02</option>
                                    <option value="03">03</option>
                                    <option value="04">04</option>
                                    <option value="05">05</option>
                                    <option value="06">06</option>
                                    <option value="07">07</option>
                                    <option value="08">08</option>
                                    <option value="09">09</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                                <select class="minute">
                                    <option value="00">00</option>
                                    <option value="05">05</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                    <option value="20">20</option>
                                    <option value="25">25</option>
                                    <option value="30">30</option>
                                    <option value="35">35</option>  
                                    <option value="40">40</option>
                                    <option value="45">45</option>
                                    <option value="50">50</option>
                                    <option value="55">55</option>
                                </select>
                            <button type="button" class="remove"><svg width="24px" height="24px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.144"></g><g id="SVGRepo_iconCarrier"> <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" stroke="#e81717" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
                            <button type="button" class="add" ><svg width="24px" height="24px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle opacity="0.5" cx="12" cy="12" r="10" stroke="#ffffff" stroke-width="1.56"></circle> <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#ffffff" stroke-width="1.56" stroke-linecap="round"></path> </g></svg></button>
                            <form class="urlForm">
                                <input type="text" class="url" placeholder="URL...">
                            </form>
                        </div>
                        <ul class="listContainer">
                        </ul>
                        `;
    /*
    chrome.storage.set({category: {
        time: 0,
        urls: [,]
    }});*/
    
    AddEventListeners(category, div_category_item);

    main_container.appendChild(div_category_item);

    const categoryData = {
        category: `${category}`,
        time: 0,
        timeElapsed: 0,
        urls: []
    }
    AddCategoryData(categoryData);

    //location.reload();
});

function AddEventListeners(category, div_category_item){
    const hour = div_category_item.getElementsByClassName("hour")[0];
    const minute = div_category_item.getElementsByClassName("minute")[0];
    const url_input = div_category_item.getElementsByClassName("url")[0];
    const add_button = div_category_item.getElementsByClassName("add")[0];
    const remove_button = div_category_item.getElementsByClassName("remove")[0];

    //console.log(url_input + " " + hour + " " + minute + " " + add_button + " " + remove_button);
    hour.addEventListener("change", () => {
        const hour_time = parseInt(hour.value) * 3600;
        const minute_time = parseInt(minute.value) * 60;
        UpdateTime(hour_time, minute_time, category);
    });
    minute.addEventListener("change", () => {
        const hour_time = parseInt(hour.value) * 3600;
        const minute_time = parseInt(minute.value) * 60;
        UpdateTime(hour_time, minute_time, category);
    });

    add_button.addEventListener("click", () => {
        let category_this = category;
        let url_value = url_input.value + "";
        url_input.value = "";
        if (url_value.indexOf("www.") === -1){
            url_value = "www." + url_value;
        }
        if (url_value.indexOf("https://") === -1){
            url_value = "https://" + url_value;
        }
        try {
            var url = new URL(url_value);
        } catch(e){
            console.log(e);
        }

        AddUrlValue(url.hostname, category_this);

        const list = document.createElement('li');
        list.innerHTML = `<a href="${url.protocol+url.hostname}">${url.hostname.substring(4)}</a><button type="button" class="remove"><svg width="24px" height="24px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.144"></g><g id="SVGRepo_iconCarrier"> <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" stroke="#e81717" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>`;
        list.getElementsByClassName("remove")[0].addEventListener("click", () => {
            RemoveUrl(url.hostname, category_this);
            list.remove();
        });
        div_category_item.getElementsByClassName("listContainer")[0].appendChild(list);
    });
    remove_button.addEventListener("click", () => {
        //TO DO Remove category from storage
        RemoveCategory(category);
        div_category_item.remove();
    });
}

//async function AddUrlData(urlData){

chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      chromeData = newValue;
      console.log(chromeData);
    }
});

async function AddCategoryData(categoryData){
    const chromeData = await chrome.storage.sync.get('Categories');
    
    if(chromeData.Categories === undefined) {
        chrome.storage.sync.set({'Categories': [categoryData]});
        categoryExists = true;
    } else {
        chrome.storage.sync.get('Categories', (result) => {
            result.Categories.push(categoryData);
            chrome.storage.sync.set({'Categories': result.Categories});
        });
    }
}

async function RemoveCategory(target_category){
    const chromeData = await chrome.storage.sync.get('Categories');
    
    if (chromeData.Categories !== undefined){
        chromeData.Categories.forEach(category => {
            if (category.category === target_category){
                const index = chromeData.Categories.indexOf(category);
                chromeData.Categories.splice(index, 1);
                chrome.storage.sync.set({'Categories': chromeData.Categories});
                return;
            }
        })
    }
}

async function AddUrlValue(url, category){
    const chromeData = await chrome.storage.sync.get('Categories');

    if (chromeData.Categories !== undefined){
        chromeData.Categories.forEach(curr_category => {
            if (curr_category.category === category){
                curr_category.urls.push(url);
                chrome.storage.sync.set({'Categories': chromeData.Categories});
                return;
            }
        });
    }
}

async function RemoveUrl(url, category){
    const chromeData = await chrome.storage.sync.get('Categories');

    if (chromeData.Categories !== undefined){
        chromeData.Categories.forEach(curr_category => {
            if (curr_category.category === category){
                const index = curr_category.urls.indexOf(url);
                curr_category.urls.splice(index, 1);
                chrome.storage.sync.set({'Categories': chromeData.Categories});
                return;
            }
        });
    }
}

async function UpdateTime(hour, minute, category){
    const chromeData = await chrome.storage.sync.get('Categories');

    if (chromeData.Categories !== undefined){
        chromeData.Categories.forEach(curr_category => {
            if (curr_category.category === category){
                curr_category.time = hour+minute;
                chrome.storage.sync.set({'Categories': chromeData.Categories});
                return;
            }
        });
    }
}