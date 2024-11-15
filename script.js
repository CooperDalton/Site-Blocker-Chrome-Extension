
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
                            <a>${category.category}</a>
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
                            <button type="button" class="remove">Remove</button>
                            <button type="button" class="add">Add</button>
                            <form class="urlForm">
                                <input type="text" class="url" placeholder="URL...">
                            </form>
                        </div>
                        <ul class="listContainer">
                        </ul>`;
            
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
                    <a>${category}</a>
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
                    <button type="button" class="remove">Remove</button>
                    <button type="button" class="add">Add</button>
                    <form class="urlForm">
                        <input type="text" class="url" placeholder="URL...">
                    </form>
                </div>
                <ul class="listContainer">
                </ul>`;
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
        //TO DO Update time in storage
    });
    minute.addEventListener("change", () => {
        const minute_time = parseInt(minute.value) * 60;
        //TO DO Update time in storage
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
        list.innerHTML = `${url.hostname}<button type="button" class="remove">Remove</button>`;
        list.getElementsByClassName("remove")[0].addEventListener("click", () => {
            RemoveUrl(url.hostname, category_this);
            list.remove();
        });
        div_category_item.getElementsByClassName("listContainer")[0].appendChild(list);
    });
    remove_button.addEventListener("click", () => {
        //TO DO Remove category from storage
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