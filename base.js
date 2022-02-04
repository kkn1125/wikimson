const wikiFilter = {}

'use strict';

Object.defineProperty(Object.prototype, 'toCapitalize', {
    value: function (){
        return this.split(/[\_\-\.\s]+/gm).map(x=>{
            return x.charAt(0).toUpperCase()+x.slice(1);
        }).join(' ');
    }
})

const Markdown = (function () {
    function Controller() {
        let models;

        this.init = function (model) {
            models = model;
        }
    }

    function Model() {
        let views;
        let md;
        let temp;

        this.init = function (view) {
            views = view;
            md = views.getMd();
            
            if(md.match(/\<[\/\w\s]+\>/gm)) return md;
            this.parse();
            return views.renderView(md);
        }

        this.parse = function () {
            // this.br();
            this.line();
            this.ul();
            this.ol();
            this.h();
            this.altH();
            this.img();
            this.a();
            this.font();
            this.pre();
            this.blockquote();
            this.p();
            this.removeEmpty();
        }

        this.removeEmpty = function (){
            md = md.replace(/(\<p\>)([\s\S\n]*?)(\<\/p\>)/gim, (a, $1,$2,$3)=>{
                if($2.trim()=='') return '';
                return $1+$2.trim()+$3;
            });
        }

        this.ul = function () {
            // md = md.replace(/^\s*\-\s[\s\S]+?\n/gim, ($,$1,$2)=>{
            //     if($1)
            //     return `<li>${$2}</li>`;
            // });
            let remember = null;
            let first = 0;
            
            let temp = ``;
            temp += md.match(/\-\s(.|\s)+/gm).map((a,$1,$2)=>{
                return a.split(/\n{2}/gm).map((x, i)=>{
                    if(remember != i) temp = `</ul><ul class="list-group reset">`;

                    remember = i;
                    return x.split(/\n/gm).filter(z=>z.trim()!='').map(y=>{
                        if(i==0 && y.match(/^\s+/)){
                            first = y.match(/^\s+/)[0].split('').length;
                        } else if(i>0 && y.match(/^\s+/)){
                            if(y.match(/^\s+/)[0].split('').length<=first){
                                temp = `</ul><ul class="list-group reset">`;
                            } else {
                                temp = `<ul class="list-group reset">`;
                            }
                        }

                        let tmp = temp;
                        temp = '';
                        return tmp+`<li class="list-item">${y.replace(/^[\-\s]+/gm,'').trim()}</li>`;
                    }).join('');
                }).join('');
            }).join('');
            temp += `</ul>`;

            md = md.replace(/^\s+?\-\s?([\s\S]+?)\s?$/gm, ()=>{
                let tmp = temp; // 중복 해결...
                temp = '';
                return tmp;
            });
        }

        this.ol = function () {
            let temp = `<ol class="list-group reset">`;
            temp += md.match(/([0-9])\.\s?([\s\S]+?)\n/gm).map(x=>{
                return `<li class="list-item">${x.split('.').pop().trim()}</li>`;
            }).join('');
            temp += `</ol>`;
            md = md.replace(/([0-9])\.\s?([\s\S]+?)\n/gm, ()=>{
                let tmp = temp; // 중복 해결...
                temp = '';
                return tmp;
            });
        }

        this.br = function () {
            md = md.replace(/[\s]{2}$/gm, '<br>');
        }

        this.h = function () {
            md = md.replace(/[\#]{6}(.+)/g, (a,$1)=>{
                return `<div><span class="h6">${$1.trim()}</span></div>`;
            });
            md = md.replace(/[\#]{5}(.+)/g, (a,$1)=>{
                return `<div><span class="h5">${$1.trim()}</span></div>`;
            });
            md = md.replace(/[\#]{4}(.+)/g, (a,$1)=>{
                return `<div><span class="h4">${$1.trim()}</span></div>`;
            });
            md = md.replace(/[\#]{3}(.+)/g, (a,$1)=>{
                return `<div><span class="h3">${$1.trim()}</span></div>`;
            });
            md = md.replace(/[\#]{2}(.+)/g, (a,$1)=>{
                return `<div><span class="h2">${$1.trim()}</span></div>`;
            });
            md = md.replace(/[\#]{1}(.+)/g, (a,$1)=>{
                return `<div><span class="h1">${$1.trim()}</span></div>`;
            });
        }

        this.altH = function () {
            md = md.replace(/^(.+)\n\=+/gm, '<h1>$1</h1>');
            md = md.replace(/^(.+)\n\-+/gm, '<h2>$1</h2>');
        }

        this.a = function () {
            md = md.replace(/\[([\s\S]+?)\]\(([A-z0-9ㄱ-힣\.\/\-\_\:\s]+)\s*[\'\"]*([A-z0-9ㄱ-힣\s]*)[\'\"]*\)/gm, `<a href="$2" title="$3">$1</a>`);
        }

        this.img = function () {
            md = md.replace(/!\[([\s\S]+?)\]\(([A-z0-9ㄱ-힣\.\/\-\_\:\s]+)\s*[\'\"]*([A-z0-9ㄱ-힣\s]*)[\'\"]*\)/gm, `<img src="$2" alt="$1" title="$3">`);
        }

        this.font = function () {
            //font styles
            md = md.replace(/[\*\_]{2}([^\*\_]+)[\*\_]{2}/g, '<b>$1</b>');
            md = md.replace(/[\*\_]{1}([^\*\_]+)[\*\_]{1}/g, '<i>$1</i>');
            md = md.replace(/[\~]{2}([^\~]+)[\~]{2}/g, '<del>$1</del>');
        }

        this.pre = function () {
            md = md.replace(/^\s*\n\`\`\`(([^\s]+))?/gm, '<pre class="$2">');
            md = md.replace(/^\`\`\`\s*\n/gm, '</pre>\n\n');
        }

        this.code = function () {
            md = md.replace(/[\`]{1}([^\`]+)[\`]{1}/g, '<code>$1</code>');
        }

        this.p = function () {
            md = md.replace(/^\s*(\n)?(.+)/gm, function (m) {
                return /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img|div|span)/.test(m) ? m : '<p>' + m + '</p>';
            });
        }

        this.blockquote = function () {
            md = md.replace(/^\>(.+)/gm, (a,$1)=>{
                return `<blockquote>${$1.trim()}</blockquote>`;
            });
        }

        this.line = function () {
            md = md.replace(/(\-|\=){3,}/gm, (a,$1)=>{
                return `<hr>`;
            });
        }
    }

    function View() {
        let parts;

        this.init = function (part) {
            parts = part;
        }

        this.getMd = function () {
            return parts;
        }

        this.renderView = function (md) {
            return md;
        }
    }
    return {
        parse(str) {
            const view = new View();
            const model = new Model();
            const controller = new Controller();

            view.init(str);
            controller.init(model);
            return model.init(view);
        }
    }
})();

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
            console.log(key.getAttribute('scroll-focus') , focus)
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
        c = Markdown.parse(c);

        c = c.replace(/->|<-/gm, (a,b)=>{
            if(a=='->')return '&#10142;';
            else if(a=='<-') return '&#129044;';
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
    
    let html = dom.parseFromString(Markdown.parse(this.content.join('')).replace(/\-\>|\<\-/gm, (a,b)=>{
        if(a=='->')return '&#10142;';
        else if(a=='<-') return '&#129044;';
    }), 'text/html').body;
    // console.log([...html.querySelectorAll('.h3,.h6')])
    const generateToc = [...html.querySelectorAll('.h3')]
    .map(x=>{
        let save = [];
        if(x.parentNode.nextElementSibling){
            save.push(x);
            save.push([...x.parentNode.nextElementSibling.querySelectorAll('.h6')]);
        } else {
            save.push(x);
        }
        return save;
    });
    let count = 0;
    
    return `${this.toc?'<div class="blockquote mt-3 pe-3"><div class="fw-bold">TOC</div><ol class="toc">':''}
    ${!this.toc?'':generateToc.map(x=>{
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
    let html = dom.parseFromString(Markdown.parse(this.content?.join('')).replace(/\-\>|\<\-/gm, (a,b)=>{
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
    document.querySelectorAll('ul,ol').forEach(el=>{
        el.querySelectorAll('br').forEach(x=>{
            x.remove();
        })
    })
}

requestAnimationFrame(watch);