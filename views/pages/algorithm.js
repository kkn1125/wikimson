import {Router} from '../../core/core.js'

import Binarysearch from './algorithm.binarysearch.js'

Router.setSubPage('Binarysearch', 'algorithm.binarysearch', Binarysearch);

export default{
    pagination: true,
    published: true,
    title: 'binarysearch',
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