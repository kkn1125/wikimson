'use strict';

(function () {
    const title = `<span class="text-subpoint">Wiki</span>mson`;
    const main = `<span class="text-subpoint h1" style="-webkit-text-stroke-width: medium;
    ">ㄴㅇㄱ</span><span class="fs-3 text-end ms-5">나를 위한 기록</span>`;

    const wiki = {
        '404': {
            published: false,
            title: `Not Found`,
            code: 404,
            message: `페이지를 찾을 수 없습니다!`,
        },
        'garbage-collection': {
            modified: '',
            done: false,
            published: true,
            title: 'garbage-collection',
            tags: ['garbage-collection'],
            categories: ['CS'],
            authors: ['kimson'],
            wrote: '2021-11-28 21:19:21',
            toc: true,
            content: [ // th: thead, tb: tbody, \\: tr 추가, !: 강조, @: 단락바꿈, |: td 추가
                `
                <div><span class="h3">가비지 컬렉션이란</span></div>
                <div>
                    <div>
                        <span class="h6">정의</span>
                        <p>메모리 관리 기법 중의 하나이며, 프로그램이 동적으로 할당했던 메모리 영역 중 필요 없게 된 영역을 해제하는 기능.</p>
                        <p>정리되지 않은 메모리, 유효하지 않은 메모리 주소인 가비지를 정리해주는 프로그램이며, 1959년 무렵 LISP 문제를 해결하기 위해 존 매카시가 개발하였다.</p>
                        <p>자바, C# 등은 처음부터 GC를 염두에 두고 설계되었다.</p>
                        <div>
                            <span class="fw-bold fs-5">장단점</span>
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
                        </div>
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
            ],
        },
        'OSI-7계층': {
            modified: '',
            done: false,
            published: true,
            title: 'OSI-7계층',
            tags: ['OSI-7계층', '통신규약'],
            categories: ['CS'],
            authors: ['kimson'],
            wrote: '2021-11-29 18:56:35',
            toc: true,
            content: [
                `
                <div><span class="h3">OSI 7계층 요약</span></div>
                <div>
                    <div>
                        <span class="h6">정의</span>
                        <div>
                            th: 구분|설명@
                            tb: !물리|전송하는데 필요한 기능을 제공 (통신 케이블, 허브)\\
                                !데이터링크|송/수신 확인. MAC주소를 가지고 통신함 (브릿지, 스위치)\\
                                !네트워크|패킷을 네트워크 간의 IP를 통해 데이터 전달 (라우팅)\\
                                !전송|두 host 시스템으로부터 발생하는 데이터 흐름 제공\\
                                !세션|통신 시스템 사용자간의 연결을 유지 및 설정함\\
                                !표현|세션 계층 간의 주고 받는 인터페이스를 일관성 있게 제공\\
                                !응용|사용자가 네트워크에 접근할 수 있도록 서비스 제공@
                                :end
                        </div>
                        
                    </div>
                </div>
                `,
                `
                <div><span class="h3">TCP/IP 프로토콜 스택 4계층</span></div>

                `,
            ],
            ref: [
                // {
                //     name:'',
                //     link:''
                // },
            ],
        },
        'library': {
            modified: '',
            done: true,
            published: true,
            title: 'library',
            tags: ['library', '라이브러리'],
            categories: ['CS'],
            authors: ['kimson'],
            wrote: '2021-11-29 18:56:35',
            toc: true,
            content: [
                `
                <div><span class="h3">라이브러리란</span></div>
                <div>
                    <div>
                        <span class="h6">정의</span>
                        <div>
                            th: 핵심|설명@
                            tb: !require|<ul>
                                <li>대체해도 프로젝트가 망하거나 하지 않는다.</li>
                                <li>"내"가 요청한다.</li>
                            </ul>@
                                :end
                        </div>
                        
                    </div>
                </div>
                `,
            ],
            ref: [
                {
                    name:'관련 위키 wikimson>api',
                    link:'#api'
                },
                {
                    name:'관련 위키 wikimson>framework',
                    link:'#framework'
                },
            ],
        },
        'api': {
            modified: '',
            done: true,
            published: true,
            title: 'api',
            tags: ['api','aplication-programming-interface'],
            categories: ['CS'],
            authors: ['kimson'],
            wrote: '2021-11-30 21:15:57',
            toc: true,
            content: [
                `
                <div><span class="h3">API란</span></div>
                <div>
                    <div>
                        <span class="h6">정의</span>
                        <div>
                            th: 핵심|설명@
                            tb: !매개역할|<ul>
                                <li>프로그램 간 통신을 하게 해준다.</li>
                                <li>요청하면 서버에 저장된 데이터를 꺼내어 준다.</li>
                                <li>권한 또는 효청횟수, 비용 등의 제약이 있는 API도 있다.</li>
                                <li>API를 호출함으로써 다른 프로그램에 전달하여 데이터를 처리, 이용할 수 있다.</li>
                            </ul>@
                                :end
                        </div>
                        
                    </div>
                </div>
                `,
            ],
            ref: [
                {
                    name:'관련 위키 wikimson>library',
                    link:'#library'
                },
                {
                    name:'관련 위키 wikimson>framework',
                    link:'#framework'
                },
            ],
        },
        'mvc': {
            modified: '',
            done: true,
            published: true,
            title: 'mvc',
            tags: ['mvc','design-pattern'],
            categories: ['cd','design-pattern'],
            authors: ['kimson'],
            wrote: '2021-11-30 18:42:38',
            toc: true,
            content: [
                `
                <div><span class="h3">mvc란</span></div>
                <div>
                    <div>
                        <div class="text-center">
                            <figure class="w-inline-flex flex-column">
                                <img src="https://s3.ap-northeast-2.amazonaws.com/opentutorials-user-file/module/327/1262.png" alt="sample">
                                <figcaption class="bg-light p-2 text-muted"><span class="tag tag-light">ref</span> amazon</figcaption>
                            </figure>
                        </div>
                        <span class="h6">정의</span>
                        <div>
                            th: 핵심|설명@
                            tb: !Model|데이터를 가지고 로직을 처리한다. 데이터베이스와 대응 될 수 있다\\
                            !View|요청된 페이지를 데이터 처리의 과정을 거쳐 브라우저에 나타낼 요소들을 출력해주는 역할을 한다.\\
                            !Controller|사용자의 요청을 받아 요청에 맞는 Model의 로직을 실행하고 데이터의 흐름을 제어한다.@
                            :end
                        </div>
                    </div>
                    <div>
                        <span class="h6">MVC1 패턴</span>
                        <div>
                            <p>사용자 요청이 들어오면 서버 내의 jsp(view & controller)와 javaBean을 거치게 된다.</p>
                            <p>요청이 들어오면 jsp에서 view, controller역할을 함께 하게 되고, model을 통해 데이터 처리가 이루어지며, 필요에 따라 데이터베이스와 대응한다. model이 update된 내용을 view에 전달하여 브라우저에 출력이 된다.</p>
                            <p>비즈니스 로직이 복잡하지 않을 때, 즉, 소규모 프로젝트에 사용되며 빠르고 쉽게 개발할 수 있다는 장점이 있지만 복잡해지고 더 큰 규모로 발전한다면 Controller와 View가 혼재되어 유지보수에 어려움을 겪을 수 있다.</p>
                        </div>
                    </div>
                    <div>
                        <span class="h6">MVC2 패턴</span>
                        <div>
                            <p>패턴2에서는 패턴1의 jsp에서 사용하던 controller와 view를 분리한 형태이다.</p>
                            <p>단, mvc1 패턴보다 구현이 복잡하고 개발 난이도가 높지만 유지보수 측면에서 유리하고 PE와 BE의 분업이 가능하다.</p>
                        </div>
                    </div>
                </div>
                `,
            ],
            ref: [
                {
                    name:'관련 위키 wikimson>library',
                    link:'#library'
                },
                {
                    name:'관련 위키 wikimson>framework',
                    link:'#framework'
                },
                {
                    name:'preamtree님 블로그',
                    link:'https://preamtree.tistory.com/11'
                },
                {
                    name:'생활코딩 디자인 패턴',
                    link:'https://opentutorials.org/module/327/3828'
                },
            ],
        },
        'framework': {
            modified: '',
            done: true,
            published: true,
            title: 'framework',
            tags: ['framework'],
            categories: ['CS'],
            authors: ['kimson'],
            wrote: '2021-11-29 18:56:35',
            toc: true,
            content: [
                `
                <div><span class="h3">framework란</span></div>
                <div>
                    <div>
                        <span class="h6">정의</span>
                        <div>
                            th: 핵심|설명@
                            tb: !Rule|<ul>
                                <li>프레임워크가 "나"를 부른다.</li>
                                <li>규칙이 있어서 내가 따라야한다.</li>
                                <li>규칙을 따를 뿐이다.</li>
                                <li>프레임워크와 라이브러리의 성격을 모두 가진 영역도 존재한다. 예를 들면 리액트, 뷰 등은 라이브러리이면서 프레임워크의 성격을 가진다.</li>
                            </ul>@
                            :end
                        </div>
                        
                    </div>
                </div>
                `,
            ],
            ref: [
                {
                    name:'관련 위키 wikimson>library',
                    link:'#library'
                },
                {
                    name:'관련 위키 wikimson>api',
                    link:'#api'
                },
            ],
        },
        'context-switching': {
            modified: '',
            done: false,
            published: true,
            title: 'context-switching',
            tags: ['컨텍스트 스위칭','process'],
            categories: ['CS'],
            authors: ['kimson'],
            wrote: '2021-11-29 18:56:35',
            toc: true,
            content: [
                `
                <div><span class="h3">context switching이란</span></div>
                <div>
                    <div>
                        <span class="h6">정의</span>
                        <div>
                            <p>컴퓨터가 마치 동시에 작업을 진행 하는 것처럼 보이는 이유는 아주 빠른 속도로 task를 바꿔가며 실행하기 때문입니다. 이때 CPU가 task를 바꾸면서 실행하기 위해 context switching이 요구됩니다.</p>
                            <p>현재 진행 중인 task(process, thread)의 상태를 저장하고 다음 진행할 task의 상태 값을 읽는 일련의 과정을 말합니다.</p>
                        </div>
                        <span class="h6">과정</span>
                        <div>
                            <p>task의 대부분 정보는 레지스터에 저장되고 pcb(process control block)로 관리됩니다.</p>
                            <p>실행 중인 task pcb정보를 저장하며 다음 실행할 task의 pcb정보를 읽어 레지스터에 저장하고 cpu가 이전에 진행한 과정을 이어서 수행하게 됩니다.</p>
                        </div>
                    </div>
                </div>
                `,
            ],
            ref: [
                {
                    name:'관련 위키 wikimson>library',
                    link:'#library'
                },
                {
                    name:'관련 위키 wikimson>api',
                    link:'#api'
                },
            ],
        },
        'process&thread': {
            modified: '',
            done: true,
            published: true,
            title: '프로세스와 스레드',
            tags: ['프로세스', '스레드'],
            categories: ['CS'],
            authors: ['kimson'],
            wrote: '2021-11-29 20:06:54',
            toc: true,
            content: [
                `
                <div><span class="h3">프로세스와 스레드</span></div>
                <div>
                    <div>
                        <div>
                            <span class="h6">정의</span>
                            th: 구분|설명@
                            tb: !프로세스|프로그램을 구동하여 프로그램 자체와 프로그램의 상태가 메모리 상에서 실
                            행되는 작업 단위를 말합니다. 메모리에 올라와 실행되고 있는 프로그램의
                            인스턴스(독립적 개체)라고 할 수 있고, CPU 자원의 할당을 받을 수 있고,
                            프로세스에 할당되는 메모리에는 스택, 힙, 데이터, 코드 영역을 포함합니다.\\
                            !스레드|프로세스 내에서 실행되는 흐름의 단위이고 일반적으로 한 프로그램에 하나의 스레드를 가지지만 프로그램 환경에 따라 둘 이상 스레드를 동시에 실행 가능하며, 이를 멀티스레드하고 합니다. 스레드 간에는 프로세스 주소나 자원을 공유할 수 있습니다. 스레드는 각자 독립적으로 작업을 수행해야 하기 때문에 스레드 기본 데이터를 가집니다.\\
                            !스레드 기본 데이터|스레드도 프로세스와 마찬가지로 하나의 실행 흐름이며, 관련 데이터가 필요합니다. 일반적으로 스레드는 자신만의 고유 스레드 ID, Program Counter (PC), 레지스터 집합, 스택을 가집니다. 코드, 데이터, 파일 등 기타 자원은 프로세스 내 다른 스레드와 공유합니다.\\
                            !PC|Program Counter의 줄임말로, 다음에 실행될 명령어의 주소가 들어있는 레지스터이며, 명령어가 인출되면, 자동으로 다음 명령어를 가리키도록 주소값이 증가됩니다.\\
                            !PCB|Process Control Block의 약자로, 프로세스 제어 블록입니다. 프로세스에 대한 중요한 정보를 저장하고 있고, 운영체제가 프로세스를 표현한 것이라고도 합니다. 프로세스 생성 시 만들어지며, 주 기억장치에 유지됩니다. 문맥전환 등 다른 프로세스를 처리해야 할 때, PCB에 현재 상태를 저장함으로써 나중에 그 작업 상태를 불러와 작업 재개가 가능해집니다. PID, 상태, 다음 명령어 주소 등의 정보가 저장됩니다.\\
                            !캐시메모리|CPU의 레지스터와 메모리 사이에서 버퍼역할을 하며, 데이터의 병목현상 완화에 사용됩니다.@
                            :end
                        </div>
                    </div>

                    <div>
                        <div>
                            <span class="h6">멀티 프로세스와 멀티 스레드</span>
                            th: 구분|설명@
                            tb: !멀티 프로세스|<span>멀티프로세스는 하나의 프로그램을 여러개의 프로세스로 구성하여 각 프로세스가 하나의 작업을 처리하는 것 입니다.</span>
                                <ul>
                                    <li>하나의 프로세스가 잘못 되어도 프로그램은 동작 합니다.</li>
                                    <li>#context switching[context-switching|정의]:end 비용이 발생합니다.</li>
                                </ul>\\
                                !멀티 스레드|<span>프로그램을 여러 개의 스레드로 구성하고 각 스레드가 작업을 처리하는 것 입니다.</span>
                                <ul>
                                    <li>시스템 자원 소모와 처리비용가 감소하고 스레드 간 자원 공유가 가능합니다.</li>
                                    <li>디버깅이 어렵고 동기화 이슈를 안고 있으며 하나의 스레드 오류로 전체 프로세스에 문제가 발생합니다.</li>
                                    <li>#교착상태(dead-lock)[dead-lock|정의]:end가 발생하지 않도록 주의해야합니다.</li>
                                </ul>@
                                :end
                        </div>
                    </div>
                </div>
                `,
            ],
            ref: [
                {
                    name:'이해를 돕는 강의 <span class="tag tag-danger">Youtube</span>',
                    link:'https://www.youtube.com/watch?v=kNNHaAaFDs8'
                },
            ],
        },
        'dead-lock': {
            modified: '',
            done: false,
            published: true,
            title: '교착상태',
            tags: ['dead-lock', '데드락', '교착상태', 'thread'],
            categories: ['CS'],
            authors: ['kimson'],
            wrote: '2021-11-30 14:20:53',
            toc: true,
            content: [
                `
                <div><span class="h3">#교착상태 (dead-lock)[process&thread|멀티 프로세스와 멀티 스레드]:end</span></div>
                <div>
                    <div>
                        <span class="h6">정의</span>
                        <div>
                            <p>교착상태란 두 개 이상의 작업이 서로 간의 작업이 끝나기 만을 기다리는 상태입니다.</p>
                            <p>결과적으로 아무것도 완료되지 못하는 상태를 말한다.</p>
                            <p>예를 들어, 연장이 망치와 톱이 있다 가정할 때 두 사람이 각 연장을 사용하다가 서로의 연장을 먼저 줄 것을 요구하며 지연되는 것과 유사하다.</p>
                        </div>
                        <span class="h6">조건</span>
                        <div>
                            th: 구분|설명@
                            tb: !상호배제(Mutal exclusion)|#프로세스[process&thread|정의]:end들이 필요로 하는 자원에 대해 배타적 통제권 요구\\
                            !점유대기(Hold & Wait)|프로세스가 할당된 자원을 가진 상태에서 다른 자원을 기다림\\
                            !비선점(No preemption)|프로세스가 어떤 자원의 사용을 끝낼 때까지 그 자원을 뺏을 수 없음\\
                            !순환대기(Circular wait)|각 프로세스는 순환적으로 다음 프로세스가 요구하는 자원을 가지고 있음
                            @ :end
                        </div>
                    </div>
                </div>
                `,
            ],
            ref: [
                {
                    name:'위키 백과 - 교착상태',
                    link:'https://ko.wikipedia.org/wiki/%EA%B5%90%EC%B0%A9_%EC%83%81%ED%83%9C'
                },
            ],
        },
        'Http와 Https': {
            modified: '',
            done: true,
            published: true,
            title: 'Http와 Https',
            tags: ['https', 'http'],
            categories: ['CS'],
            authors: ['kimson'],
            wrote: '2021-11-29 20:06:54',
            toc: true,
            content: [
                `
                <div><span class="h3">Http와 Https</span></div>
                <div>
                    <div>
                        <span class="h6">정의</span>
                        <div>
                            th: 구분|설명@
                            tb: !HTTP|TCP -> HTTP\\
                                !HTTPS|TCP -> SSL -> HTTP
                            @:end

                            <div>
                                <span class="fs-5">SSL(Secure Socket Layer)</span>
                                <p>SSL 프로토콜은 정보를 암호화시키고 이때 공개키와 개인키 두 가지를 이용한다. HTTPS는 인터넷상에서 정보를 암호화하기 위해 SSL 프로토콜을 이용해 데이터를 전송하고 있다는 것을 말함. 즉, 문서 전송시 암호화 처리 유무에 따라 HTTP와 HTTPS로 나누어지는 것이며, 모든 사이트가 HTTPS로 하지 않는 이유는, 암호화 과정으로 인한 속도 저하가 발생하기 때문이다.</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
                `,
            ],
            ref: [
                // {
                //     name:'',
                //     link:''
                // },
            ],
        },
        home: {
            published: true
        },
        about: {
            published: true
        },
    }

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
                    <div class="brand fw-bold">
                        <a href="#home">${title}</a>
                    </div>
                    <div class="menu-btn me-3">
                        <button class="btn btn-light text-gray fs-4 px-2" data-target="#gnbMenu" style="line-height: 1">
                            <i class="fas fa-bars"></i>
                        </button>
                    </div>
                    <ul id="gnbMenu" class="gnb-menu gx-2 w-flex">
                        ${Object.keys(wiki).filter(x=>x=='home' || x=='about').map(x=>`<li><a class="nav-link" href="#${x}">${x}</a></li>`).join('')}
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
                        return x.map(y=>{
                            if(y instanceof Array) return `<ol>${y.map(z=>{
                                return `<li scroll-to="${convertSyntax(z.innerText)}">${convertSyntax(z.innerText)}</li>`
                            }).join('')}</ol>`;
                            else return `<li scroll-to="${convertSyntax(y.innerText)}">${convertSyntax(y.innerText)}</li>`;
                        }).join('');
                    }).join(''):Object.keys(wiki).sort((a,b)=>{
                        a=a.toLowerCase().charCodeAt(0);
                        b=b.toLowerCase().charCodeAt(0);
                        if(a < b) { return -1; }
                        if(a > b) { return 1; }
                        return 0;
                    }).filter(x=>x!='home' && x!='about' && wiki[x].published).map(x=>`<li class="list-item"><a href="#${x}">${x}</a></li>`).join('')}
                </ul>`;
            }
        },
        wiki: {
            form: {
                render: function({modified, done, published, title, tags, categories, authors, wrote, toc, generateToc, content, ref}){
                    if(!published) return '';
                    let refLink = '<ol class="list-group">'+ref.map(({name, link})=>{
                        let nameElement = new DOMParser().parseFromString(name, 'text/html').body;
                        return `<li class="list-item py-1"><a href="${link}" target="_blank" title="${nameElement.textContent}">${nameElement.innerHTML}</a></li>`;
                    }).join('')+'</ol>';

                    let filteredContent = content.map(c=>{
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

                    let duringMsg = `${date>0?`${date}일 `:''}${hour>0&&date==0?`${hour}시 `:''}${min>0&&date==0?`${min}분 `:''}전`;

                    return `<div>
                        <div>
                            <span class="h2">${title.split('-').map(x=>x.charAt(0).toUpperCase()+x.slice(1)).join(' ')}</span>
                        </div>
                        ${modified==''&&done?`<div>`:''}
                        ${modified!=''?`<span class="tag text-muted">${new Date(modified).toLocaleString().slice(0,-3)} 수정됨</span>`:``}
                        ${done?'':`<span class="tag tag-warning">미완료</span>`}
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
                            return x.map(y=>{
                                function convertSyntax(target){
                                    if(target.match(/[\#\|\:]/g))
                                    return target.replace(/\#([\s\S]*?)\[([\s\S]*?)\]:end/g, (origin,text,ref,i)=>{
                                        return `${text}`;
                                    });
                                    else return target;
                                }
                                if(y instanceof Array) return `<ol>${y.map(z=>{
                                    return `<li scroll-to="${convertSyntax(z.innerText)}">${convertSyntax(z.innerText)}</li>`
                                }).join('')}</ol>`;
                                else return `<li scroll-to="${convertSyntax(y.innerText)}">${convertSyntax(y.innerText)}</li>`;
                            }).join('');
                        }).join('')}
                        ${toc?`</ol></div>`:``}
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
            setTimeout(()=>{
                for (let key of [...document.querySelectorAll('.h3, .h6')]) {
                    if (key.getAttribute('scroll-focus') == ref) {
                        if (window.innerWidth - 17 > 576) scrollHead = document.querySelector('[put-type="wiki"]');
                        else scrollHead = document.querySelector('.main');
                        scrollHead.scrollTo({
                            behavior: 'smooth',
                            left: 0,
                            top: key.offsetTop
                        })
                    }
                }
            });
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
                
                if(before!==tick){
                    if(wiki[timeAt]['wrote']) {
                        let during = new Date(new Date() - new Date(wiki[timeAt]['wrote'])).getTime();
                        let date = parseInt(during/24/60/60/1000);
                        let hour = parseInt(during/60/60/1000%24);
                        let min = parseInt(during/60/1000%60);

                        let duringMsg = `${date>0?`${date}일 `:''}${hour>0&&date==0?`${hour}시 `:''}${min>0&&date==0?`${min}분 `:''}전`;
                        
                        if(document.querySelector('time.tag.time.text-muted')){
                            document.querySelector('time.tag.time.text-muted').textContent = date<1?duringMsg:new Date(wiki[timeAt]['wrote']).toLocaleString().slice(0,-3);
                        }
                        // tick%2==0?console.log('tick'):console.log('tock');
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
                    src: 'https://cdn.jsdelivr.net/gh/kkn1125/penli@vv013/docs/assets/js/penli.js',
                    integrity: 'sha384-nsIRFRt8WvtPsJBMOSiAzsvqgVc0ViFiMC80JMDsPiz6LnNXgOzelTajC1MhBm41',
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

        this.setScrollPoint = function(){
            [...document.querySelectorAll('.h3, .h6')].forEach(x => x.setAttribute('scroll-focus', x.innerText));
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
            let html = dom.parseFromString(toc.content.join(''), 'text/html').body;
            
            let tocs = [...html.querySelectorAll('.h3')].map(x=>{
                let save = [];
                if(x.parentNode.nextElementSibling){
                    save.push(x);
                    save.push([...x.parentNode.nextElementSibling.querySelectorAll('.h6')]);
                } else {
                    save.push(x);
                }
                return save;
            });
            return tocs;
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