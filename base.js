const wikiFilter = {}

'use strict';

(function () {
    Object.defineProperty(Object.prototype, 'toCapitalize', {
        value: function (){
            return this.split(/[\_\-\.\s]+/gm).map(x=>{
                return x.charAt(0).toUpperCase()+x.slice(1);
            }).join(' ');
        }
    })

    let clicked = false;
    let head = window;
    
    window.addEventListener('mousedown', readyToResize);
    window.addEventListener('mouseup', cancelResize);
    window.addEventListener('mousemove', moveHandler);

    window.addEventListener('mousedown', readyToResize);
    window.addEventListener('mouseup', cancelResize);
    window.addEventListener('click', scrollIntoHandler);

    requestAnimationFrame(windowHandler);

    function readyToResize(ev) {
        let target = ev.target;
        if (target.id == 'resizer' && ev.which == 1) clicked = true;
    }

    function cancelResize(ev) {
        clicked = false;
    }

    function moveHandler(ev) {
        if (!clicked && ev.type !== 'touchmove') return;

        let left = ev.x;
        if (ev.type == 'touchmove') {
            left = ev.touches[0].clientX;
        }
        let leftSideBar = document.querySelector('#lsb');
        leftSideBar.style.flex = `0 0 ${left}px`;
    }

    function windowHandler(ev) {
        if(!document.querySelector('#resizer')){
            requestAnimationFrame(windowHandler);
        } else {
            cancelAnimationFrame(windowHandler);
            if (window.innerWidth - 17 < 576) {
                document.querySelector('#resizer').style.display = 'none';
            } else {
                document.querySelector('#resizer').style.display = 'flex';
            }
    
            if (navigator.userAgentData.mobile) {
                head = document.querySelector('#resizer');
                head.addEventListener('touchmove', moveHandler, {
                    passive: true
                });
            } else {
                head = window;
            }
        }
    }

    function readyToResize(ev) {
        let target = ev.target;
        if (target.id == 'resizer' && ev.which == 1) clicked = true;
    }

    function cancelResize(ev) {
        clicked = false;
    }

    function scrollIntoHandler(ev) {
        let target = ev.target;
        if (!target.getAttribute('scroll-to')) return;
        let focus = target.getAttribute('scroll-to');
        let scrollHead = null;
        let isMobile = 0;
        setTimeout(() => {
            for (let key of [...document.querySelectorAll('*')]) {
                if (key.getAttribute('scroll-focus') == focus) {
                    if (window.innerWidth - 17 > 576) scrollHead = document.querySelector('[put-type="wiki"]');
                    else scrollHead = document.querySelector('.main');

                    if(navigator.userAgent.toLowerCase().indexOf('mobile')>-1){
                        isMobile = document.querySelector('#lsb').clientHeight;
                    }

                    scrollHead.scrollTo({
                        behavior: 'smooth',
                        left: 0,
                        top: key.offsetTop + isMobile,
                    });

                    if(!key.classList.contains('focus-highlight')){
                        key.classList.add('focus-highlight');
                        setTimeout(() => {
                            key.classList.remove('focus-highlight');
                        }, 3500);
                    }
                }
            }
        }, 50);
    }
})();

wikiFilter.to = function (name){
    return `scroll-to="${name}"`
}
wikiFilter.focus = function (name){
    return `scroll-focus="${name}"`
}

wikiFilter.sup = function (name, text){
    return `<sup scroll-to="${name}" title="해당 어휘 정의로 이동합니다.">${text}</sup>`
}

wikiFilter.toRef = function (hash, name, text){
    return `<a class="ref" href="#${hash}" scroll-to="${name}" title="해당 단어 참조로 이동합니다.">${text}</a>`
}

wikiFilter.spy = function scrollSpy(ev) {
    let aside = document.querySelector('#lsb').children[0];

    let spy = [...document.querySelectorAll(`[scroll-to]`)];
    let titles = [...document.querySelectorAll('h1.h1, h2.h2, h3.h3, h4.h4, h5.h5, h6.h6')];
    let last = -1;

    for(let key of titles){
        let top = document.querySelector('[put-type="wiki"]').scrollTop;
        if (key.offsetTop - 16 < top) {
            let focus = key.getAttribute('scroll-focus');
            let spyList = document.querySelector(`[scroll-to="${focus}"]`);
            last = titles.indexOf(key);
        }
    }

    if(last>-1){
        spy.forEach((s,i)=>{
            if(i == last && !s.classList.contains('highlight')){
                s.classList.add('highlight');
                aside.scrollTo({
                    behavior: 'smooth',
                    top: s.offsetTop,
                    left: 0
                });
            } else if(i < last) {
                s.classList.remove('highlight');
            } else if(i > last) {
                s.classList.remove('highlight');
            }
        })
    }
}

