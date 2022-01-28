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
    template(){
        return `${this.module['binarysearch'].name}`
    }
}