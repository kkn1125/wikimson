import {Router} from '../../core/core.js'

import Base from './os.base.js'
import Histories from './os.history.js'

Router.setSubPage('운영체제 서론', 'operating_system-base', Base);
Router.setSubPage('운영체제 역사', 'operating_system-history', Histories);

export default {
    pagination: true,
    published: true,
    authors: ['kimson'],
    wrote: '2022-02-08 21:50:01',
    title: 'os',
    list(){
        return Object.keys(this.module).filter(x=>x.slice(1).replace(/[\s\_\-\.]+/gm, '-')!=this.origin.path.slice(1).replace(/[\s\_\-\.]+/gm, '-')).map(m=>{
            return `<li><a href="${this.module[m].path}">${this.module[m].name}</a></li>`;
        }).join('');
    },
    template: function(){
        return `
        <ul class="list-group">
            ${this.list()}
        </ul>
        `
    }
}