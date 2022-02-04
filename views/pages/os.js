import {Router} from '../../core/core.js'

import Base from './os.base.js'

Router.setSubPage('운영체제 서론', 'operating_system-base', Base);

export default {
    pagination: true,
    published: true,
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