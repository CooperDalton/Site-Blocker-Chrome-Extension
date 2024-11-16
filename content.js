if (typeof init === 'undefined'){
    const init = function(){
        const injectElement = document.createElement('div');
        injectElement.className = 'rustyZone';
        injectElement.innerHTML = 'Rusty Zone';
        document.body.appendChild(injectElement);
    }
    init();
}