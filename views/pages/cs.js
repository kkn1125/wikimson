import {Router} from '../../core/core.js'

import Api from './cs.api.js'
import ContextSwitching from './cs.context_switching.js'
import DeadLock from './cs.dead_lock.js'
import DDD from './cs.domain-driven-design.js'
import Framework from './cs.framework.js'
import GarbageCollection from './cs.garbage_collection.js'
import HttpHttps from './cs.http_https.js'
import LegacyCode from './cs.legacy-code.js'
import Library from './cs.library.js'
import Mvc from './cs.mvc.js'
import Osi from './cs.osi.js'
import ProcessThread from './cs.process_thread.js'
import PureFunction from './cs.pure_function.js'

Router.setSubPage('Api', 'cs.api', Api);
Router.setSubPage('ContextSwitching', 'cs.contextswitching', ContextSwitching);
Router.setSubPage('DeadLock', 'cs.deadlock', DeadLock);
Router.setSubPage('DDD', 'cs.ddd', DDD);
Router.setSubPage('Framework', 'cs.framework', Framework);
Router.setSubPage('GarbageCollection', 'cs.garbagecollection', GarbageCollection);
Router.setSubPage('HttpHttps', 'cs.httphttps', HttpHttps);
Router.setSubPage('LegacyCode', 'cs.legacycode', LegacyCode);
Router.setSubPage('Library', 'cs.library', Library);
Router.setSubPage('Mvc', 'cs.mvc', Mvc);
Router.setSubPage('Osi', 'cs.osi', Osi);
Router.setSubPage('ProcessThread', 'cs.processthread', ProcessThread);
Router.setSubPage('PureFunction', 'cs.purefunction', PureFunction);

export default {
    pagination: true,
    published: true,
    authors: ['kimson'],
    wrote: '2022-02-08 21:50:01',
    title: 'cs',
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