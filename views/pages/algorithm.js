import {Router} from '../../core/core.js'

import Binarysearch from './algorithm.binarysearch.js'

Router.setPage('Binarysearch', Binarysearch);

export default{
    pagination: true,
    published: true,
    title: 'binarysearch',
    module: {
        Binarysearch: Router['Binarysearch'],
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