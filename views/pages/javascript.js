import {Router, App} from '../../core/core.js'

import Console from './javascript.console.js'
import Objects from './javascript.object.js'

Router.setSubPage('Console', 'javascript.console', Console);
Router.setSubPage('Objects', 'javascript.objects', Objects);

export default {
    pagination: true,
    published: true,
    title: '자바스크립트 정리',
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
};