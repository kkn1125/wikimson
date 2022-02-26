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
            return `<li><a href="${this.module[m].path}">${this.module[m].name}</a>${this.module[m].page.done?'':'<sub> ⚠ 작성 중인 페이지 입니다.</sub>'}</li>`;
        }).join('');
    },
    template(){
        return `
        <div>
            <span class="tag tag-warning">문서</span> <span class="fs-7">${Object.keys(this.module).filter(k=>k!=`$${this.origin.name.replace(' ', '_')}`).length} 개</span>
        </div>
        <ul class="list-group">
            ${this.list()}
        </ul>
        `
    }
}