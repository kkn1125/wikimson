import {Router, App} from '../../../core/core.js'

import C01First from './interview.comp01.first.js'
import C01Two from './interview.comp01.two.js'
import C01Result from './interview.comp01.result.js'

import C02First from './interview.comp02.first.js'
import C02Result from './interview.comp02.result.js'

Router.setSubPage('Company 01 | 1차 실무진 면접', 'interview.comp01.first', C01First);
Router.setSubPage('Company 01 | 2차 임원진 면접', 'interview.comp01..two', C01Two);
Router.setSubPage('Company 01 | 결과', 'interview.comp01.result', C01Result);

Router.setSubPage('Company 02 | 1차 실무진 면접', 'interview.comp02.first', C02First);
Router.setSubPage('Company 02 | 결과', 'interview.comp02.result', C02Result);

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
            ${wikiFilter.imgonly('covers/interview.jpg', {class: ['w-100'], style: ['aspect-ratio: 16/9']})}
        </div>
        <div>
            <span class="tag tag-warning">문서</span> <span class="fs-7">${Object.keys(this.module).filter(k=>k!=`$${this.origin.name.replace(' ', '_')}`).length} 개</span>
        </div>
        <ul class="list-group">
            ${this.list()}
        </ul>
        `
    }
}