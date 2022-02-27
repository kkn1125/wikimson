let mode = getMode() || 'on';
setMode(mode);
if(JSON.parse(sessionStorage['mode']).dark=='off'){
    let body = document.body.classList;
    body.add('dark');
} else {
    let body = document.body.classList;
    body.remove('dark');
}

window.addEventListener('click', modeHandler);

window.addEventListener('load', ()=>{
    let findTarget = requestAnimationFrame(detectMode);
    function detectMode(){
        if(document.body.classList.contains('dark')) {
            setTimeout(()=>{
                document.body.style.transition = `0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
            },100);
            cancelAnimationFrame(findTarget);
        } else {
            requestAnimationFrame(detectMode);
        }
    }
});

function modeHandler(ev) {
    let valid = ev.target;
    if (valid.tagName !== 'LABEL' || valid.htmlFor!='mode') return;
    ev.preventDefault();
    let mode = valid.classList.value == 'on' ? 'off' : 'on';
    updateMode.call(valid, mode);
}

function updateMode(mode) {
    let shape = {
        on: `<i class="far fa-sun"></i>`,
        off: `<i class="fas fa-moon"></i>`
    }
    let body = document.body.classList;
    clearMode.call(this);
    this.classList.add(mode);
    this.children[0].innerHTML = shape[mode];
    if(mode=='off'){
        body.add('dark');
    } else {
        body.remove('dark');
    }
    setMode(mode);
}

function clearMode() {
    this.classList.value = '';
}

function getMode() {
    let mode = sessionStorage['mode'];
    return mode ? JSON.parse(mode).dark : null;
}

function setMode(status) {
    sessionStorage['mode'] = JSON.stringify({
        dark: status,
        toggleTime: new Date()
    });
}