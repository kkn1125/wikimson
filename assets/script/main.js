'use strict';

(function () {
    const title = `<span class="text-subpoint">Wiki</span>mson`;
    const main = `<span class="text-subpoint h1" style="-webkit-text-stroke-width: thick;
    ">ㄴㅇㄱ</span><span class="fs-3 text-end">나를 위한 기록</span>`;

    const wiki = {
        'garbage-collection': {
            title: 'garbage-collection',
            tags: ['garbage-collection'],
            categories: ['CS'],
            authors: ['kimson'],
            wrote: '2021-11-28 21:19:21',
            toc: true,
            content: [
                `
                <div><span class="h3">가비지 컬렉션이란</span></div>
                <div>
                    <div>
                        <span class="h6">정의</span>
                        <p>메모리 관리 기법 중의 하나이며, 프로그램이 동적으로 할당했던 메모리 영역 중 필요 없게 된 영역을 해제하는 기능.</p>
                        <p>1959년 무렵 LISP 문제를 해결하기 위해 존 매카시가 개발하였다.</p>
                        <p>자바, C# 등은 처음부터 GC를 염두에 두고 설계되었다.</p>
                        <p><span class="fw-bold">장점</span>
                            th: 구분|텍스트@
                            tb: !장점|<ol>
                                <li>유효하지 않은 포인터 접근</li>
                                <li>이중 해제 방지</li>
                                <li>메모리 누수 방지</li>
                            </ol>\\
                            !단점|<ol>
                                <li>어떤 메모리를 해제할지 결정하는데 비용이 든다</li>
                                <li>가비지 수집이 일어나는 타이밍이나 점유시간 예측이 어렵다</li>
                                <li>할당 메모리가 해제되는 시점을 알 수 없다</li>
                            </ol>@
                            :end
                        </p>
                    </div>
                </div>
                `,
                `<div><span class="h3">포인터 추적 방식</span></div>`
            ],
            ref: [
                {
                    name:'위키 백과 - CS',
                    link:'https://ko.wikipedia.org/wiki/%EC%93%B0%EB%A0%88%EA%B8%B0_%EC%88%98%EC%A7%91_(%EC%BB%B4%ED%93%A8%ED%84%B0_%EA%B3%BC%ED%95%99)'
                },
            ]
        },
        about: {
            titl: 'qwe'
        },
    }

    const templates = {
        base: {
            render: function ([nav, side, footer]) {
                return `
                <nav class="gnb position-sticky bg-light us-none gnb-dark" put-name="${nav}"></nav>
                <div class="main">
                    <aside id="lsb" class="side-bar side-bar-size-3 overflow-hidden" data-side-bar="left" put-name="${side}"></aside>
                    <span id="resizer" class="resizer bg-light">
                        <span class="dotted"></span>
                        <span class="dotted"></span>
                        <span class="dotted"></span>
                    </span>
                    <main class="fence-full fence-lg" put-type="wiki">
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
                    <div class="brand fw-bold">
                        <a href="#home">${title}</a>
                    </div>
                    <div class="menu-btn me-3">
                        <button class="btn btn-light text-gray fs-4" data-target="#gnbMenu" style="line-height: 1">
                            <i class="fas fa-bars"></i>
                        </button>
                    </div>
                    <ul id="gnbMenu" class="gnb-menu gx-2 w-flex">
                        ${Object.keys(wiki).filter(x=>x!='home').map(x=>`<a class="nav-link" href="#${x}">${x.split('-').map(y=>y.charAt(0).toUpperCase()+y.slice(1)).join(' ')}</a>`).join('')}
                    </ul>
                </div>`;
                }
            },
            'side-bar': {
                render: function(){
                    return `
                        <div class="p-5 border flex-basis-100">
                            <div class="position-static position-sticky-sm" style="top: 111.375px;" put-type="side-bar-item"></div>
                        </div>`;
                }
            },
            footer: {
                render: () => `
                    <div>
                        <span>copyright author kimson</span>
                        <span class="vr"></span>
                        <a href="https://kkn1125.github.io" target="_blank">Blog</a>
                        <a href="#about">About</a>
                    </div>
                `,
            },
            home: {
                render: function () {
                    let wikis = Object.keys(wiki).filter(x=>x!='about');
                    return `<div class="mt-5 p-5 border border-1 border-light rounded-5">
                        <div class="mt-3">
                            <div class="">${main}</div>
                        </div>
                        <div class="mt-3">
                            <div class="w-flex align-items-baseline">
                                <span class="h4">Wiki List</span>
                                <span class="ms-2 fs-6 tag tag-info">${wikis.length}</span>
                            </div>
                            <ul class="list-group">
                                ${wikis.map(x=>x!='home'?`<li class="list-item"><a class="nav-link" href="#${x}">${x}</a><span class="text-gray text-opacity-25"> | </span><span class="ms-2 fs-8 text-muted">Written at <time class="text-dark">${new Date(wiki[x].wrote).toLocaleString().slice(0,-3)}</time></span></li>`:'').join('')}
                            </ul>
                        </div>
                    </div>`;
                }
            },
            about: {
                render: function(){
                    return `<div>
                        <div><span class="h3">About</span></div>
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
        'side-bar-item':{
            render: function(list){
                return `
                <div class="menu-title text-uppercase mb-5 text-muted">
                    ${list?list.title.replace('-',' '):'wiki'}
                </div>
                <ul class="list-group">
                    ${list?list.generateToc.map(x=>`<li class="list-item" ><span scroll-to="${x.innerText}">${x.innerText}</span></li>`).join(''):Object.keys(wiki).filter(x=>x!='about').map(x=>`<li class="list-item"><a href="#${x}">${x}</a></li>`).join('')}
                </ul>`;
            }
        },
        wiki: {
            form: {
                render: function({title, tags, categories, authors, wrote, toc, generateToc, content, ref}){
                    let refLink = ref.map(({name, link})=>`<div><a href="${link}" target="_blank" title="${name}">${name}</a></div>`).join('');

                    let filteredContent = content.map(c=>{
                        c = c.replace(/t[hb]:\s?[\S\s]*:end/gm, (match)=>{
                            match = match.split('@').map(x=>{
                                if(x.match(':end')) return '';
                                let sp = x.trim().split(/\:\s?/).map(y=>y.trim());
                                if(sp[0].match(/th/g)){
                                    return `<tr>${sp[1].split('|').map(y=>`<th>${y}</th>`).join('')}</tr>`;
                                } else {
                                    return `${sp[1].split('\\').map(y=>'<tr>'+y.split('|').map(z=>`<td>${z.match(/\!/)?`<span class="w-block text-center fw-bold">${z.replace('!','')}</span>`:z}</td>`).join('')+'<tr>').join('')}`;
                                }
                            });
                            return `<table class="table">${match.filter(y=>y!='').join('')}</table>`
                        });
                        return `${c}<br>`;
                    }).join('');

                    return `<div>
                        <div>
                            <span class="h2">${title.split('-').map(x=>x.charAt(0).toUpperCase()+x.slice(1)).join(' ')}</span>
                        </div>
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
                                <span class="tag">작성일</span>
                                <time class="tag time text-muted">${new Date(wrote).toLocaleString().slice(0,-3)}</time>
                            </li>
                        </ul>
                        ${toc?'<div class="blockquote mt-3 pe-3"><div class="fw-bold">TOC</div><ol>':''}
                            ${!toc||generateToc.map(x=>`<li><span scroll-to="${x.innerText}">${x.innerHTML}</span></li>`).join('')}
                        ${toc?'</ol></div>':''}
                        <p>${filteredContent}</p>
                        ${ref.length>0?'<hr>':''}
                        ${refLink?`<div><span class="fw-bold">References</span>${refLink}</div>`:''}
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
            window.addEventListener('click', this.anchorHandler);
        }

        this.anchorHandler = function (ev) {
            let target = ev.target;
            if (target.tagName !== 'A' || !target.getAttribute('href').match(/\#/gm)) return;
            ev.preventDefault();
            models.anchorHandler(target.getAttribute('href'));
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

        this.covertCurrentPath = function (hash) {
            let hashPath = hash.split('');
            currentPage.push(hashPath.shift());
            currentPage.push(hashPath.join(''));
        }

        this.checkUrl = function (hash) {
            let now = hash.split('#');
            if (now.length == 1 && now.pop() == '') {
                currentPage.push('#', 'home');
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

        this.init = function (components) {
            parts = components;

            this.createBaseTemplate();
            this.lazyConnect();
        }

        this.createBaseTemplate = function (page) {
            document.body.insertAdjacentHTML('afterBegin', parts.templates.base.render(Object.keys(parts.templates.baseModule)));

            for(let field of document.querySelectorAll('[put-name]')){
                let name = field.getAttribute('put-name');
                field.insertAdjacentHTML('beforeEnd', parts.templates.baseModule[name].render());
            }
        }

        this.lazyConnect = function(){
            setTimeout(()=>{
                Object.assign(document.body.insertAdjacentElement('beforeEnd', document.createElement('script')),{
                    src: 'https://cdn.jsdelivr.net/gh/kkn1125/penli@vv013/docs/assets/js/penli.js',
                    integrity: 'sha384-nsIRFRt8WvtPsJBMOSiAzsvqgVc0ViFiMC80JMDsPiz6LnNXgOzelTajC1MhBm41',
                    crossorigin: 'anonymous',
                });
                Object.assign(document.body.insertAdjacentElement('beforeEnd', document.createElement('script')),{
                    src: 'assets/script/resize.js',
                });
            },100);
        }

        this.renderView = function (page) {
            let template, type, dir;
            template = page.shift();
            type = page.shift();
            dir = page.length>0?page.shift():null;

            this.changeTitle(type);
            this.changeWikiTemplate(type);
        }

        this.changeTitle = function(subTitle){
            let removeTag = new DOMParser().parseFromString(title,'text/html').body.innerText;
            document.head.querySelector('title').innerHTML = `${removeTag}${subTitle!=='home'?' :: '+subTitle:''}`;
        }

        this.changeWikiTemplate = function(type){
            this.clearView();

            if(type=='home' || type=='about') {
                document.querySelector('[put-type="wiki"]').insertAdjacentHTML('beforeEnd', parts.templates.baseModule[type].render(Object.keys(wiki)));
                document.querySelector('[put-type="side-bar-item"]').insertAdjacentHTML('beforeEnd', parts.templates['side-bar-item'].render());
            } else {
                wiki[type]['generateToc'] = this.generateToc(wiki[type]);

                document.querySelector('[put-type="wiki"]').insertAdjacentHTML('beforeEnd', parts.templates.wiki.form.render(wiki[type]));
                document.querySelector('[put-type="side-bar-item"]').insertAdjacentHTML('beforeEnd', parts.templates['side-bar-item'].render(wiki[type]));
            }
        }

        this.generateToc = function(toc){
            let dom = new DOMParser();
            let html = dom.parseFromString(toc.content.join(''), 'text/html').body;
            return [...html.querySelectorAll('.h3')];
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