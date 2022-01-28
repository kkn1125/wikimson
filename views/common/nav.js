import {Router, App} from '../../core/core.js'

export default {
    title: 'home', // Router 객체에 지정한 이름과 동일
    home: '#home',
    module: {}, // 페이지에 모듈을 지정할 때
    wikis: () => Object.keys(Router)
    .filter(x=>Router[x].page.pagination)
    .map(w=>`<li>
        <a class="nav-link" href="#${w}">${w}</a>
    </li>`)
    .join(''),
    template: function() {
        return `
        <nav class="gnb position-sticky bg-light us-none gnb-primary">
            <div class="gnb-inner gnb-expand-md hide align-items-center">
                <div class="brand fw-bold">
                    <a href="${App.home}">${App.brand}</a>
                </div>
                <div class="menu-btn">
                    <button class="btn btn-light text-gray fs-4" data-target="#gnbMenu" style="line-height: 1">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
                <ul id="gnbMenu" class="gnb-menu vgap-3 w-flex hide">
                    ${this.wikis()}
                    <li class="search btn-bundle g-0">
                        <input type="text" class="form-input col">
                        <button class="btn btn-info">
                            <i class="fas fa-search"></i>
                        </button>
                    </li>
                    <li id="mode"></li>
                </ul>
            </div>
        </nav>
        `
    }
}