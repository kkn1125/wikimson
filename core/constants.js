/**
 * 
 * @param {string} msg message
 * @param {string} content display content
 * @param {string} direction start, end, top, bottom
 * @returns {string} tooltip
 */
const TOOLTIP = (msg, content='', direction='end') => `<span class="ms-2 fs-6 tag tag-info" data-pop-type="msg" data-msg-dir="${direction}" wiki-length data-msg="${msg}">${content}</span>`;

const NO_POST_NOTICE = `<li  class="list-item py-1" recent-post>최근 1주일간 새로운 포스트가 없습니다.</li>`;
const GET_NOW_TIME = new Date().getTime();
const MAIN_NOTICES = [`현재 위키는 직접 구현한 <b>router와 css, markdown parser로 제작</b>한 페이지 입니다.`,
`운영체제 (OS) 카테고리 컨텐츠에 적용한 markdown parser에 관심이 있으시면 <a class="text-danger" href="https://github.com/kkn1125/markdown-parser" target="_blank">[markdown 저장소]</a>를 참고 바랍니다.`,
`hash방식 페이지 처리에 관심이 있으시면 <a class="text-danger" href="https://github.com/kkn1125/router" target="_blank">[router 저장소]</a>를 참고 바랍니다.`,
`현재 페이지에 적용한 penli css 관심이 있으시면 <a class="text-danger" href="https://github.com/kkn1125/penli" target="_blank">[penli 저장소]</a>를 참고 바랍니다.`,
`위키 페이지를 사용하고 싶으시다면 저장소를 포크하시면 됩니다.`];

export { NO_POST_NOTICE, GET_NOW_TIME, MAIN_NOTICES, TOOLTIP };