import {Router} from '../../core/core.js'

import Base from './os.base.js'
import Histories from './os.history.js'
import ACA from './os.advanced_computer_architecture.js'
import Interrupt from './os.interrupt_based_system.js'
import ProcessM from './os.process_management.js'

Router.setSubPage('운영체제 서론', 'operating_system-base', Base);
Router.setSubPage('운영체제 역사', 'operating_system-history', Histories);
Router.setSubPage('고등운영체제', 'operating_system-advanced_computer_architecture', ACA);
Router.setSubPage('인터럽트 기반 시스템', 'operating_system-interrupt_based_system', Interrupt);
Router.setSubPage('프로세스 관리', 'operating_system-process_management', ProcessM);

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
        <blockquote class="blockquote blockquote-warning">
            운영체제는 <b class="">경성대학교 양희정 교수님</b>의 강의를 토대로 작성 되었으며, 부가적으로 궁금한 내용을 따로 찾아 정리하였음을 알립니다 🙇‍♂️
        </blockquote>
        <ul class="list-group">
            ${this.list()}
        </ul>
        `
    }
}