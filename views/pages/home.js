export default {
    pagination: false,
    published: true,
    title: 'home',
    authors: ['kimson'],
    wrote: '2022-02-08 21:50:01',
    main: `<span class="text-subpoint w-inline h1" style="-webkit-text-stroke-width: medium;
    ">ㄴㅇㄱ</span><span class="fs-3 text-end ms-5">나를 위한 기록</span>`,
    recentPost(){
        requestAnimationFrame(loadBundle);
        function loadBundle(){
            if(!window.wikibundle) requestAnimationFrame(loadBundle);
            else {
                let tempFilter = [...wikibundle].filter(post=>{
                    const max = Math.max(new Date(post.info.wrote), new Date(post.info.modified||0));
                    let time = max;
                    let oneDaysAgo = new Date().getTime()-(1000*60*60*24);
                    if(oneDaysAgo<time) return true;
                    else return false;
                });

                let list = [...tempFilter].map(post=>{
                    const max = Math.max(new Date(post.info.wrote), new Date(post.info.modified||0));

                    let during = new Date(new Date() - max).getTime();
                    let date = parseInt(during/24/60/60/1000);
                    let hour = parseInt(during/60/60/1000%24);
                    let min = parseInt(during/60/1000%60);

                    let duringMsg = date<=0?`${date>0?`${date}일 `:''}${hour>0&&date==0?`${hour}시간 `:''}${min<2&&date==0&&hour==0?`방금 `:`${min}분 `}전`:new Date(post.info.wrote).toLocaleDateString();
                    return `
                    <li class="list-item py-1" recent-post>
                        <a class="nav-link" href="${post.info.origin.path}">${post.info.origin.name}</a>
                        <span class="text-gray text-opacity-25"> | </span>
                        <span class="ms-2 fs-8 text-muted"><time class="text-dark">${duringMsg}</time></span>
                    </li>
                    `
                }).join('');

                if(!document.querySelector('[recent-post]'))
                document.querySelector('[recent-posts]').insertAdjacentHTML('afterbegin', list||`<li  class="list-item py-1" recent-post>최근 1일간 새로운 포스트가 없습니다.</li>`);

                if(document.querySelector('[wiki-length]').innerHTML.trim()=='')
                document.querySelector('[wiki-length]').insertAdjacentHTML('beforeend', wikibundle.length);

                cancelAnimationFrame(loadBundle);
            }
        }
        return '';
    },
    template() {
        return `
        <div class="my-5 p-5 border border-1 border-light rounded-5">
            <div class="mt-3">
                <div class="roundText">${this.main}</div>
            </div>
            <div class="mt-3">
                <div class="w-flex align-items-center mb-3">
                    <span class="fs-1 fw-bold roundText">Wiki List</span>
                    <span class="ms-2 fs-6 tag tag-info" data-pop-type="msg" data-msg="위키 리스트 카운트 입니다. 마스터 페이지 포함입니다." data-msg-dir="end" wiki-length></span>
                </div>
                <div class="w-100">
                    <input id="finder" class="col-20 form-input form-input-lg" type="text" placeholder="검색어를 입력하세요">
                </div>
                <div>
                    <blockquote class="blockquote blockquote-success pe-3">
                        CS에 대한 지식을 기록하는 페이지입니다. 틀린 부분 등은 지적해주시면 정정하도록 하겠습니다.
                    </blockquote>
                    <div>
                        <span class="fs-5 fw-bold roundText">Recent Post</span>
                        <ul class="list-group" recent-posts>
                            ${this.recentPost()}
                        </ul>

                        <span class="fs-5 fw-bold roundText">Notice</span>
                        <ul class="list-group">
                            <li class="list-item frt-none">
                                현재 위키는 본인(kimson)이 직접 구현한 <b>router와 css, markdown parser로 제작</b>한 페이지 입니다.
                            </li>
                            <li class="list-item frt-none">
                                운영체제 (OS) 카테고리 컨텐츠에 적용한 markdown parser에 관심이 있으시면 <a class="text-danger" href="https://github.com/kkn1125/markdown-parser" target="_blank">[markdown 저장소]</a>를 참고 바랍니다.
                            </li>
                            <li class="list-item frt-none">
                                hash방식 페이지 처리에 관심이 있으시면 <a class="text-danger" href="https://github.com/kkn1125/router" target="_blank">[router 저장소]</a>를 참고 바랍니다.
                            </li>
                            <li class="list-item frt-none">
                                현재 페이지에 적용한 penli css 관심이 있으시면 <a class="text-danger" href="https://github.com/kkn1125/penli" target="_blank">[penli 저장소]</a>를 참고 바랍니다.
                            </li>
                            <li class="list-item frt-none">
                                위키 페이지를 사용하고 싶으시다면 저장소를 포크하시면 됩니다.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}