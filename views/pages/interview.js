import {Router, App} from '../../core/core.js'

import First from './interview.first.js'
import Two from './interview.two.js'
import Three from './interview.three.js'

Router.setPage('Comp1', First);
Router.setPage('Comp2', Two);
Router.setPage('Result', Three);

export default {
    pagination: true,
    published: true,
    title: '인터뷰를 정리하자',
    module: {
        'Comp1': Router['Comp1'],
        'Comp2': Router['Comp2'],
        'Result': Router['Result'],
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