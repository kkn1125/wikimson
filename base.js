const wikiFilter = {}

'use strict';

(function () {
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
    let spy = [...document.querySelectorAll(`[scroll-to]`)];

    spy.map(s => s.classList.remove('highlight'));

    [...document.querySelectorAll('.h3, .h6')].forEach(key=>{
        let top = document.querySelector('[put-type="wiki"]').scrollTop;
        if (key.offsetTop - 16 < top) {
            let focus = key.getAttribute('scroll-focus');
            spy.map(s => {
                if (document.querySelector(`[scroll-to="${focus}"]`) == s) {
                    s.classList.add('highlight');
                } else {
                    s.classList.remove('highlight');
                }
            });
        }
    });
}

wikiFilter.content = function(){
    return this.content.map(c=>{
        c = c.replace(/->|<-/gm, (a,b)=>{
            if(a=='->')return '&#10142;';
            else if(a=='<-') return '&#129044;';
        });
        c= c.replace(/\#([\s\S]*?)\[([\s\S]*?)\]:end/g, (origin,text,ref,i)=>{
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
                    return `<tbody>${sp[1].split('\\').map(y=>'<tr>'+y.split('|').map(z=>`<td>${z.match(/\!/)?`<span class="w-block text-center fw-bold">${z.replace('!','')}</span>`:z}</td>`).join('')+'<tr>').join('')}</tbody>`;
                }
            });
            return `<table class="table">${match.filter(y=>y!='').join('')}</table>`
        });
        return `${c}<br>`;
    }).join('')
}

wikiFilter.modified = function(){
    return `<div>
        <span class="h2">${this.title.split('-').map(x=>x.charAt(0).toUpperCase()+x.slice(1)).join(' ')}</span>
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
    </ul>`
}

wikiFilter.toc = function(){
    let dom = new DOMParser();
    let html = dom.parseFromString(this.content.join('').replace(/\-\>|\<\-/gm, (a,b)=>{
        if(a=='->')return '&#10142;';
        else if(a=='<-') return '&#129044;';
    }), 'text/html').body;

    const generateToc = [...html.querySelectorAll('.h3')].map(x=>{
        let save = [];
        if(x.parentNode.nextElementSibling){
            save.push(x);
            save.push([...x.parentNode.nextElementSibling.querySelectorAll('.h6')]);
        } else {
            save.push(x);
        }
        return save;
    });
    
    return `${this.toc?'<div class="blockquote mt-3 pe-3"><div class="fw-bold">TOC</div><ol class="toc">':''}
    ${!this.toc?'':generateToc.map(x=>{
        let count = 0;
        return x.map((y, i)=>{
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
        }).join('');
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
    let html = dom.parseFromString(this.content.join('').replace(/\-\>|\<\-/gm, (a,b)=>{
        if(a=='->')return '&#10142;';
        else if(a=='<-') return '&#129044;';
    }), 'text/html').body;

    const generateToc = [...html.querySelectorAll('.h3')].map(x=>{
        let save = [];
        if(x.parentNode.nextElementSibling){
            save.push(x);
            save.push([...x.parentNode.nextElementSibling.querySelectorAll('.h6')]);
        } else {
            save.push(x);
        }
        return save;
    });
    
    return `
    ${!this.toc?'':generateToc.map(x=>{
        let count = 0;
        return x.map((y, i)=>{
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
        }).join('');
    }).join('')}`;
}

wikiFilter.scrollPoint = function (){
    [...document.querySelectorAll('.h3, .h6')].forEach((x,i) => x.setAttribute('scroll-focus', `${x.textContent}-${i}`));
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
        document.querySelector('[put-type="wiki"]').addEventListener('scroll', wikiFilter.spy);
        if(!document.querySelector('.prev'))
        document.querySelector('[put-type="wiki"]').insertAdjacentHTML('beforeend', `
            <button class="btn btn-danger prev" onclick="location='${this.parent.path}'">👈이전 페이지</button>
        `);

        let detectHljs = document.querySelector('.hljs');
        if(!detectHljs) hljs.highlightAll();
    }, 1);
    return temp;
}

function watch(){
    let cur = location.hash.slice(1);
    if(cur != 'home' && cur != ''){
        document.title = 'Wikimson' + '::' + cur;
    } else {
        document.title = 'Wikimson';
    }
    requestAnimationFrame(watch);
}

requestAnimationFrame(watch);

setTimeout(()=>{
    Object.assign(document.body.insertAdjacentElement('beforeEnd', document.createElement('script')),{
        src: 'https://cdn.jsdelivr.net/gh/kkn1125/penli@dabfbd0/docs/assets/js/penli.js',
        integrity: 'sha384-v8IcF+Ajik1Du5Pn4UGwOVizMisxuU6LhXVsWYy1WdP2+1MxTdeJRHuYeDAdtQ6v',
        crossorigin: 'anonymous',
    });

    setTimeout(()=>{
        settingHandler();
    }, 500);
    // wikiFilter.scrollPoint();
},100);