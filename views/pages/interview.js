import {Router, App} from '../../core/core.js'

import First from './interview.first.js'
import Two from './interview.two.js'
import Three from './interview.three.js'

Router.setPage('회사 1차 면접', First);
Router.setPage('회사 2차 면접', Two);
Router.setPage('결과', Three);

export default {
    pagination: true,
    published: true,
    title: '인터뷰를 정리하자',
    module: {
        '회사 1차 면접': Router['회사 1차 면접'],
        '회사 2차 면접': Router['회사 2차 면접'],
        '결과': Router['결과'],
    },
    list(){
        return Object.keys(this.module).map(m=>`<li><a href="#${m}">${m}</a></li>`).join('');
    },
    template(){
        return `
        <ul class="list-group">
            ${this.list()}
        </ul>
        `
    }
}