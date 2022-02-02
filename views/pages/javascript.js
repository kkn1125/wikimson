import {Router, App} from '../../core/core.js'

import Console from './javascript.console.js'
import Objects from './javascript.object.js'

Router.setPage('Console', Console);
Router.setPage('Objects', Objects);

export default {
    pagination: true,
    published: true,
    title: '자바스크립트 정리',
    module: {
        Console: Router['Console'],
        Objects: Router['Objects'],
    },
    list(){
        return Object.keys(this.module).map(m=>`<li><a href="#${m}">${m}</a></li>`).join('');
    },
    template(){
        return `
        <ul class="list-group">
            ${this.list()}
        </ul>
        `
    }
};