'use strict';
import {Router, Layout} from '../core/core.js'

import Home from '../views/pages/home.js'
import Algorithm from '../views/pages/algorithm.js'
import Javascript from '../views/pages/javascript.js'
import Interview from '../views/pages/interview.js'
import Cs from '../views/pages/cs.js'
import About from '../views/pages/about.js'

import nav from '../views/common/nav.js'
import footer from '../views/common/footer.js'
import sidebar from '../views/common/sidebar.js'
import dotted from '../views/common/dotted.js'

Router.setPage('home', Home);
Router.setPage('algorithm', Algorithm);
Router.setPage('javascript', Javascript);
Router.setPage('interview', Interview);
Router.setPage('cs', Cs);
Router.setPage('about', About);
// Router.setPage('404', Notfound);

Router.setModulePage('nav', nav);
Router.setModulePage('footer', footer);
Router.setModulePage('sidebar', sidebar);
Router.setModulePage('dotted', dotted);

Layout.module = {
    nav, footer, sidebar, dotted
}

Layout.template(`
    {{nav}}
    <div class="main">
        {{sidebar}}
        {{dotted}}
        <main class="fence-full fence-lg overflow-sm-auto" put-type="wiki">
            {{page}}
        </main>
    </div>
    {{footer}}
`);
    
export default {
    ...Router
}