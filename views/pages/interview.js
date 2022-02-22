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
    authors: ['kimson'],
    wrote: '2022-02-08 21:50:01',
    list(){
        return Object.keys(this.module).filter(x=>x.slice(1).replace(/[\s\_\-\.]+/gm, '-')!=this.origin.path.slice(1).replace(/[\s\_\-\.]+/gm, '-')).map(m=>{
            return `<li><a href="${this.module[m].path}">${this.module[m].name}</a></li>`;
        }).join('');
    },
    template(){
        return `
        <ul class="list-group">
            ${this.list()}
        </ul>
        `
    }
}