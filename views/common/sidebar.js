import {Router} from '../../core/core.js'

export default {
    template: function (){
        let page = location.hash.slice(1);
        const side = `
        <div class="menu-title text-uppercase mb-5 text-muted roundText"style="min-width:7em;word-break: keep-all;">
            ${!page.match(/home|404/gm)?page.replaceAll('-',' '):'wiki'}
        </div>
        <ul class="list-group">
            ${Router[page].page.published && Router[page].page.pagination || page=='home'
            ?Object.keys(Router)
            .filter(x=>Router[x].page.pagination)
            .sort((a,b)=>{
                a=a.toLowerCase().charCodeAt(0);
                b=b.toLowerCase().charCodeAt(0);
                if(a < b) { return -1; }
                if(a > b) { return 1; }
                return 0;
            }).filter(x=>Router[x].page.published).map(x=>`<li class="list-item"><a href="#${x}">${x}</a></li>`).join('')
            :wikiFilter.sidebar.call(Router[page].page)}
        </ul>`

        return `
            <aside id="lsb" class="side-bar side-bar-size-3 overflow-hidden" data-side-bar="left">
                <div class="p-5 border flex-basis-100 overflow-auto">
                    <div class="position-static position-sticky-sm" style="top: 111.375px;" put-type="side-bar-item">
                        ${side}
                    </div>
                </div>
            </aside>
        `
    }
}