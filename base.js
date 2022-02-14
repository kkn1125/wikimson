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
        for (let key of [...document.querySelectorAll('.h3, .h6')]) {
            if (key.getAttribute('scroll-focus') == focus) {
                if (window.innerWidth - 17 > 576) scrollHead = document.querySelector('[put-type="wiki"]');
                else scrollHead = document.querySelector('.main');
                scrollHead.scrollTo({
                    behavior: 'smooth',
                    left: 0,
                    top: key.offsetTop
                });
            }
        }
    }
})();

wikiFilter.spy = function scrollSpy(ev) {
    let aside = document.querySelector('#lsb').children[0];

    let spy = [...document.querySelectorAll(`[scroll-to]`)];
    let titles = [...document.querySelectorAll('.h3, .h6')];
    let last = -1;
    // spy.map(s => s.classList.remove('highlight'));
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
        h: true,
    });
    else return content;
}

wikiFilter.content = function(){
    return this.content.map(c=>{
        c = wikiFilter.md(c, this.md);
        
        c = c.replace(/\-&gt;|&lt;\-|\=&gt;|&lt;\=/gm, (a,b)=>{
            if(a=='-&gt;'||a=='=&gt;')return '<span class="text-danger">&#10142;</span>';
            else if(a=='&lt;-'||a=='&lt;=') return '<span class="text-danger">&#129044;</span>';
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
        <span class="h2">${this.origin.name.split('-').map(x=>x.charAt(0).toUpperCase()+x.slice(1)).join(' ')}</span>
    </div>
    ${this.modified==''&&this.done?`<div>`:''}
    ${this.modified!=''?`<span class="tag text-muted">${new Date(this.modified).toLocaleString().slice(0,-3)} 수정됨</span>`:``}
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
        h: true,
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

wikiFilter.toc = function(){
    let html = new DOMParser().parseFromString(this.md==true?Markdown.parse(this.content.join(''), {
        ol: 'list-group reset',
        ul: 'list-group reset',
        li: 'list-item',
        blockquote: 'blockquote blockquote-info',
        h: true,
    }).replace(/\-&gt;|&lt;\-|\=&gt;|&lt;\=/gm, (a,b)=>{
        if(a=='-&gt;'||a=='=&gt;')return '&#10142;';
        else if(a=='&lt;-'||a=='&lt;=') return '&#129044;';
    }):this.content, 'text/html').body;
    let generateToc = [...html.querySelectorAll('.h3, .h6')];
    generateToc = generateToc.reduce((prev, cur)=>{
        if(cur.tagName=='H6') {
            if(!(prev[prev.length-1] instanceof Array)) prev.push([]);
            prev[prev.length-1].push(cur);
        } else {
            prev.push(cur);
        }
        return prev;
    }, []);
    let count = 0;
    
    return `${this.toc?'<div class="blockquote mt-3 pe-3"><div class="fw-bold">TOC</div><ol class="toc">':''}
    ${!this.toc?'':generateToc.map(y=>{
        function convertSyntax(target){
            if(target.match(/[\#\|\:]/g))
            return target.replace(/\#([\s\S]*?)\[([\s\S]*?)\]:end/g, (origin,text,ref,i)=>{
                return `${text}`;
            });
            else return target;
        }
        if(y instanceof Array) return `<ol>${y.map(z=>{
            return `<li scroll-to="${convertSyntax(z.innerText)}-${count++}">${convertSyntax(z.innerText)}</li>`
        }).join('')}</ol>`;
        else return `<li scroll-to="${convertSyntax(y.innerText)}-${count++}">${convertSyntax(y.innerText)}</li>`;
    }).join('')}
    ${this.toc?`</ol></div>`:``}`
}

wikiFilter.ref = function (){
    let refLink = this.ref.map(({name, link})=>{
        if(name !== '' && link !== '') {
            let nameElement = new DOMParser().parseFromString(name, 'text/html').body;
            return `<li class="list-item py-1"><a href="${link}" target="_blank" title="${nameElement.textContent}">${nameElement.innerHTML}</a></li>`;
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
    let dom = new DOMParser();
    let html = dom.parseFromString(this.md==true?Markdown.parse(this.content?.join(''), {
        ol: 'list-group reset',
        ul: 'list-group reset',
        li: 'list-item',
        blockquote: 'blockquote blockquote-info',
        h: true,
    }).replace(/\-&gt;|&lt;\-|\=&gt;|&lt;\=/gm, (a,b)=>{
        if(a=='-&gt;'||a=='=&gt;')return '&#10142;';
        else if(a=='&lt;-'||a=='&lt;=') return '&#129044;';
    }):this.content, 'text/html').body;

    let generateToc = [...html.querySelectorAll('.h3, .h6')];
    generateToc = generateToc.reduce((prev, cur)=>{
        if(cur.tagName=='H6') {
            if(!(prev[prev.length-1] instanceof Array)) prev.push([]);
            prev[prev.length-1].push(cur);
        } else {
            prev.push(cur);
        }
        return prev;
    }, []);
    
    let count = 0;
    return `
    ${!this.toc?'':generateToc.map(y=>{
        // return x.map((y, i)=>{
            function convertSyntax(target){
                if(target.match(/[\#\|\:]/g))
                return target.replace(/\#([\s\S]*?)\[([\s\S]*?)\]:end/g, (origin,text,ref,i)=>{
                    return `${text}`;
                });
                else return target;
            }
            if(y instanceof Array) return `<ol>${y.map(z=>{
                return `<li scroll-to="${convertSyntax(z.innerText)}-${count++}">${convertSyntax(z.innerText)}</li>`
            }).join('')}</ol>`;
            else return `<li scroll-to="${convertSyntax(y.innerText)}-${count++}">${convertSyntax(y.innerText)}</li>`;
        // }).join('');
    }).join('')}`;
}

wikiFilter.scrollPoint = function (){
    [...document.querySelectorAll('.h3, .h6')].forEach((x,i) => x.setAttribute('scroll-focus', `${x.textContent}-${i}`));
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
    temp += wikiFilter.toc.call(this);
    temp += wikiFilter.content.call(this);
    temp += wikiFilter.ref.call(this);
    setTimeout(() => {
        wikiFilter.scrollPoint();
        document.querySelector('[put-type="wiki"]').addEventListener('scroll', wikiFilter.scrollGauge);
        document.querySelector('.main').addEventListener('scroll', wikiFilter.scrollGauge);

        document.querySelector('[put-type="wiki"]').addEventListener('scroll', wikiFilter.spy);
        if(!document.querySelector('.prev'))
        document.querySelector('[put-type="wiki"]').insertAdjacentHTML('beforeend', `
            <button class="btn btn-danger prev" onclick="location='${this.parent.path}'">👈목록으로</button>
        `);

        let detectHljs = document.querySelector('.hljs');
        if(!detectHljs) hljs.highlightAll();

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