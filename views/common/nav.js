import {Router, App} from '../../core/core.js'

export default {
    title: 'home', // Router 객체에 지정한 이름과 동일
    home: '#home',
    module: {}, // 페이지에 모듈을 지정할 때
    wikis: () => Object.keys(Router)
    .filter(x=>Router[x].page.pagination)
    .map(w=>`<li>
        <a class="nav-link" href="${Router[w].path}">${Router[w].convertedName.length>3?Router[w].convertedName:Router[w].convertedName.toUpperCase()}</a>
    </li>`)
    .join(''),
    template: function() {
        const mode = JSON.parse(sessionStorage['mode'])
        return `
        <nav class="gnb position-sticky bg-light us-none gnb-primary">
            <div class="gnb-inner gnb-expand-md hide align-items-center">
                <div class="brand fw-bold w-flex align-items-center">
                    <a href="${App.home}">
                    <span class="text-subpoint">Wiki</span>mson
                    </a>
                </div>
                <div class="menu-btn">
                    <button class="btn btn-light text-gray fs-4" data-target="#gnbMenu" style="line-height: 1">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
                <ul id="gnbMenu" class="gnb-menu vgap-3 w-flex hide">
                    ${this.wikis()}
                    <li id="mode">
                        <label for="mode" id="mtWrap" class="${mode.dark}"><span><i class="${mode.dark=='off'?'fas fa-moon':'far fa-sun'}"></i></span><input type="checkbox" data-switch="mode"></label>
                    </li>
                    <li>
                        <label>
                            문서 읽기 모드
                            <input type="checkbox" id="focusMode" class="form-input">
                        </label>
                    </li>
                </ul>
            </div>
            <div class="scroll-gauge">
                <span class="gauge-bar"></span>
            </div>
        </nav>
        `
    }
}