import {Router} from '../../../core/core.js'

import Base from './os.base.js'
import Histories from './os.history.js'
import ACA from './os.advanced_computer_architecture.js'
import Interrupt from './os.interrupt_based_system.js'
import DualMode from './os.dual_mode.js'
import OSService from './os.service.js'
import ProcessM from './os.process_management.js'
import CPUscheduling01 from './os.cpu_scheduling01.js'
import CPUscheduling02 from './os.cpu_scheduling02.js'
import CPUscheduling03 from './os.cpu_scheduling03.js'
import ProcessSync from './os.process_synchronization.js'
import CriticalSection from './os.critical_section.js'
import Semaphores from './os.semaphores.js'
import ClassicalSync01 from './os.classical_synchronization_problem01.js'
import ClassicalSync02 from './os.classical_synchronization_problem02.js'
import Deadlock from './os.deadlock.js'
import Monitor from './os.monitor.js'

Router.setSubPage('운영체제 서론', 'operating_system-base', Base);
Router.setSubPage('운영체제 역사', 'operating_system-history', Histories);
Router.setSubPage('고등운영체제', 'operating_system-advanced_computer_architecture', ACA);
Router.setSubPage('인터럽트 기반 시스템', 'operating_system-interrupt_based_system', Interrupt);
Router.setSubPage('이중 모드', 'operating_system-dual-mode', DualMode);
Router.setSubPage('운영체제 서비스', 'operating_system-service', OSService);
Router.setSubPage('프로세스 관리', 'operating_system-process_management', ProcessM);
Router.setSubPage('CPU 스케쥴링 알고리즘 01', 'operating_system-cpu_scheduling_01', CPUscheduling01);
Router.setSubPage('CPU 스케쥴링 알고리즘 02', 'operating_system-cpu_scheduling_02', CPUscheduling02);
Router.setSubPage('CPU 스케쥴링 알고리즘 03', 'operating_system-cpu_scheduling_03', CPUscheduling03);
Router.setSubPage('프로세스 동기화', 'operating_system-process_synchronization', ProcessSync);
Router.setSubPage('임계구역 문제', 'operating_system-critical_section', CriticalSection);
Router.setSubPage('세마포', 'operating_system-semaphores', Semaphores);
Router.setSubPage('전통적 동기화 - 1', 'operating_system-classical_synchronization_01', ClassicalSync01);
Router.setSubPage('전통적 동기화 - 2', 'operating_system-classical_synchronization_02', ClassicalSync02);
Router.setSubPage('교착상태 (deadlock)', 'operating_system-deadlock', Deadlock);
Router.setSubPage('모니터', 'operating_system-monitor', Monitor);

export default {
    pagination: true,
    published: true,
    title: 'os',
    authors: ['kimson'],
    wrote: '2022-02-08 21:50:01',
    list(){
        return Object.keys(this.module).filter(x=>x.slice(1).replace(/[\s\_\-\.]+/gm, '-')!=this.origin.path.slice(1).replace(/[\s\_\-\.]+/gm, '-')).map(m=>{
            return `<li><a href="${this.module[m].path}">${this.module[m].name}</a>${this.module[m].page.done?'':'<sub> ⚠ 작성 중인 페이지 입니다.</sub>'}</li>`;
        }).join('');
    },
    template: function(){
        return `
        <div>
            ${wikiFilter.imgonly('covers/os.jpg', {class: ['w-100'], style: ['aspect-ratio: 16/9']})}
        </div>
        <blockquote class="blockquote blockquote-warning pe-3">
            운영체제는 <b class="">경성대학교 양희재 교수님</b>의 강의를 토대로 작성 되었으며, 부가적으로 궁금한 내용을 따로 찾아 정리하였음을 알립니다 🙇‍♂️
        </blockquote>
        <div>
            <span class="tag tag-warning">문서</span> <span class="fs-7">${Object.keys(this.module).filter(k=>k!=`$${this.origin.name.replace(' ', '_')}`).length} 개</span>
        </div>
        <ul class="list-group">
            ${this.list()}
        </ul>
        `
    }
}