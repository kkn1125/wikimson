import {Router} from '../../core/core.js'

import Api from './cs.api.js'
import Alu from './cs.alu.js'
import ControlUnit from './cs.control_unit.js'
import ContextSwitching from './cs.context_switching.js'
import DeadLock from './cs.dead_lock.js'
import DDD from './cs.domain-driven-design.js'
import Framework from './cs.framework.js'
import GarbageCollection from './cs.garbage_collection.js'
import harddisk from './cs.hard_disk.js'
import HttpHttps from './cs.http_https.js'
import Interrupt from './cs.interrupt.js'
import Isr from './cs.interrupt_service_routine.js'
import LegacyCode from './cs.legacy-code.js'
import Library from './cs.library.js'
import Mvc from './cs.mvc.js'
import Osi from './cs.osi.js'
import ProcessThread from './cs.process_thread.js'
import PureFunction from './cs.pure_function.js'

Router.setSubPage('Api', 'cs.api', Api);
Router.setSubPage('Arithmetic and Logic Operation Unit (ALU)', 'cs.alu', Alu);
Router.setSubPage('Control Unit', 'cs.cu', ControlUnit);
Router.setSubPage('Context Switching', 'cs.contextswitching', ContextSwitching);
Router.setSubPage('Dead Lock', 'cs.deadlock', DeadLock);
Router.setSubPage('DDD', 'cs.ddd', DDD);
Router.setSubPage('Framework', 'cs.framework', Framework);
Router.setSubPage('Garbage Collection', 'cs.garbagecollection', GarbageCollection);
Router.setSubPage('Hard Disk', 'cs.hard_disk', harddisk);
Router.setSubPage('Http와 Https', 'cs.httphttps', HttpHttps);
Router.setSubPage('Interrupt', 'cs.interrupt', Interrupt);
Router.setSubPage('Interrupt Service Routine', 'cs.isr', Isr);
Router.setSubPage('LegacyCode', 'cs.legacycode', LegacyCode);
Router.setSubPage('Library', 'cs.library', Library);
Router.setSubPage('Mvc', 'cs.mvc', Mvc);
Router.setSubPage('Osi', 'cs.osi', Osi);
Router.setSubPage('ProcessThread', 'cs.processthread', ProcessThread);
Router.setSubPage('PureFunction', 'cs.purefunction', PureFunction);

export default {
    pagination: true,
    published: true,
    title: 'cs',
    authors: ['kimson'],
    wrote: '2022-02-08 21:50:01',
    list(){
        return Object.keys(this.module).filter(x=>x.slice(1).replace(/[\s\_\-\.]+/gm, '-')!=this.origin.path.slice(1).replace(/[\s\_\-\.]+/gm, '-')).map(m=>{
            return `<li><a href="${this.module[m].path}">${this.module[m].name}</a>${this.module[m].page.done?'':'<sub> ⚠ 작성 중인 페이지 입니다.</sub>'}</li>`;
        }).join('');
    },
    template(){
        return `
        <blockquote class="blockquote blockquote-warning pe-3">
            Computer Science는 공부할 때마다 모르는 단어, 개념을 위키백과, 외국 문서 등을 참고로 작성하고 있습니다. 🙇‍♂️
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