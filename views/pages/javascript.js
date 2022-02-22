import {Router, App} from '../../core/core.js'

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
};