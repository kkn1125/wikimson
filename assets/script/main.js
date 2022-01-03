'use strict';

(function () {
    const title = `<span class="text-subpoint">Wiki</span>mson`;
    const main = `<span class="text-subpoint h1" style="-webkit-text-stroke-width: medium;
    ">ㄴㅇㄱ</span><span class="fs-3 text-end ms-5">나를 위한 기록</span>`;

    const wiki = wikiRouter;

    window['wikimson'] = Object.entries(wiki);

    const templates = {
        base: {
            render: function ([nav, side, footer]) {
                return `
                <nav class="gnb position-sticky bg-light us-none gnb-primary" put-name="${nav}"></nav>
                <div class="main">
                    <aside id="lsb" class="side-bar side-bar-size-3 overflow-hidden" data-side-bar="left" put-name="${side}"></aside>
                    <span id="resizer" class="resizer bg-light">
                        <span class="dotted"></span>
                        <span class="dotted"></span>
                        <span class="dotted"></span>
                    </span>
                    <main class="fence-full fence-lg overflow-sm-auto" put-type="wiki">
                    </main>
                </div>
                <footer class="footer bg-light p-3 text-center fs-7 text-muted" put-name="${footer}"></footer>
                `;
            }
        },
        baseModule: {
            nav:{
                render: function(){
                    return `<div class="gnb-inner gnb-expand-md hide align-items-center">
                    <div class="brand fw-bold w-flex align-items-center">
                        <a href="#home">${title}</a>
                    </div>
                    <div class="menu-btn me-3">
                        <button class="btn btn-light text-gray fs-4 px-2" data-target="#gnbMenu" style="line-height: 1">
                            <i class="fas fa-bars"></i>
                        </button>
                    </div>
                    <ul id="gnbMenu" class="gnb-menu gx-2 w-flex">
                        ${Object.keys(wiki).filter(x=>x=='home' || x=='about' || x=='interview' || x=='algorithm').map(x=>`<li><a class="nav-link" href="#${x}">${x}</a></li>`).join('')}
                        <li id="mode"></li>
                    </ul>
                </div>`; // x!='home' && wiki[x].published
                }
            },
            'side-bar': {
                render: function(){
                    return `
                        <div class="p-5 border flex-basis-100 overflow-auto">
                            <div class="position-static position-sticky-sm" style="top: 111.375px;" put-type="side-bar-item"></div>
                        </div>`;
                }
            },
            footer: {
                render: () => `
                    <div>
                        <span>copyright author kimson</span>
                        <span class="vr"></span>
                        <ul class="w-inline-flex gx-3">
                            <li>
                                <a href="https://kkn1125.github.io" target="_blank">Blog</a>
                            </li>
                            <li>
                                <a href="https://github.com/kkn1125/wikimson" target="_blank">Repository</a>
                            </li>
                            <li>
                                <a href="#about">About</a>
                            </li>
                        </ul>
                    </div>
                `,
            },
            home: {
                render: function () {
                    let wikis = Object.keys(wiki).filter(x=>x!='about' && wiki[x].published);
                    return `<div class="mt-5 p-5 border border-1 border-light rounded-5">
                        <div class="mt-3">
                            <div class="roundText">${main}</div>
                        </div>
                        <div class="mt-3">
                            <div class="w-flex align-items-baseline">
                                <span class="h4 roundText">Wiki List</span>
                                <span class="ms-2 fs-6 tag tag-info" data-pop-type="msg" data-msg="위키 리스트 카운트 입니다." data-msg-dir="end">${wikis.length}</span>
                            </div>
                            <div class="w-100">
                                <input id="finder" class="col-20 form-input form-input-lg" type="text" placeholder="검색어를 입력하세요">
                            </div>
                            <div>
                                <blockquote class="blockquote">
                                용어에 대한 지식을 기록하는 페이지입니다. 틀린 부분 등은 지적해주시면 정정하도록 하겠습니다.
                                </blockquote>
                                <div>
                                    <span class="fs-5 fw-bold roundText">Notice</span>
                                    <ul class="list-group">
                                        <li class="list-item frt-none">위키 페이지를 사용하고 싶으시다면 저장소를 포크하시면 됩니다.</li>
                                        <li class="list-item frt-none"> 아직 코드가 완전히 정리되지 않았고 사용하는 문법 파서가 있기 때문에 추후 사용법을 올리겠습니다.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>`;
                    // <ul class="list-group">
                    //     ${wikis.map(x=>x!='home'?`<li class="list-item"><a class="nav-link" href="#${wiki[x].title}">${wiki[x].title}</a><span class="text-gray text-opacity-25"> | </span><span class="ms-2 fs-8 text-muted">Written at <time class="text-dark">${new Date(wiki[x].wrote).toLocaleString().slice(0,-3)}</time></span></li>`:'').join('')}
                    // </ul>
                }
            },
            about: {
                render: function(){
                    return `<div>
                        <div><span class="h2">About</span></div>
                        <blockquote class="blockquote blockquote-info">
                            현재 만들어진 페이지는 순수 자바스크립트로만 이루어져 있습니다. 조작이 쉽도록 구현되어 있고, 페이지 전환은 hash를 통해서 이루어집니다. 자세한 사항은 <a href="https://github.com/kkn1125/wikimson" target="_blank">github 저장소</a>를 참고 해주세요.
                        </blockquote>
                        <p>매일 배운 것을 나만의 위키백과로 기록하기 위해 만들어졌습니다.</p>
                        <div>
                            나를 위한 기록이지만 누군가를 위한 기록이기 때문에 오류없이 기록하려 노력합니다. 잘못된 부분이나 지적은 이슈를 통해 지적해주시면 감사하겠습니다.
                        </div>
                        <div class="hr"></div>
                        <div class="mb-3">
                            <span class="text-muted fs-7">
                                블로그나 위키, js 기능 등이 도움이 되셨다면 Coffee 한 잔 사주세요! ;)
                            </span>
                        </div>

                        <div>
                            <a href="https://donaricano.com/creator/kkn1125" target="_blank"><img class="img-fluid donaricano" src="https://d1u4yishnma8v5.cloudfront.net/custom/-eHBmanJuc2VrczFAbmF2ZXIuY29t" alt="donaricano-btn" style="width: 200px !important;" /></a>
                        </div>
                    </div>`;
                }
            },
        },
        '404': {
            render: function({title, code, message}){
                return  `
                <div class="h-100 w-flex flex-column justify-content-center align-items-center">
                    <div><span class="h2 roundText">${code}</span></div>
                    <div><span class="h4 roundText">${title}</span></div>
                    <div>${message}</div>
                    <div class="mt-5">
                        <a href="#home" class="btn btn-success text-white">home</a>
                    </div>
                </div>
                `;
            }
        },
        'side-bar-item':{
            render: function(list){
                let count = 0;
                return `
                <div class="menu-title text-uppercase mb-5 text-muted roundText"style="min-width:7em;word-break: keep-all;">
                    ${list?list.title.replaceAll('-',' '):'wiki'}
                </div>
                <ul class="list-group">
                    ${list?list.generateToc.map(x=>{
                        function convertSyntax(target){
                            if(target.match(/[\#\|\:]/g))
                            return target.replace(/\#([\s\S]*?)\[([\s\S]*?)\]:end/g, (origin,text,ref,i)=>{
                                return `${text}`;
                            });
                            else return target;
                        }
                        return x.map((y,i)=>{
                            if(y instanceof Array) return `<ol>${y.map(z=>{
                                return `<li scroll-to="${convertSyntax(z.innerText)}-${count++}">${convertSyntax(z.innerText)}</li>`
                            }).join('')}</ol>`;
                            else return `<li scroll-to="${convertSyntax(y.innerText)}-${count++}">${convertSyntax(y.innerText)}</li>`;
                        }).join('');
                    }).join(''):Object.keys(wiki).sort((a,b)=>{
                        a=a.toLowerCase().charCodeAt(0);
                        b=b.toLowerCase().charCodeAt(0);
                        if(a < b) { return -1; }
                        if(a > b) { return 1; }
                        return 0;
                    }).filter(x=>x!='home' && x!='about' && x!='algorithm' && wiki[x].published).map(x=>`<li class="list-item"><a href="#${x}">${x}</a></li>`).join('')}
                </ul>`;
            }
        },
        wiki: {
            form: {
                render: function({modified, done, published, title, tags, categories, authors, wrote, toc, generateToc, content, ref}){
                    if(!published) return '';
                    let refLink = ref.map(({name, link})=>{
                        if(name !== '' && link !== '') {
                            let nameElement = new DOMParser().parseFromString(name, 'text/html').body;
                            return `<li class="list-item py-1"><a href="${link}" target="_blank" title="${nameElement.textContent}">${nameElement.innerHTML}</a></li>`;
                        } else {
                            return '';
                        }
                    }).join('');
                    if(refLink.trim()=='')  refLink = null;
                    else refLink = '<ol class="list-group">'+refLink+'</ol>';

                    let filteredContent = content.map(c=>{
                        c = c.replace(/->|<-/gm, (a,b)=>{
                            if(a=='->')return '&#10142;';
                            else if(a=='<-') return '&#129044;';
                        });
                        // c = c.replace(/(\#+?)([a-zA-Zㄱ-힣0-9]+)\s?/gm, (origin, text, ref, i)=>{
                        //     const hCover = text.split('#').length-1;
                        //     return `<span class="h${hCover}">${ref}</span>`;
                        // });
                        // ref syntax convert
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
                    }).join('');

                    let during = new Date(new Date() - new Date(wrote)).getTime();
                    let date = parseInt(during/24/60/60/1000);
                    let hour = parseInt(during/60/60/1000%24);
                    let min = parseInt(during/60/1000%60);

                    let duringMsg = `${date>0?`${date}일 `:''}${hour>0&&date==0?`${hour}시 `:''}${min>0&&date==0?`${min}분 `:'방금 '}전`;
                    
                    return `<div>
                        <div>
                            <span class="h2">${title.split('-').map(x=>x.charAt(0).toUpperCase()+x.slice(1)).join(' ')}</span>
                        </div>
                        ${modified==''&&done?`<div>`:''}
                        ${modified!=''?`<span class="tag text-muted">${new Date(modified).toLocaleString().slice(0,-3)} 수정됨</span>`:``}
                        ${done?'':`<span class="tag tag-warning">아직 완료되지 않은 문서입니다.</span>`}
                        ${modified==''&&done?`</div>`:''}

                        <ul class="list-group">
                            <li class="list-item py-1">
                                <span class="tag">tags</span>
                                <ul class="w-inline-flex gx-1">
                                    ${tags.map(x=>`<li class="tag tag-info">${x}</li>`).join('')}
                                </ul>
                            </li>
                            <li class="list-item py-1">
                                <span class="tag">categories</span>
                                <ul class="w-inline-flex gx-1">
                                    ${categories.map(x=>`<li class="tag tag-success">${x}</li>`).join('')}
                                </ul>
                            </li>
                            <li class="list-item py-1">
                                <span class="tag">작성자</span>
                                <span>${authors.map(x=>`<span class="tag text-muted">${x}</span>`).join('')}</span>
                                <span class="tag">작성일</span>
                                <time class="tag time text-muted">${date<1?duringMsg:new Date(wrote).toLocaleString().slice(0,-3)}</time>
                            </li>
                        </ul>

                        ${toc?'<div class="blockquote mt-3 pe-3"><div class="fw-bold">TOC</div><ol class="toc">':''}
                        ${!toc?'':generateToc.map(x=>{
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
                        ${toc?`</ol></div>`:``}
                        <p>${filteredContent}</p>
                        ${ref.length>0?'<hr>':''}
                        ${refLink?`<div><span class="fw-bold">&#x1F4CC; 함께보면 좋은 자료</span>${refLink}</div>`:''}
                    </div>
                    <div class="sr pt-5"></div>`;
                }
            }
        }
    };

    function Controller() {
        let models = null;
        this.init = function (model) {
            models = model;

            models.renderWiki();
            window.addEventListener('mouseup', this.anchorHandler);
        }

        this.anchorHandler = function (ev) {
            let target = ev.target;
            if(ev.which==4 || ev.which==5){
                setTimeout(function(){
                    models.clearPath();
                    models.checkUrl(location.hash);
                    models.covertCurrentPath(location.hash);
                    models.renderView();
                }, 10);
            }
            if (target.tagName !== 'A' || !target.getAttribute('href').match(/\#/gm)) return;
            ev.preventDefault();
            models.anchorHandler(target.getAttribute('href'));
            if(target.getAttribute('scroll-to')) models.scrollToRef(target.getAttribute('scroll-to'));
        }
    }

    function Model() {
        let views = null;
        let currentPage = [];

        this.init = function (view) {
            views = view;
        }

        this.clearPath = function () {
            currentPage = currentPage.filter(() => false);
        }

        this.anchorHandler = function (hash) {
            this.clearPath();
            this.checkUrl(hash);
            this.covertCurrentPath(hash);
            this.applyFakeUrl(hash);
            this.renderView();
        }

        this.scrollToRef = function(ref){
            let scrollHead = null;
            console.log(ref)
            setTimeout(()=>{
                for (let key of [...document.querySelectorAll('.h3, .h6')]) {
                    if (key.getAttribute('scroll-focus').match(ref)) {
                        if (window.innerWidth - 17 > 576) scrollHead = document.querySelector('[put-type="wiki"]');
                        else scrollHead = document.querySelector('.main');
                        scrollHead.scrollTo({
                            behavior: 'smooth',
                            left: 0,
                            top: key.offsetTop
                        })
                    }
                }
            }, 10);
        }

        this.checkUrl = function (hash) {
            let now = hash.split('#').filter(x=>x!='');

            if (now.length == 0) {
                currentPage.push('#', 'home');
            }
        }

        this.covertCurrentPath = function (hash) {
            if(currentPage.length==0){
                let hashPath = hash.split('');
                currentPage.push(hashPath.shift());
                currentPage.push(hashPath.join(''));
            }
        }

        this.applyFakeUrl = function (path = null) {
            history.pushState({}, '', path ?? currentPage.join(''));
        }

        this.renderView = function () {
            views.renderView(currentPage);
        }

        this.renderWiki = function () {
            this.clearPath();
            this.checkUrl(location.hash);
            this.covertCurrentPath(location.hash);
            this.applyFakeUrl();
            this.renderView();
        }
    }

    function View() {
        let parts = null;
        let timeAt = null;

        this.init = function (components) {
            parts = components;

            this.createBaseTemplate();
            this.lazyConnect();
        }

        this.createBaseTemplate = function () {
            document.body.insertAdjacentHTML('afterBegin', parts.templates.base.render(Object.keys(parts.templates.baseModule)));

            for(let field of document.querySelectorAll('[put-name]')){
                let name = field.getAttribute('put-name');
                field.insertAdjacentHTML('beforeEnd', parts.templates.baseModule[name].render());
            }

            this.timer();
        }

        this.timer = function(){
            let before = 0;
            function times(){
                let tick = new Date().getSeconds();
                
                if(before!==tick && wiki[timeAt]){
                    if(wiki[timeAt]['wrote']) {
                        let during = new Date(new Date() - new Date(wiki[timeAt]['wrote'])).getTime();
                        let date = parseInt(during/24/60/60/1000);
                        let hour = parseInt(during/60/60/1000%24);
                        let min = parseInt(during/60/1000%60);

                        let duringMsg = `${date>0?`${date}일 `:''}${hour>0&&date==0?`${hour}시 `:''}${min>0&&date==0?`${min}분 `:'방금 '}전`;
                        
                        if(document.querySelector('time.tag.time.text-muted')){
                            document.querySelector('time.tag.time.text-muted').textContent = date<1?duringMsg:new Date(wiki[timeAt]['wrote']).toLocaleString().slice(0,-3);
                        }
                    }
                }
                requestAnimationFrame(times);
                before = tick;
            }
            requestAnimationFrame(times);
        }

        this.lazyConnect = function(){
            setTimeout(()=>{
                Object.assign(document.body.insertAdjacentElement('beforeEnd', document.createElement('script')),{
                    src: 'https://cdn.jsdelivr.net/gh/kkn1125/penli@dabfbd0/docs/assets/js/penli.js',
                    integrity: 'sha384-v8IcF+Ajik1Du5Pn4UGwOVizMisxuU6LhXVsWYy1WdP2+1MxTdeJRHuYeDAdtQ6v',
                    crossorigin: 'anonymous',
                });
                Object.assign(document.body.insertAdjacentElement('beforeEnd', document.createElement('script')),{
                    src: 'assets/script/resize.js',
                });

                setTimeout(()=>{
                    settingHandler();
                }, 500);
            },100);
        }

        this.renderView = function (page) {
            let type = page.pop();
            timeAt = decodeURI(type);

            document.querySelector('[put-type="wiki"]').scrollTo({behavior:'smooth',left:0,top:0});

            if(Object.keys(wiki).indexOf(decodeURI(type))==-1 && type !== 'home' && type !== 'about'){
                type = '404';
            }

            this.changeTitle(type);
            this.changeWikiTemplate(type);
            this.setScrollPoint();
        }

        this.progressing = function(){
            var links = document.querySelectorAll("a[href*='#']"),
            i = 0, l = links.length,
            body = document.body;
            console.log(links)
            for(;i<l;i++) {
                links[i].addEventListener("click",function(){
                    body.classList.add("page-loading");
                    setTimeout(function(){
                        body.classList.remove('page-loading');
                    },200);
                },false);
            }
        }

        this.setScrollPoint = function(){ // scroll focus 생성시점
            [...document.querySelectorAll('.h3, .h6')].forEach((x,i) => x.setAttribute('scroll-focus', `${x.textContent}-${i}`));
        }

        this.changeTitle = function(subTitle){
            let removeTag = new DOMParser().parseFromString(title,'text/html').body.innerText;
            document.head.querySelector('title').innerHTML = decodeURI(`${removeTag}${subTitle!=='home'?' :: '+subTitle:''}`);
        }

        this.changeWikiTemplate = function(type){
            this.clearView();
            type = decodeURI(type);
            
            if(type=='home' || type=='about') {
                document.querySelector('[put-type="wiki"]').insertAdjacentHTML('beforeEnd', parts.templates.baseModule[type].render(Object.keys(wiki)));
                document.querySelector('[put-type="side-bar-item"]').insertAdjacentHTML('beforeEnd', parts.templates['side-bar-item'].render());
            } else if(type=='404'){
                document.querySelector('[put-type="wiki"]').insertAdjacentHTML('beforeEnd', parts.templates[type].render(wiki[type]));
                document.querySelector('[put-type="side-bar-item"]').insertAdjacentHTML('beforeEnd', parts.templates['side-bar-item'].render());
            } else {
                wiki[type]['generateToc'] = this.generateToc(wiki[type]);

                document.querySelector('[put-type="wiki"]').insertAdjacentHTML('beforeEnd', parts.templates.wiki.form.render(wiki[type]));
                document.querySelector('[put-type="side-bar-item"]').insertAdjacentHTML('beforeEnd', parts.templates['side-bar-item'].render(wiki[type]));
            }
        }

        this.generateToc = function(toc){
            let dom = new DOMParser();
            let html = dom.parseFromString(toc.content.join('').replace(/\-\>|\<\-/gm, (a,b)=>{
                if(a=='->')return '&#10142;';
                else if(a=='<-') return '&#129044;';
            }), 'text/html').body;
            
            return [...html.querySelectorAll('.h3')].map(x=>{
                let save = [];
                if(x.parentNode.nextElementSibling){
                    save.push(x);
                    save.push([...x.parentNode.nextElementSibling.querySelectorAll('.h6')]);
                } else {
                    save.push(x);
                }
                return save;
            });
        }

        this.clearView = function(){
            document.querySelector('[put-type="wiki"]').innerHTML = '';
            document.querySelector('[put-type="side-bar-item"]').innerHTML = '';
        }
    }
    return {
        init: function () {
            const components = {
                wiki,
                templates,
            }

            const view = new View();
            const model = new Model();
            const controller = new Controller();

            view.init(components);
            model.init(view);
            controller.init(model);
        }
    }
})().init();