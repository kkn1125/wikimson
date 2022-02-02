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

Api.parent = '#cs';

Router.setPage('Api', Api);
Router.setPage('ContextSwitching', ContextSwitching);
Router.setPage('DeadLock', DeadLock);
Router.setPage('DDD', DDD);
Router.setPage('Framework', Framework);
Router.setPage('GarbageCollection', GarbageCollection);
Router.setPage('HttpHttps', HttpHttps);
Router.setPage('LegacyCode', LegacyCode);
Router.setPage('Library', Library);
Router.setPage('Mvc', Mvc);
Router.setPage('Osi', Osi);
Router.setPage('ProcessThread', ProcessThread);
Router.setPage('PureFunction', PureFunction);

export default {
    pagination: true,
    published: true,
    title: 'cs',
    module: {
        Api: Router['Api'],
        'ContextSwitching': Router['ContextSwitching'],
        'DeadLock': Router['DeadLock'],
        'DDD': Router['DDD'],
        'Framework': Router['Framework'],
        'GarbageCollection': Router['GarbageCollection'],
        'HttpHttps': Router['HttpHttps'],
        'LegacyCode': Router['LegacyCode'],
        'Library': Router['Library'],
        'Mvc': Router['Mvc'],
        'Osi': Router['Osi'],
        'ProcessThread': Router['ProcessThread'],
        'PureFunction': Router['PureFunction'],
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