import {Router} from '../../core/core.js'

export default {
    pagination: false,
    published: true,
    title: 'home',
    main: `<span class="text-subpoint h1" style="-webkit-text-stroke-width: medium;
    ">ㄴㅇㄱ</span><span class="fs-3 text-end ms-5">나를 위한 기록</span>`,
    wikis: Object.keys(Router),
    template() {
        return `
        <div class="mt-5 p-5 border border-1 border-light rounded-5">
            <div class="mt-3">
                <div class="roundText">${this.main}</div>
            </div>
            <div class="mt-3">
                <div class="w-flex align-items-baseline">
                    <span class="h4 roundText">Wiki List</span>
                    <span class="ms-2 fs-6 tag tag-info" data-pop-type="msg" data-msg="위키 리스트 카운트 입니다." data-msg-dir="end">${this.wikis.length}</span>
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
        </div>
        `
    }
}