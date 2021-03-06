import {Router} from '../../../core/core.js'

import Binarysearch from './algorithm.binarysearch.js'
import BFS from './algorithm.bfs.js'

Router.setSubPage('Binarysearch', 'algorithm.binarysearch', Binarysearch);
Router.setSubPage('Bfs', 'algorithm.bfs', BFS);

export default {
    pagination: true,
    published: true,
    title: 'binarysearch',
    authors: ['kimson'],
    wrote: '2022-02-08 22:01:12',
    list(){
        return Object.keys(this.module).filter(x=>x.slice(1).replace(/[\s\_\-\.]+/gm, '-')!=this.origin.path.slice(1).replace(/[\s\_\-\.]+/gm, '-')).map(m=>{
            return `<li><a href="${this.module[m].path}">${this.module[m].name}</a>${this.module[m].page.done?'':'<sub> ⚠ 작성 중인 페이지 입니다.</sub>'}</li>`;
        }).join('');
    },
    template(){
        return `
        <div>
            ${wikiFilter.imgonly('covers/algorithm.jpg', {class: ['w-100'], style: ['aspect-ratio: 16/9']})}
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