wikiFilter.md = function (content, isMd){
    if(isMd)
    return Markdown.parse(content, {
        ol: 'list-group reset',
        ul: 'list-group reset',
        li: 'list-item',
        blockquote: 'blockquote blockquote-info',
        h: {
            custom: true,
            class: 'roundText',
        },
    });
    else return content;
}

wikiFilter.content = function(){
    return this.content.map(c=>{
        c = wikiFilter.md(c, this.md);
        
        c = c.replace(/\{\{([\s\S]+?)\}\}/g, (a,$1)=>{
            let child = $1.split(',').map(x=>`${x.trim()}`);
            let origin = child.reduce((p,n)=>{
                if(p) p[isNaN(n)?n:parseInt(n)];
                return p;
            },this);
            return origin;
        });

        c = c.replace(/\#([\s\S]*?)\[([\s\S]*?)\]:end/g, (origin,text,ref,i)=>{
            let page = ref.split('|').shift();
            let scroll = ref.split('|').pop();
            return `<a class="ref" href="#${page}" scroll-to="${scroll}" title='"${page}"에서 "${scroll}" 참조'>${text}</a>`;
        });
        // table syntax convert
        c = c.replace(/t[hb]:\s?[\S\s]*?[\s\n]*?:end/gm, (match)=>{
            match = match.split('@').map(x=>{
                if(x.match(':end')) return '';
                let sp = x.trim().split(/\:\s?/).map(y=>y.trim());
                if(sp[0].match(/th/g)){
                    return `<thead><tr>${sp[1].split('|').map((y,i)=>`<th${i==0?` width="15%"`:''}>${y}</th$>`).join('')}</tr></thead>`;
                } else {
                    return `<tbody>${sp[1].split('\\').map(y=>'<tr>'+y.split('|').map(z=>`<td>${z.match(/\!/)?`<span class="w-block text-center fw-bold">${z.replace('!','').replace('<br>','')}</span>`:z}</td>`).join('')+'<tr>').join('')}</tbody>`;
                }
            });
            return `<table class="table">${match.filter(y=>y!='').join('')}</table>`
        });
        return `${c}<br>`;
    }).join('')
}

wikiFilter.modified = function(){
    return `<div>
        <span class="h1 roundText">${this.origin.name.split('-').map(x=>x.charAt(0).toUpperCase()+x.slice(1)).join(' ')}</span>
    </div>
    ${this.modified==''&&this.done?`<div>`:''}
    ${this.modified!=''?`<span class="tag text-muted">${new Date(this.modified).toLocaleString().slice(0,-3)} 수정 됨</span>`:``}
    ${this.done?'':`<span class="tag tag-warning">아직 완료되지 않은 문서입니다.</span>`}
    ${this.modified==''&&this.done?`</div>`:''}`
}

