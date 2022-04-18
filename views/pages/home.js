import { GET_NOW_TIME, MAIN_NOTICES, NO_POST_NOTICE, TOOLTIP } from "../../core/constants.js";

const getPostLimitDate = (date = 1) => 1000 * 60 * 60 * 24 * date;
const limitDaysAgo = limitDay => GET_NOW_TIME - getPostLimitDate(limitDay);
const stringToTime = stringTime => new Date(stringTime);
const getPostMaxTime = ({wrote, modified}) => Math.max(stringToTime(wrote), stringToTime(modified||0));
const convertPostMaxTimeSet = (max) => {
    const during = new Date(new Date() - max).getTime();
    const date = parseInt(during/24/60/60/1000);
    const hour = parseInt(during/60/60/1000%24);
    const min = parseInt(during/60/1000%60);
    return { during, date, hour, min };
}
const getMessageTemplate = ({date, hour, min}, {wrote}) => {
    return date <= 0 ?
        `${date > 0 ? `${date}일 ` : ''}${hour > 0 && date == 0 ? `${hour}시간 ` : ''}${min<2&&date==0&&hour==0?`방금 `:`${min}분 `}전`:
        stringToTime(wrote).toLocaleDateString();
}
const getTimeSet = info => convertPostMaxTimeSet(getPostMaxTime(info));
const getRecentPostNotice = ({info}) => (({origin}) => {
    const {path, name} = origin;
    const duringMsg = getMessageTemplate(getTimeSet(info), info);
    return `
    <li class="list-item py-1" recent-post>
        <a class="nav-link" href="${path}">${name}</a>
        <span class="text-gray text-opacity-25"> | </span>
        <span class="ms-2 fs-8 text-muted"><time class="text-dark">${duringMsg}</time></span>
    </li>
    `
}).call(this, info);
const isPostWithinLimitTime = ({info}) => limitDaysAgo(6) < getPostMaxTime(info);

const _$ = elemName => document.querySelector(elemName);

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
                const tempFilter = [...wikibundle].filter(isPostWithinLimitTime);

                const list = [...tempFilter].map(getRecentPostNotice).join('');

                if(!_$('[recent-post]'))
                    _$('[recent-posts]').insertAdjacentHTML('afterbegin', list || NO_POST_NOTICE);
                if(_$('[wiki-length]').innerHTML.trim() == '')
                    _$('[wiki-length]').insertAdjacentHTML('beforeend', wikibundle.length);
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
                    ${TOOLTIP(`위키 리스트 카운트 입니다. 마스터 페이지 포함입니다.`, '', 'end')}
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
                        ${TOOLTIP(`최근 1주일간 포스트`, `?`, `end`)}
                        <ul class="list-group" recent-posts>
                            ${this.recentPost()}
                        </ul>

                        <span class="fs-5 fw-bold roundText">Notice</span>
                        <ul class="list-group">
                            ${MAIN_NOTICES.map(notice=>`<li class="list-item frt-none">${notice}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}