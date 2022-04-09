'use strict';
import {Router} from '../../core/core.js'
let focus = false;
window.wikibundle=null;

setTimeout(()=>wikibundle = Object.entries(Router).map(([key, value])=>{return {sbj:key,info:value.page}}).filter(({sbj})=>sbj!='about'&&sbj!='404'&&sbj!='home'));

let resultTemplate = {
    render: function(list){
        if(document.getElementById('foundResult')) document.getElementById('foundResult').remove();

        finder.parentNode.insertAdjacentHTML('beforeEnd', 
        `<div id="foundResult">
                <ul class="mt-1 mb-5 px-5 rounded-5 list-group border border-1 border-warning">
                    ${list.length>0?list.map(({sbj,info})=>`
                    <li class="list-item py-1">
                        <a class="nav-link" href="${info.origin.path}">${info.origin.name}</a>
                    <span class="text-gray text-opacity-25"> | </span><span class="ms-2 fs-8 text-muted"><time class="text-dark">${new Date(info.wrote).toLocaleString().slice(0,-3)}</time></span></li>`).join(''):`<li class="list-item">찾은 내용이 없습니다.</li>`}
                    <li class="py-0"><span class="tag">검색결과 <span class="text-brand">${list.length}</span> 건</span></li>
                </ul>
            </div>
        `);
    }
}

if(document.getElementById('finder')) {
    window.addEventListener('input', finderHandler);
    window.addEventListener('click', finderHandler);
    window.addEventListener('keydown', finderExit);
    window.addEventListener('keyup', listHandler);
}

let pointer = 0;
function listHandler (e) {
    const target = e.target;
    if(target.id != 'finder') return;
    // input 없을 때는 막기
    
    const key = e.key.toLowerCase();
    const list = [];
    const listWrap = [...document.querySelectorAll('#foundResult .list-item')];

    findPosts(target, list);

    let max = list.length-1;
    let isFirst = pointer == 0;
    let isLast = pointer == max;

    let activating = () => {
        listWrap.forEach(x=>x.classList.remove('active'));
        listWrap[pointer].classList.add('active');
        
        document.querySelector('main').scrollTo(0, listWrap[pointer].offsetTop - document.querySelector("#finder").offsetTop)
    }
    
    switch(key) {
        case 'arrowup':
            pointer = pointer <= 0 ? 0 : pointer - 1;
            // console.log('up', pointer);
            activating();
            if(isFirst) console.log('first');
            break;
        case 'arrowdown':
            pointer = pointer >= max ? max : pointer + 1;
            // console.log('down', pointer);
            activating();
            if(isLast) console.log('last!');
            break;
        case 'enter':
            const a = document.createElement('a');
            a.href = list[pointer].info.origin.path;
            document.body.append(a);
            a.click();
            if(a) a.remove();
            break;
        default: activating(); break;
    }
}

function clearResult (){
    if(document.getElementById('foundResult')) document.getElementById('foundResult').remove();
    pointer = 0;
}

function findPosts(target, list){
    wikibundle.forEach(({sbj,info})=>{
        if(target.value!=''){
            let lower = target.value.toLowerCase();
            if(sbj.match(lower) || (info.title && info.tags && (info.title.match(lower) || info.tags.filter(x=>x.match(lower)).length>0)) || (info.content?.some(c=>new RegExp(lower, 'gi').test(c))||false)){
                if(info.published==true) list.push({sbj:sbj,info:info});
            }
        } else {
            setTimeout(()=>{
                clearResult();
            })
        }
    });
}

function finderExit(ev){
    if(ev.key!='Escape') return;

    clearResult();
    ev.target.value = '';
}

function finderHandler(ev){
    const target = ev.target;
    let list = [];

    if(target.id !='finder') {
        clearResult();
        return;
    }

    findPosts(target, list);

    if(target.value!='') resultTemplate.render(list);
}