wikiFilter.regdate = function(){
    let during = new Date(new Date() - new Date(this.wrote)).getTime();
    let date = parseInt(during/24/60/60/1000);
    let hour = parseInt(during/60/60/1000%24);
    let min = parseInt(during/60/1000%60);

    let duringMsg = `${date>0?`${date}일 `:''}${hour>0&&date==0?`${hour}시 `:''}${min>0&&date==0?`${min}분 `:'방금 '}전`;

    let words = new DOMParser().parseFromString(this.md==true?Markdown.parse(this.content.join(''), {
        ol: 'list-group reset',
        ul: 'list-group reset',
        li: 'list-item',
        blockquote: 'blockquote blockquote-info',
        h: {
            custom: true,
            class: 'roundText',
        },
    }).replace(/\-&gt;|&lt;\-|\=&gt;|&lt;\=/gm, (a,b)=>{
        if(a=='-&gt;'||a=='=&gt;')return '&#10142;';
        else if(a=='&lt;-'||a=='&lt;=') return '&#129044;';
    }):this.content, 'text/html').body.textContent.trim().length;

    return `<ul class="list-group">
        <li class="list-item py-1">
            <span class="tag">tags</span>
            <ul class="w-inline-flex gx-1">
                ${this.tags.map(x=>`<li class="tag tag-info">${x}</li>`).join('')}
            </ul>
        </li>
        <li class="list-item py-1">
            <span class="tag">categories</span>
            <ul class="w-inline-flex gx-1">
                ${this.categories.map(x=>`<li class="tag tag-success">${x}</li>`).join('')}
            </ul>
        </li>
        <li class="list-item py-1">
            <span class="tag">작성자</span>
            <span>${this.authors.map(x=>`<span class="tag text-muted">${x}</span>`).join('')}</span>
            <span class="tag">작성일</span>
            <time class="tag time text-muted">${date<1?duringMsg:new Date(this.wrote).toLocaleString().slice(0,-3)}</time>
        </li>
        <li class="list-item py-1 fs-7">
            <span class="tag">Read Time</span>
            <span class="tag text-danger">${Math.ceil(words/250)} min</span>
        </li>
    </ul>`
}

wikiFilter.img = function (url, ref, title='sample', focus){
    let baseurl = './src/images/';
    return `<figure class="text-center"${focus?' '+focus:''}>
        <img src="${url.match(/^http|^https/g)?'':baseurl}${url}" alt="${title}" title="${title}">
        <figcaption class="bg-light p-2 text-muted"><span class="tag tag-light">ref</span><sup class="img"></sup> ${ref}</figcaption>
    </figure>`;
}

wikiFilter.createToc = function (){
    let html = new DOMParser().parseFromString(this.md==true?Markdown.parse(this.content.join(''), {
        ol: 'list-group reset',
        ul: 'list-group reset',
        li: 'list-item',
        blockquote: 'blockquote blockquote-info',
        h: {
            custom: true,
            class: 'roundText',
        },
    }).replace(/\-&gt;|&lt;\-|\=&gt;|&lt;\=/gm, (a,b)=>{
        if(a=='-&gt;'||a=='=&gt;')return '&#10142;';
        else if(a=='&lt;-'||a=='&lt;=') return '&#129044;';
    }):this.content, 'text/html').body;

    let genToc = [...html.querySelectorAll('.h1,.h2,.h3,.h4,.h5,.h6')];

    let stack = [];
    let temp = '';
    let bid = -1, cid = 0;
    let count = 0;

    genToc.forEach(h=>{
        cid = parseInt(h.tagName.slice(-1));

        if(cid>bid){
            let gap = cid - (bid==-1?cid-1:bid);
            for(let i=0; i<gap; i++){
                stack.push('ol');
                temp += `<${stack[stack.length-1]}>`;
            }
        } else if(cid < bid){
            let gap = bid - cid;
            for(let i=0; i<gap; i++){
                temp += `</${stack.pop()}>`;
            }
        }

        temp += `<li scroll-to="${h.innerText.trim()}-${count++}">${h.innerText.replace(/\{\:(.+)\}/g, '')}</li>`;

        bid = cid;
    });

    let converted = new DOMParser().parseFromString(temp, 'text/html').body;
    converted.querySelector('ol').classList.add('toc');

    return converted.querySelector('ol').outerHTML;
}

wikiFilter.ref = function (){
    let refLink = this.ref.map(({name, link, to})=>{
        if(name !== '' && link !== '') {
            let nameElement = new DOMParser().parseFromString(name, 'text/html').body;
            return `<li class="list-item py-1"><a href="${link}" target="_blank" title="${nameElement.textContent}"${to?' scroll-to="'+to.trim()+'"':''}>${nameElement.innerHTML}</a></li>`;
        } else {
            return '';
        }
    }).join('');
    if(refLink.trim()=='')  refLink = null;
    else refLink = '<ol class="list-group">'+refLink+'</ol>';

    return `${this.ref.length>0?'<hr>':''}
    ${refLink?`<div><span class="fw-bold">&#x1F4CC; 함께보면 좋은 자료</span>${refLink}</div>`:''}`;
}

