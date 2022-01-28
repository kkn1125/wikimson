import {Router} from '../../core/core.js'

import Api from './cs.api.js'

Api.parent = '#cs';
Router.setPage('api', Api);

export default {
    pagination: true,
    published: true,
    title: 'cs',
    module: {
        api: Router['api']
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