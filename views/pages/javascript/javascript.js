import {Router, App} from '../../../core/core.js'

import Console from './javascript.console.js'
import Objects from './javascript.object.js'

Router.setSubPage('Console', 'javascript.console', Console);
Router.setSubPage('Objects', 'javascript.objects', Objects);

export default {
    pagination: true,
    published: true,
    title: '자바스크립트 정리',
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
            ${wikiFilter.imgonly('covers/javascript.jpg', {class: ['w-100'], style: ['aspect-ratio: 16/9']})}
        </div>
        <div>
            <span class="tag tag-warning">문서</span> <span class="fs-7">${Object.keys(this.module).filter(k=>k!=`$${this.origin.name.replace(' ', '_')}`).length} 개</span>
        </div>
        <ul class="list-group">
            ${this.list()}
        </ul>
        `
    }
};