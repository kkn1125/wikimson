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
                        <a class="nav-link" href="#${sbj}">${sbj}</a>
                    <span class="text-gray text-opacity-25"> | </span><span class="ms-2 fs-8 text-muted"><time class="text-dark">${new Date(info.wrote).toLocaleString().slice(0,-3)}</time></span></li>`).join(''):`<li class="list-item">찾은 내용이 없습니다.</li>`}
                    <li class="py-0"><span class="tag">검색결과 <span class="text-brand">${list.length}</span> 건</span></li>
                </ul>
            </div>
        `);
    }
}

// window.addEventListener('click', finderHandler);
window.addEventListener('input', finderHandler);
window.addEventListener('keydown', finderExit);
window.addEventListener('click', finderReload);

function finderReload(ev){
    const target = ev.target;
    let list = [];

    if(target.id !='finder') {
        if(document.getElementById('foundResult')) document.getElementById('foundResult').remove();
        return;
    }
    wikibundle.forEach(({sbj,info})=>{
        if(target.value!=''){
            let lower = target.value.toLowerCase();
            if(sbj.match(lower) || (info.title && info.tags && (info.title.match(lower) || info.tags.filter(x=>x.match(lower)).length>0))){
                if(info.published==true) list.push({sbj:sbj,info:info});
            }
        } else {
            setTimeout(()=>{
                if(document.getElementById('foundResult')) document.getElementById('foundResult').remove();
            })
        }
    });
    if(target.value!='') resultTemplate.render(list);
}

function finderExit(ev){
    if(ev.key!='Escape') return;

    if(document.getElementById('foundResult')) document.getElementById('foundResult').remove();
    ev.target.value = '';
}

function finderHandler(ev){
    let target = ev.target;
    let list = [];
    if(target.id != 'finder') return;
    wikibundle.forEach(({sbj,info})=>{
        if(target.value!=''){
            let lower = target.value.toLowerCase();
            if(sbj.match(lower) || (info.title && info.tags && (info.title.match(lower) || info.tags.filter(x=>x.match(lower)).length>0))){
                if(info.published==true) list.push({sbj:sbj,info:info});
            }
        } else {
            setTimeout(()=>{
                if(document.getElementById('foundResult')) document.getElementById('foundResult').remove();
            })
        }
    });
    resultTemplate.render(list);
}