wikiFilter.sidebar = function (){
    return `${!this.toc?'':wikiFilter.createToc.call(this)}`;
}

wikiFilter.scrollPoint = function (){
    [...document.querySelectorAll('h1.h1, h2.h2, h3.h3, h4.h4, h5.h5, h6.h6')].forEach((x,i) => x.setAttribute('scroll-focus', `${x.textContent.trim()}-${i}`));
}

wikiFilter.scrollGauge = function(ev){
    const scrollTop = ev.target.scrollTop;
    const scrollHeight = ev.target.scrollHeight;
    const gap = ev.target.clientHeight;

    const realHeight = scrollHeight - gap;

    document.querySelector('.gauge-bar').style.width = `${parseFloat((parseFloat(scrollTop/realHeight)*100).toFixed(2))}%`;
}

wikiFilter.all = function(){
    let temp = '';
    temp += wikiFilter.modified.call(this);
    temp += wikiFilter.regdate.call(this);
    temp += `${this.toc?'<div class="blockquote mt-3 pe-3"><div class="fw-bold">TOC</div>':''}` + wikiFilter.createToc.call(this) + `${this.toc?`</div>`:``}`;
    temp += wikiFilter.content.call(this);
    temp += wikiFilter.ref.call(this);
    setTimeout(() => {
        wikiFilter.scrollPoint();

        document.querySelector('[put-type="wiki"]').addEventListener('scroll', wikiFilter.scrollGauge);
        document.querySelector('.main').addEventListener('scroll', wikiFilter.scrollGauge);
        document.querySelector('[put-type="wiki"]').addEventListener('scroll', wikiFilter.spy);

        document.querySelector('[put-type="wiki"]').addEventListener('scroll', wikiFilter.scrollGauge);
        document.querySelector('.main').addEventListener('scroll', wikiFilter.scrollGauge);
        document.querySelector('[put-type="wiki"]').addEventListener('scroll', wikiFilter.spy);

        if(!document.querySelector('.prev'))
        document.querySelector('[put-type="wiki"]').insertAdjacentHTML('beforeend', `
            <button class="btn btn-danger prev" onclick="location='${this.parent.path}'">👈목록으로</button>
        `);

        let detectHljs = document.querySelector('.hljs');
        if(!detectHljs) {
            hljs.highlightAll();
            hljs.initLineNumbersOnLoad();
        }

        if(document.querySelector('.next-post')) document.querySelector('.next-post').remove();

        let modules = Object.keys(this.parent.page.module);
        let idx = modules.indexOf('$'+this.origin.path.slice(1).replace(/[\-]/g, '_'));

        if(modules.length-1>idx+1){
            document.querySelector('.gnb').insertAdjacentHTML('afterend', `<div class="next-post fs-7"><button class="btn btn-brand" onclick="location='${this.parent.page.module[modules[idx+1]].path}'">Next</button> <span class="post-name">${this.parent.page.module[modules[idx+1]].convertedName}</span></div>`);
        }
    }, 1);

    return temp;
}

function templateInsertAsync({...options}){
    const id = new Date().getTime().toString().split('').map(x=>String.fromCharCode(65+parseInt(x))).join('');
    
    (async function(){
        let result;

        if(options.string) result = options.string;

        if(options.url){
            let res = await fetch(options.url);
            let data = await res.text();
            result = data;
        }

        window[options.type||'setTimeout'](() => {
            let target = document.querySelector(`#${id}`);
            if(target && target.tagName == 'TEMP') {
                target.insertAdjacentHTML('afterend', `<span id="${id}" class="delay-injection">${result||''}</span>`);
                target.remove();
            } else if(target) target.textContent = result;

            if(target && options.string) result = parseInt(result) + options.increase;
            else if(target && !options.string) result = new options.increase();
        }, options.delay);
    })();

    return `<temp id="${id}"></temp>`;
}

function watch(){
    let cur = location.hash.slice(1);
    if(cur != 'home' && cur != ''){
        document.title = 'Wikimson' + '::' + cur;
    } else {
        document.title = 'Wikimson';
    }
    requestAnimationFrame(watch);
    document.querySelectorAll('ul,ol').forEach(el=>{
        el.querySelectorAll('br').forEach(x=>{
            x.remove();
        })
    })
}

requestAnimationFrame(watch);

