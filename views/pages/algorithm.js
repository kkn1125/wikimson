import {Router} from '../../core/core.js'

import Binarysearch from './algorithm.binarysearch.js'

Binarysearch.parent = '#algorithm';
Router.setPage('binarysearch', Binarysearch);

export default{
    pagination: true,
    published: true,
    title: 'binarysearch',
    module: {
        binarysearch: Router['binarysearch'],
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
}