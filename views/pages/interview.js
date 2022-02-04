import {Router, App} from '../../core/core.js'

import First from './interview.first.js'
import Two from './interview.two.js'
import Three from './interview.three.js'

Router.setSubPage('회사 1차 면접', 'interview.first', First);
Router.setSubPage('회사 2차 면접', 'interview.two', Two);
Router.setSubPage('결과', 'interview.three', Three);

export default {
    pagination: true,
    published: true,
    title: '인터뷰를 정리하자',
    list(){
        return Object.keys(this.module).filter(x=>x.slice(1)!=this.origin.path.slice(1)).map(m=>`<li><a href="${this.module[m].path}">${this.module[m].name}</a></li>`).join('');
    },
    template(){
        return `
        <ul class="list-group">
            ${this.list()}
        </ul>
        `
    }
}