let tops, lefts, widths, heights, padding, time='', fm=false, onWords = false;

window.onload = ()=>{
    if(!sessionStorage['readmode']) sessionStorage['readmode'] = false;
    let t = JSON.parse(sessionStorage['readmode']);
    document.querySelector('#focusMode').checked = t;
    fm = t;
}

window.addEventListener('click', (ev)=>{
    const focus_mode = ev.target;

    setTimeout(() => {
        let fms = JSON.parse(sessionStorage['readmode']);
        document.querySelector('#focusMode').checked = fms;
        fm = fms;
    });

    if(!sessionStorage['readmode']) sessionStorage['readmode'] = 'false';

    if(focus_mode.id != 'focusMode') return;

    if(focus_mode.checked){
        fm = true;
    } else {
        const focus = document.querySelector('.focused');
        if(focus) focus.remove();
        fm = false;
    }

    sessionStorage['readmode'] = JSON.stringify(fm);

})

window.addEventListener('mouseover', (ev)=>{
    const p = ev.target;
    const focus = document.querySelector('.focused');
    const bt = document.querySelector('.block-time');
    if(!fm) return;
    if(p.closest('p, blockquote') || (p.closest('li') && p.closest('main'))) {
        let closer = p.closest('li,p, blockquote');
        let rect = closer.getBoundingClientRect();

        if(p.closest('li')) {
            padding = 0.5;
            time = '';
        }
        if(p.closest('p, blockquote')) {
            padding = 1;
            let wordsLength = p.closest('p, blockquote').textContent.trim().length;
            let min = parseInt(wordsLength/250);
            let sec = parseInt(wordsLength/(250/60));
            let toggleTime = [min>0?`${min} m`:'',sec>0?`${sec} s`:``];
            time = `${wordsLength} word${wordsLength>1?'s':''} / ${toggleTime.join(' ')}`;
        }

        tops = closer.offsetTop;
        lefts = closer.offsetLeft;
        widths = rect.width;
        heights = rect.height;
        onWords = true;
    } else {
        onWords = false;
        setTimeout(()=>{
            if(!onWords && bt){
                widths = 0;
                heights = 0;
                padding = 0;
                time = '';

                bt.innerHTML = '';
                bt.innerHTML = time;
                focus.style.top = `${tops}px`;
                focus.style.left = `${lefts}px`;
                focus.style.width = `${widths}px`;
                focus.style.height = `${heights}px`;
                if(padding!=null){
                    focus.style.padding = `${padding}rem`;
                    focus.style.transform = `translate(-${padding}rem, -${padding}rem)`;
                } else {
                    focus.style.padding = `${padding}rem`;
                    focus.style.transform = `translate(-${padding}rem, -${padding}rem)`;
                }
            }
        }, 500);
    }

    if(!p.closest('main')) {
        if(focus)
        document.querySelectorAll('.focused').forEach(el=>el.remove());
        return;
    }

    if(!focus)
    document.querySelector('main').insertAdjacentHTML('beforeend', `<div class="focused"><span class="block-time"></span></div>`);

    if(focus){
        bt.innerHTML = '';
        bt.innerHTML = time;
        focus.style.top = `${tops}px`;
        focus.style.left = `${lefts}px`;
        focus.style.width = `${widths}px`;
        focus.style.height = `${heights}px`;
        if(padding!=null){
            focus.style.padding = `${padding}rem`;
            focus.style.transform = `translate(-${padding}rem, -${padding}rem)`;
        } else {
            focus.style.padding = `${padding}rem`;
            focus.style.transform = `translate(-${padding}rem, -${padding}rem)`;
        }
    }
});

setTimeout(()=>{
    Object.assign(document.body.insertAdjacentElement('beforeEnd', document.createElement('script')),{
        src: 'https://cdn.jsdelivr.net/gh/kkn1125/penli@dabfbd0/docs/assets/js/penli.js',
        integrity: 'sha384-v8IcF+Ajik1Du5Pn4UGwOVizMisxuU6LhXVsWYy1WdP2+1MxTdeJRHuYeDAdtQ6v',
        crossorigin: 'anonymous',
    });
    setTimeout(()=>{
        settingHandler();
        wikiFilter.scrollPoint();
    }, 100);
}, 150);