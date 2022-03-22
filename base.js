const wikiFilter = {}

'use strict';

(function () {
    Object.defineProperty(Object.prototype, 'toCapitalize', {
        value: function (){
            return this.split(/[\_\-\.\s]+/gm).map(x=>{
                return x.charAt(0).toUpperCase()+x.slice(1);
            }).join(' ');
        }
    })

    let clicked = false;
    let head = window;
    
    window.addEventListener('mousedown', readyToResize);
    window.addEventListener('mouseup', cancelResize);
    window.addEventListener('mousemove', moveHandler);

    window.addEventListener('mousedown', readyToResize);
    window.addEventListener('mouseup', cancelResize);
    window.addEventListener('click', scrollIntoHandler);

    requestAnimationFrame(windowHandler);

    function readyToResize(ev) {
        let target = ev.target;
        if (target.id == 'resizer' && ev.which == 1) clicked = true;
    }

    function cancelResize(ev) {
        clicked = false;
    }

    function moveHandler(ev) {
        if (!clicked && ev.type !== 'touchmove') return;

        let left = ev.x;
        if (ev.type == 'touchmove') {
            left = ev.touches[0].clientX;
        }
        let leftSideBar = document.querySelector('#lsb');
        leftSideBar.style.flex = `0 0 ${left}px`;
    }

    function windowHandler(ev) {
        if(!document.querySelector('#resizer')){
            requestAnimationFrame(windowHandler);
        } else {
            cancelAnimationFrame(windowHandler);
            if (window.innerWidth - 17 < 576) {
                document.querySelector('#resizer').style.display = 'none';
            } else {
                document.querySelector('#resizer').style.display = 'flex';
            }
    
            if (navigator.userAgentData.mobile) {
                head = document.querySelector('#resizer');
                head.addEventListener('touchmove', moveHandler, {
                    passive: true
                });
            } else {
                head = window;
            }
        }
    }

    function readyToResize(ev) {
        let target = ev.target;
        if (target.id == 'resizer' && ev.which == 1) clicked = true;
    }

    function cancelResize(ev) {
        clicked = false;
    }

    function scrollIntoHandler(ev) {
        let target = ev.target;
        if (!target.getAttribute('scroll-to')) return;
        let focus = target.getAttribute('scroll-to');
        let scrollHead = null;
        let isMobile = 0;
        setTimeout(() => {
            for (let key of [...document.querySelectorAll('*')]) {
                if (key.getAttribute('scroll-focus') == focus) {
                    if (window.innerWidth - 17 > 576) scrollHead = document.querySelector('[put-type="wiki"]');
                    else scrollHead = document.querySelector('.main');

                    if(navigator.userAgent.toLowerCase().indexOf('mobile')>-1){
                        isMobile = document.querySelector('#lsb').clientHeight;
                    }

                    scrollHead.scrollTo({
                        behavior: 'smooth',
                        left: 0,
                        top: key.offsetTop + isMobile,
                    });

                    if(!key.classList.contains('focus-highlight')){
                        key.classList.add('focus-highlight');
                        setTimeout(() => {
                            key.classList.remove('focus-highlight');
                        }, 3500);
                    }
                }
            }
        }, 50);
    }
})();

wikiFilter.to = function (name){
    return `scroll-to="${name}"`
}
wikiFilter.focus = function (name){
    return `scroll-focus="${name}"`
}

wikiFilter.sup = function (name, text){
    return `<sup scroll-to="${name}" title="해당 어휘 정의로 이동합니다.">${text}</sup>`
}

wikiFilter.toRef = function (hash, name, text){
    return `<a class="ref" href="#${hash}" ${wikiFilter.to(name)} title="해당 단어 참조로 이동합니다.">${text}</a>`
}

wikiFilter.spy = function scrollSpy(ev) {
    let aside = document.querySelector('#lsb').children[0];

    let spy = [...document.querySelectorAll(`[scroll-to]`)];
    let titles = [...document.querySelectorAll('h1.h1, h2.h2, h3.h3, h4.h4, h5.h5, h6.h6')];
    let last = -1;

    for(let key of titles){
        let top = document.querySelector('[put-type="wiki"]').scrollTop;
        if (key.offsetTop - 16 < top) {
            let focus = key.getAttribute('scroll-focus');
            let spyList = document.querySelector(`[scroll-to="${focus}"]`);
            last = titles.indexOf(key);
        }
    }

    if(last>-1){
        spy.forEach((s,i)=>{
            if(i == last && !s.classList.contains('highlight')){
                s.classList.add('highlight');
                aside.scrollTo({
                    behavior: 'smooth',
                    top: s.offsetTop,
                    left: 0
                });
            } else if(i < last) {
                s.classList.remove('highlight');
            } else if(i > last) {
                s.classList.remove('highlight');
            }
        })
    }
}

wikiFilter.md = function (content, isMd){
    if(isMd)
    return Markdown.parse(content, {
        ol: 'list-group reset',
        ul: 'list-group reset',
        li: 'list-item',
        blockquote: 'blockquote blockquote-info',
        h: {
            custom: true,
            class: 'roundText',
        },
    });
    else return content;
}

wikiFilter.content = function(){
    return this.content.map(c=>{
        c = wikiFilter.md(c, this.md);
        
        c = c.replace(/\{\{([\s\S]+?)\}\}/g, (a,$1)=>{
            let child = $1.split(',').map(x=>`${x.trim()}`);
            let origin = child.reduce((p,n)=>{
                if(p) p[isNaN(n)?n:parseInt(n)];
                return p;
            },this);
            return origin;
        });

        c = c.replace(/\#([\s\S]*?)\[([\s\S]*?)\]:end/g, (origin,text,ref,i)=>{
            let page = ref.split('|').shift();
            let scroll = ref.split('|').pop();
            return `<a class="ref" href="#${page}" scroll-to="${scroll}" title='"${page}"에서 "${scroll}" 참조'>${text}</a>`;
        });
        // table syntax convert
        c = c.replace(/t[hb]:\s?[\S\s]*?[\s\n]*?:end/gm, (match)=>{
            match = match.split('@').map(x=>{
                if(x.match(':end')) return '';
                let sp = x.trim().split(/\:\s?/).map(y=>y.trim());
                if(sp[0].match(/th/g)){
                    return `<thead><tr>${sp[1].split('|').map((y,i)=>`<th${i==0?` width="15%"`:''}>${y}</th$>`).join('')}</tr></thead>`;
                } else {
                    return `<tbody>${sp[1].split('\\').map(y=>'<tr>'+y.split('|').map(z=>`<td>${z.match(/\!/)?`<span class="w-block text-center fw-bold">${z.replace('!','').replace('<br>','')}</span>`:z}</td>`).join('')+'<tr>').join('')}</tbody>`;
                }
            });
            return `<table class="table">${match.filter(y=>y!='').join('')}</table>`
        });
        return `${c}<br>`;
    }).join('')
}

wikiFilter.modified = function(){
    return `<div>
        <span class="h1 roundText">${this.origin.name.split('-').map(x=>x.charAt(0).toUpperCase()+x.slice(1)).join(' ')}</span>
    </div>
    ${this.modified==''&&this.done?`<div>`:''}
    ${this.modified!=''?`<span class="tag text-muted">${new Date(this.modified).toLocaleString().slice(0,-3)} 수정 됨</span>`:``}
    ${this.done?'':`<span class="tag tag-warning">아직 완료되지 않은 문서입니다.</span>`}
    ${this.modified==''&&this.done?`</div>`:''}`
}

wikiFilter.regdate = function(){
    let during = new Date(new Date() - new Date(this.wrote)).getTime();
    let date = parseInt(during/24/60/60/1000);
    let hour = parseInt(during/60/60/1000%24);
    let min = parseInt(during/60/1000%60);

    let duringMsg = `${date>0?`${date}일 `:''}${hour>0&&date==0?`${hour}시 `:''}${min>0&&date==0?`${min}분 `:'방금 '}전`;

    let words = new DOMParser().parseFromString(this.md==true?Markdown.parse(this.content.join(''), {
        ol: 'list-group reset',
        ul: 'list-group reset',
        li: 'list-item',
        blockquote: 'blockquote blockquote-info',
        h: {
            custom: true,
            class: 'roundText',
        },
    }).replace(/\-&gt;|&lt;\-|\=&gt;|&lt;\=/gm, (a,b)=>{
        if(a=='-&gt;'||a=='=&gt;')return '&#10142;';
        else if(a=='&lt;-'||a=='&lt;=') return '&#129044;';
    }):this.content, 'text/html').body.textContent.trim().length;

    return `<ul class="list-group">
        <li class="list-item py-1">
            <span class="tag">tags</span>
            <ul class="w-inline-flex g-1">
                ${this.tags.map(x=>`<li class="tag tag-info">${x}</li>`).join('')}
            </ul>
        </li>
        <li class="list-item py-1">
            <span class="tag">categories</span>
            <ul class="w-inline-flex gx-1">
                ${this.categories.map(x=>`<li class="tag tag-success">${x}</li>`).join('')}
            </ul>
        </li>
        <li class="list-item py-1">
            <span class="tag">작성자</span>
            <span>${this.authors.map(x=>`<span class="tag text-muted">${x}</span>`).join('')}</span>
            <span class="tag">작성일</span>
            <time class="tag time text-muted">${date<1?duringMsg:new Date(this.wrote).toLocaleString().slice(0,-3)}</time>
        </li>
        <li class="list-item py-1 fs-7">
            <span class="tag">Read Time</span>
            <span class="tag text-danger">${Math.ceil(words/250)} min</span>
        </li>
    </ul>`
}

wikiFilter.img = function (url, ref, title='sample', focus){
    let baseurl = './src/images/';
    return `<figure class="text-center"${focus?' '+focus:''}>
        <img src="${url.match(/^http|^https/g)?'':baseurl}${url}" alt="${title}" title="${title}">
        <figcaption class="bg-light p-2 text-muted"><span class="tag tag-light">ref</span><sup class="img"></sup> ${ref}</figcaption>
    </figure>`;
}

wikiFilter.imgonly = function (url, data){
    let baseurl = './src/images/';
    return `<img${data?.hasOwnProperty('style')?` style="${data.style.join(';')}"`:''}${data?.hasOwnProperty('class')?` class="${data.class.join(' ')}"`:''} src="${url.match(/^http|^https/g)?'':baseurl}${url}" alt="sample" title="sample">`;
}

wikiFilter.createToc = function (){
    let html = new DOMParser().parseFromString(this.md==true?Markdown.parse(this.content.join(''), {
        ol: 'list-group reset',
        ul: 'list-group reset',
        li: 'list-item',
        blockquote: 'blockquote blockquote-info',
        h: {
            custom: true,
            class: 'roundText',
        },
    }).replace(/\-&gt;|&lt;\-|\=&gt;|&lt;\=/gm, (a,b)=>{
        if(a=='-&gt;'||a=='=&gt;')return '&#10142;';
        else if(a=='&lt;-'||a=='&lt;=') return '&#129044;';
    }):this.content, 'text/html').body;

    let genToc = [...html.querySelectorAll('.h1,.h2,.h3,.h4,.h5,.h6')];

    let stack = [];
    let temp = '';
    let bid = -1, cid = 0;
    let count = 0;

    genToc.forEach(h=>{
        cid = parseInt(h.tagName.slice(-1));

        if(cid>bid){
            let gap = cid - (bid==-1?cid-1:bid);
            for(let i=0; i<gap; i++){
                stack.push('ol');
                temp += `<${stack[stack.length-1]}>`;
            }
        } else if(cid < bid){
            let gap = bid - cid;
            for(let i=0; i<gap; i++){
                temp += `</${stack.pop()}>`;
            }
        }

        temp += `<li scroll-to="${h.innerText.trim()}-${count++}">${h.innerText.replace(/\{\:(.+)\}/g, '')}</li>`;

        bid = cid;
    });

    let converted = new DOMParser().parseFromString(temp, 'text/html').body;
    converted.querySelector('ol').classList.add('toc');

    return converted.querySelector('ol').outerHTML;
}

wikiFilter.ref = function (){
    let refLink = this.ref.map(({name, link, to})=>{
        if(name !== '' && link !== '') {
            let nameElement = new DOMParser().parseFromString(name, 'text/html').body;
            return `<li class="list-item py-1"><a href="${link}" target="_blank" title="${nameElement.textContent}"${to?' scroll-to="'+to.trim()+'"':''}>${nameElement.innerHTML}</a></li>`;
        } else {
            return '';
        }
    }).join('');

    if(refLink.trim()=='') refLink = null;
    else refLink = '<ol class="list-group">'+refLink+'</ol>';

    return `${this.ref.length>0?'<hr>':''}
    ${refLink?`<div><span class="fw-bold">&#x1F4CC; 함께보면 좋은 자료</span>${refLink}</div>`:''}`;
}

wikiFilter.sidebar = function (){
    return `${!this.toc?'':wikiFilter.createToc.call(this)}`;
}

wikiFilter.scrollPoint = function (){
    [...document.querySelectorAll('h1.h1, h2.h2, h3.h3, h4.h4, h5.h5, h6.h6')].forEach((x,i) => x.setAttribute('scroll-focus', `${x.textContent.trim()}-${i}`));
}

wikiFilter.scrollGauge = function(ev){
    const scrollTop = ev.target.scrollTop;
    const scrollHeight = ev.target.scrollHeight;
    const gap = ev.target.clientHeight;

    const realHeight = scrollHeight - gap;
    
    document.querySelector('.gauge-bar').style.width = `${parseFloat((parseFloat(scrollTop/realHeight)*100).toFixed(2))}%`;
}

wikiFilter.ccl = function() {
    return `<svg
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:cc="http://web.resource.org/cc/"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
    xmlns:svg="http://www.w3.org/2000/svg"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
    xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
    width="120"
    height="42"
    id="svg2759"
    sodipodi:version="0.32"
    inkscape:version="0.45+devel"
    version="1.0"
    sodipodi:docname="by-nc-nd.svg"
    inkscape:output_extension="org.inkscape.output.svg.inkscape">
   <defs
      id="defs2761" />
   <sodipodi:namedview
      id="base"
      pagecolor="#ffffff"
      bordercolor="#8b8b8b"
      borderopacity="1"
      gridtolerance="10000"
      guidetolerance="10"
      objecttolerance="10"
      inkscape:pageopacity="0.0"
      inkscape:pageshadow="2"
      inkscape:zoom="1"
      inkscape:cx="179"
      inkscape:cy="89.569904"
      inkscape:document-units="px"
      inkscape:current-layer="layer1"
      width="120px"
      height="42px"
      inkscape:showpageshadow="false"
      inkscape:window-width="1198"
      inkscape:window-height="624"
      inkscape:window-x="488"
      inkscape:window-y="401" />
   <metadata
      id="metadata2764">
     <rdf:RDF>
       <cc:Work
          rdf:about="">
         <dc:format>image/svg+xml</dc:format>
         <dc:type
            rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
       </cc:Work>
     </rdf:RDF>
   </metadata>
   <g
      inkscape:label="Layer 1"
      inkscape:groupmode="layer"
      id="layer1">
     <g
        transform="matrix(0.9937728,0,0,0.9936696,-437.11979,0)"
        id="g361"
        inkscape:export-filename="/mnt/hgfs/Bov/Documents/Work/2007/cc/identity/srr buttons/big/by-nc-nd.png"
        inkscape:export-xdpi="300.23013"
        inkscape:export-ydpi="300.23013">
     <path
    id="path3817_4_"
    nodetypes="ccccccc"
    d="M 443.28955,0.44873 L 557.35303,0.65185 C 558.94678,0.65185 560.37061,0.41503 560.37061,3.83203 L 560.23096,41.39892 L 440.41064,41.39892 L 440.41064,3.69238 C 440.41064,2.00781 440.57373,0.44873 443.28955,0.44873 z"
    style="fill:#aab2ab" />
 
     <path
    d="M 558.3501,0 L 442.12061,0 C 440.87354,0 439.85889,1.01465 439.85889,2.26123 L 439.85889,41.75732 C 439.85889,42.03906 440.08741,42.26757 440.36963,42.26757 L 560.1001,42.26757 C 560.38233,42.26757 560.61084,42.03905 560.61084,41.75732 L 560.61084,2.26123 C 560.61084,1.01465 559.59619,0 558.3501,0 z M 442.12061,1.02148 L 558.3501,1.02148 C 559.03369,1.02148 559.58936,1.57763 559.58936,2.26123 C 559.58936,2.26123 559.58936,18.15234 559.58936,29.64893 L 476.51612,29.64893 C 473.4712,35.1543 467.60401,38.89258 460.87159,38.89258 C 454.13721,38.89258 448.27198,35.15772 445.22901,29.64893 L 440.88038,29.64893 C 440.88038,18.15235 440.88038,2.26123 440.88038,2.26123 C 440.88037,1.57764 441.43701,1.02148 442.12061,1.02148 z"
    id="path364" />
 
     <g
    id="g5908_4_"
    transform="matrix(0.872921,0,0,0.872921,50.12536,143.2144)">
         
             <path
    id="path5906_4_"
    cx="296.35416"
    ry="22.939548"
    cy="264.3577"
    type="arc"
    rx="22.939548"
    d="M 486.26709,-141.53052 C 486.27271,-132.85028 479.2392,-125.80957 470.55902,-125.80341 C 461.87878,-125.79841 454.83752,-132.83124 454.83191,-141.51148 C 454.83191,-141.51819 454.83191,-141.52436 454.83191,-141.53052 C 454.82629,-150.21186 461.85974,-157.25257 470.53998,-157.25763 C 479.22132,-157.26263 486.26264,-150.22974 486.26709,-141.5495 C 486.26709,-141.54395 486.26709,-141.53723 486.26709,-141.53052 z"
    style="fill:#ffffff" />
 
         <g
    id="g5706_4_"
    transform="translate(-289.6157,99.0653)">
             <path
    id="path5708_4_"
    d="M 772.94281,-253.39801 C 776.42761,-249.9126 778.17059,-245.64465 778.17059,-240.59582 C 778.17059,-235.54644 776.45782,-231.32434 773.03228,-227.92785 C 769.39642,-224.35186 765.10046,-222.56414 760.14227,-222.56414 C 755.2445,-222.56414 751.0224,-224.33672 747.47827,-227.88366 C 743.93188,-231.4295 742.15985,-235.66668 742.15985,-240.59582 C 742.15985,-245.52435 743.93188,-249.79174 747.47827,-253.39801 C 750.93292,-256.88507 755.15497,-258.6275 760.14227,-258.6275 C 765.1911,-258.6275 769.45685,-256.88507 772.94281,-253.39801 z M 749.82422,-251.05371 C 746.8775,-248.07733 745.40412,-244.59082 745.40412,-240.59131 C 745.40412,-236.59302 746.86298,-233.13611 749.77839,-230.22016 C 752.69605,-227.30421 756.16743,-225.84595 760.19599,-225.84595 C 764.22455,-225.84595 767.72614,-227.31873 770.70307,-230.2649 C 773.529,-233.00074 774.94196,-236.44196 774.94196,-240.59132 C 774.94196,-244.70936 773.5055,-248.20485 770.63373,-251.07606 C 767.76306,-253.94673 764.28382,-255.38264 760.19599,-255.38264 C 756.10816,-255.38264 752.64905,-253.93945 749.82422,-251.05371 z M 757.57812,-242.35052 C 757.12841,-243.33221 756.45495,-243.82281 755.55548,-243.82281 C 753.96692,-243.82281 753.17261,-242.75329 753.17261,-240.61425 C 753.17261,-238.47472 753.96692,-237.40575 755.55548,-237.40575 C 756.60486,-237.40575 757.35443,-237.9265 757.80414,-238.97026 L 760.0069,-237.79729 C 758.95642,-235.93181 757.38123,-234.99822 755.28138,-234.99822 C 753.66151,-234.99822 752.36378,-235.49499 751.38935,-236.48784 C 750.41383,-237.48125 749.92603,-238.85057 749.92603,-240.59581 C 749.92603,-242.31139 750.42945,-243.67284 751.43409,-244.68138 C 752.43873,-245.68992 753.69172,-246.19334 755.1919,-246.19334 C 757.4126,-246.19334 759.00117,-245.31907 759.96326,-243.57103 L 757.57812,-242.35052 z M 767.94208,-242.35052 C 767.49121,-243.33221 766.83002,-243.82281 765.95966,-243.82281 C 764.33863,-243.82281 763.52753,-242.75329 763.52753,-240.61425 C 763.52753,-238.47472 764.33863,-237.40575 765.95966,-237.40575 C 767.0113,-237.40575 767.74738,-237.9265 768.16694,-238.97026 L 770.41895,-237.79729 C 769.37067,-235.93181 767.79773,-234.99822 765.70124,-234.99822 C 764.08356,-234.99822 762.78919,-235.49499 761.81477,-236.48784 C 760.8426,-237.48125 760.35487,-238.85057 760.35487,-240.59581 C 760.35487,-242.31139 760.84932,-243.67284 761.83827,-244.68138 C 762.82612,-245.68992 764.08357,-246.19334 765.61177,-246.19334 C 767.82796,-246.19334 769.41542,-245.31907 770.37306,-243.57103 L 767.94208,-242.35052 z" />
 
         </g>
 
     </g>
 
     <g
    enable-background="new    "
    id="g370">
         <path
    d="M 488.25342,32.95605 C 488.5708,32.95605 488.86182,32.98437 489.12354,33.04003 C 489.38526,33.09569 489.60889,33.18749 489.79639,33.31542 C 489.98291,33.44237 490.12744,33.6123 490.23096,33.82323 C 490.3335,34.03514 490.38526,34.29589 490.38526,34.60741 C 490.38526,34.94335 490.30909,35.22264 490.15577,35.44628 C 490.00343,35.67089 489.77784,35.85351 489.47804,35.99706 C 489.89015,36.11522 490.19777,36.32226 490.40089,36.61815 C 490.60401,36.91404 490.70558,37.27049 490.70558,37.68749 C 490.70558,38.02343 490.64015,38.31444 490.50929,38.56054 C 490.37843,38.80566 490.20167,39.00683 489.98097,39.1621 C 489.75929,39.31835 489.50636,39.43358 489.22316,39.5078 C 488.93898,39.583 488.64796,39.6201 488.34816,39.6201 L 485.11183,39.6201 L 485.11183,32.95604 L 488.25342,32.95604 L 488.25342,32.95605 z M 488.06689,35.65137 C 488.32763,35.65137 488.54345,35.58887 488.71142,35.46485 C 488.87939,35.34083 488.96337,35.13965 488.96337,34.86036 C 488.96337,34.70509 488.93505,34.57716 488.87939,34.47852 C 488.82275,34.37891 488.74853,34.30176 488.65478,34.24512 C 488.56103,34.18946 488.45361,34.15039 488.33251,34.12891 C 488.21141,34.10743 488.08446,34.09668 487.9536,34.09668 L 486.58055,34.09668 L 486.58055,35.65137 L 488.06689,35.65137 z M 488.15186,38.47949 C 488.29541,38.47949 488.43213,38.46582 488.56299,38.4375 C 488.69385,38.40918 488.80908,38.3623 488.90967,38.29785 C 489.00928,38.23242 489.08838,38.14355 489.14795,38.03125 C 489.20752,37.91992 489.23682,37.77637 489.23682,37.60254 C 489.23682,37.26074 489.14014,37.0166 488.94678,36.87012 C 488.75342,36.72461 488.49854,36.65137 488.18018,36.65137 L 486.58057,36.65137 L 486.58057,38.47949 L 488.15186,38.47949 z"
    id="path372"
    style="fill:#ffffff" />
 
         <path
    d="M 490.96436,32.95605 L 492.60791,32.95605 L 494.16846,35.58789 L 495.71924,32.95605 L 497.35303,32.95605 L 494.8794,37.0625 L 494.8794,39.62012 L 493.41065,39.62012 L 493.41065,37.02539 L 490.96436,32.95605 z"
    id="path374"
    style="fill:#ffffff" />
 
     </g>
 
     <g
    enable-background="new    "
    id="g376">
         <path
    d="M 512.83057,32.95605 L 515.61475,37.42675 L 515.63037,37.42675 L 515.63037,32.95605 L 517.00537,32.95605 L 517.00537,39.62011 L 515.53955,39.62011 L 512.76611,35.1582 L 512.74756,35.1582 L 512.74756,39.62011 L 511.37256,39.62011 L 511.37256,32.95605 L 512.83057,32.95605 z"
    id="path378"
    style="fill:#ffffff" />
 
         <path
    d="M 522.56885,34.73145 C 522.48194,34.59083 522.37256,34.46778 522.2417,34.36231 C 522.11084,34.25684 521.96338,34.17383 521.79834,34.11524 C 521.6333,34.05567 521.46045,34.02637 521.28076,34.02637 C 520.95068,34.02637 520.67041,34.08985 520.43994,34.21778 C 520.20947,34.34473 520.02295,34.51563 519.88037,34.73048 C 519.73682,34.94532 519.63232,35.18946 519.56689,35.4629 C 519.50146,35.73634 519.46923,36.01954 519.46923,36.31153 C 519.46923,36.5918 519.50146,36.86426 519.56689,37.12794 C 519.63232,37.39259 519.73681,37.63087 519.88037,37.84181 C 520.02295,38.05372 520.20947,38.22267 520.43994,38.3506 C 520.67041,38.47853 520.95068,38.54201 521.28076,38.54201 C 521.72803,38.54201 522.07861,38.40529 522.33056,38.13088 C 522.58251,37.85744 522.73681,37.49611 522.79247,37.04787 L 524.21142,37.04787 C 524.17431,37.46486 524.07763,37.84182 523.92236,38.17775 C 523.76709,38.51466 523.56103,38.8008 523.30615,39.0381 C 523.05127,39.2754 522.75244,39.45607 522.40967,39.58107 C 522.06787,39.70607 521.69092,39.76857 521.28076,39.76857 C 520.77002,39.76857 520.31103,39.6797 519.90283,39.50197 C 519.4956,39.32521 519.15088,39.08009 518.8706,38.76955 C 518.58935,38.45803 518.37451,38.09182 518.22509,37.67189 C 518.07568,37.25099 518.00048,36.79884 518.00048,36.31251 C 518.00048,35.81446 518.07568,35.35255 518.22509,34.92579 C 518.3745,34.49903 518.58935,34.12696 518.8706,33.80958 C 519.15087,33.4922 519.4956,33.24317 519.90283,33.06251 C 520.31103,32.88185 520.77002,32.792 521.28076,32.792 C 521.64795,32.792 521.99463,32.84473 522.32178,32.95118 C 522.64795,33.05665 522.94092,33.21095 523.19873,33.41407 C 523.45752,33.61622 523.67041,33.86719 523.83838,34.16602 C 524.00635,34.46485 524.11182,34.80762 524.15576,35.19336 L 522.73681,35.19336 C 522.7124,35.02539 522.65576,34.87109 522.56885,34.73145 z"
    id="path380"
    style="fill:#ffffff" />
 
     </g>
 
     <g
    enable-background="new    "
    id="g382">
         <path
    d="M 538.83057,32.95605 L 541.61475,37.42675 L 541.63037,37.42675 L 541.63037,32.95605 L 543.00537,32.95605 L 543.00537,39.62011 L 541.53955,39.62011 L 538.76611,35.1582 L 538.74756,35.1582 L 538.74756,39.62011 L 537.37256,39.62011 L 537.37256,32.95605 L 538.83057,32.95605 z"
    id="path384"
    style="fill:#ffffff" />
 
         <path
    d="M 547.16748,32.95605 C 547.59814,32.95605 547.99756,33.02441 548.36865,33.16113 C 548.73974,33.29785 549.06006,33.5039 549.33154,33.77734 C 549.60205,34.05078 549.81396,34.39355 549.96631,34.80371 C 550.11963,35.21484 550.1958,35.69726 550.1958,36.25098 C 550.1958,36.73633 550.1333,37.1836 550.00928,37.59473 C 549.88428,38.00489 549.6958,38.36035 549.44385,38.65821 C 549.19092,38.95704 548.87647,39.19239 548.49951,39.36329 C 548.12255,39.53419 547.6792,39.62013 547.16748,39.62013 L 544.28955,39.62013 L 544.28955,32.95607 L 547.16748,32.95607 L 547.16748,32.95605 z M 547.06494,38.38574 C 547.27685,38.38574 547.48193,38.35156 547.68115,38.2832 C 547.88037,38.21484 548.0581,38.10156 548.21338,37.94238 C 548.36865,37.78418 548.49365,37.57812 548.5874,37.32324 C 548.68017,37.06836 548.72705,36.75683 548.72705,36.39062 C 548.72705,36.05468 548.69482,35.75195 548.62939,35.48144 C 548.56396,35.21093 548.45654,34.97949 548.30712,34.7871 C 548.1577,34.59471 547.96044,34.44628 547.71435,34.34374 C 547.46826,34.2412 547.16455,34.19042 546.80419,34.19042 L 545.75829,34.19042 L 545.75829,38.38573 L 547.06494,38.38573 L 547.06494,38.38574 z"
    id="path386"
    style="fill:#ffffff" />
 
     </g>
 
     <g
    id="g6370_1_"
    transform="translate(286.1464,208.0498)">
         <g
    id="g7610_1_"
    transform="matrix(1.146822,0,0,1.146822,-67.14005,-41.89676)">
             
                 <path
    id="path6372_1_"
    cx="475.97119"
    ry="29.209877"
    cy="252.08646"
    type="arc"
    rx="29.209877"
    d="M 269.61823,-131.7348 C 269.62247,-126.90787 265.71222,-122.99292 260.88486,-122.98907 C 256.05832,-122.98611 252.14295,-126.89593 252.13956,-131.72204 C 252.13956,-131.72714 252.13956,-131.73098 252.13956,-131.7348 C 252.13614,-136.56216 256.04642,-140.47711 260.87293,-140.48095 C 265.69944,-140.48394 269.61481,-136.57409 269.61823,-131.74801 C 269.61823,-131.74374 269.61823,-131.73907 269.61823,-131.7348 z"
    style="fill:#ffffff" />
 
             <path
    id="path6374_1_"
    d="M 260.86526,-141.90982 C 263.71875,-141.90982 266.12945,-140.9263 268.09909,-138.95969 C 270.06869,-136.99219 271.05392,-134.58362 271.05392,-131.73481 C 271.05392,-128.88642 270.08572,-126.5034 268.15017,-124.58659 C 266.09539,-122.56843 263.6668,-121.56022 260.86526,-121.56022 C 258.0986,-121.56022 255.71261,-122.56077 253.70892,-124.5619 C 251.70526,-126.56214 250.70385,-128.95368 250.70385,-131.73481 C 250.70385,-134.51637 251.70525,-136.92493 253.70892,-138.95969 C 255.6615,-140.9263 258.04752,-141.90982 260.86526,-141.90982 z M 252.9928,-134.46866 C 252.68964,-133.6099 252.53723,-132.69876 252.53723,-131.7348 C 252.53723,-129.47952 253.36151,-127.5299 255.00839,-125.88431 C 256.65524,-124.23999 258.61636,-123.41742 260.89166,-123.41742 C 263.1661,-123.41742 265.14422,-124.24808 266.82516,-125.91028 C 267.38803,-126.45398 267.85214,-127.04709 268.21572,-127.69 L 264.37954,-129.39776 C 264.11984,-128.10726 262.96941,-127.23571 261.5797,-127.13351 L 261.5797,-125.56457 L 260.41137,-125.56457 L 260.41137,-127.13351 C 259.26946,-127.1463 258.16674,-127.61337 257.32287,-128.35165 L 258.72448,-129.76477 C 259.39892,-129.12952 260.07418,-128.8447 260.99554,-128.8447 C 261.59246,-128.8447 262.25412,-129.07801 262.25412,-129.8559 C 262.25412,-130.13135 262.14767,-130.32297 261.97992,-130.46729 L 261.00919,-130.89817 L 259.8017,-131.43677 C 259.20392,-131.70331 258.69724,-131.92768 258.18973,-132.15418 L 252.9928,-134.46866 z M 260.89166,-140.07861 C 258.58145,-140.07861 256.6297,-139.26495 255.03308,-137.63638 C 254.59878,-137.19784 254.2207,-136.74014 253.90054,-136.26199 L 257.78952,-134.52996 C 258.1412,-135.60931 259.16644,-136.26412 260.41138,-136.33651 L 260.41138,-137.90548 L 261.57971,-137.90548 L 261.57971,-136.33651 C 262.3844,-136.29775 263.2666,-136.07723 264.13601,-135.40365 L 262.7991,-134.02926 C 262.30606,-134.37927 261.68359,-134.62536 261.06027,-134.62536 C 260.55444,-134.62536 259.83999,-134.47036 259.83999,-133.83468 C 259.83999,-133.73803 259.87322,-133.65289 259.93197,-133.57626 L 261.23312,-132.99807 L 262.11361,-132.60549 C 262.67648,-132.35387 263.21465,-132.11544 263.74685,-131.87829 L 268.96084,-129.557 C 269.13284,-130.2395 269.21969,-130.96587 269.21969,-131.7348 C 269.21969,-134.05823 268.40478,-136.02569 266.77493,-137.63638 C 265.16129,-139.26495 263.20102,-140.07861 260.89166,-140.07861 z" />
 
         </g>
 
     </g>
 
     <g
    id="g6394_1_"
    transform="matrix(0.624995,0,0,0.624995,312.8511,316.9328)">
         
             <path
    id="path6396_1_"
    cx="475.97119"
    ry="29.209877"
    cy="252.08646"
    type="arc"
    rx="29.209877"
    d="M 387.83435,-482.97366 C 387.84216,-473.56265 380.2171,-465.92666 370.80609,-465.91885 C 361.39349,-465.91342 353.75751,-473.53689 353.75122,-482.95022 C 353.75122,-482.9573 353.75122,-482.96664 353.75122,-482.97366 C 353.74499,-492.38546 361.36847,-500.02145 370.78107,-500.02853 C 380.19208,-500.03634 387.82807,-492.41128 387.83435,-482.99948 C 387.83435,-482.99008 387.83435,-482.98306 387.83435,-482.97366 z"
    style="fill:#ffffff" />
 
         <g
    id="g6398_1_"
    transform="translate(-23.9521,-87.92102)">
             <path
    id="path6400_1_"
    d="M 394.47845,-413.72311 C 389.30651,-413.72311 384.9284,-411.92001 381.34552,-408.30978 C 377.66895,-404.5762 375.83142,-400.15817 375.83142,-395.05264 C 375.83142,-389.94949 377.66894,-385.56271 381.34552,-381.89084 C 385.02057,-378.21896 389.40027,-376.38297 394.47845,-376.38297 C 399.61914,-376.38297 404.07385,-378.23533 407.84417,-381.93613 C 411.39422,-385.45334 413.17236,-389.82608 413.17236,-395.05265 C 413.17236,-400.28239 411.36456,-404.69962 407.75042,-408.30979 C 404.13635,-411.92001 399.7113,-413.72311 394.47845,-413.72311 z M 394.5238,-410.36453 C 398.76129,-410.36453 402.3598,-408.86996 405.32074,-405.88168 C 408.3114,-402.92617 409.80518,-399.31753 409.80518,-395.05264 C 409.80518,-390.75888 408.34266,-387.19638 405.41449,-384.36508 C 402.32855,-381.31503 398.69879,-379.79239 394.5238,-379.79239 C 390.34875,-379.79239 386.7503,-381.3002 383.72839,-384.31979 C 380.70648,-387.337 379.19555,-390.91592 379.19555,-395.05264 C 379.19555,-399.19333 380.7221,-402.80197 383.77679,-405.88168 C 386.70496,-408.86996 390.28625,-410.36453 394.5238,-410.36453 z" />
 
             <g
    id="g6402_1_">
                 <path
    id="path6404_1_"
    d="M 401.55505,-399.47849 L 387.98468,-399.47849 L 387.98468,-396.26359 L 401.55505,-396.26359 L 401.55505,-399.47849 z M 401.55505,-393.47763 L 387.98468,-393.47763 L 387.98468,-390.26358 L 401.55505,-390.26358 L 401.55505,-393.47763 z" />
 
             </g>
 
         </g>
 
     </g>
 
     <g
    id="g398">
         <circle
    cx="491.9473"
    cy="15.31396"
    r="10.80615"
    id="circle400"
    sodipodi:cx="491.9473"
    sodipodi:cy="15.31396"
    sodipodi:rx="10.80615"
    sodipodi:ry="10.80615"
    style="fill:#ffffff" />
 
         <g
    id="g402">
             <path
    d="M 495.07474,12.18701 C 495.07474,11.77051 494.73685,11.43359 494.32083,11.43359 L 489.54837,11.43359 C 489.13235,11.43359 488.79446,11.7705 488.79446,12.18701 L 488.79446,16.95996 L 490.12551,16.95996 L 490.12551,22.6123 L 493.7427,22.6123 L 493.7427,16.95996 L 495.07473,16.95996 L 495.07473,12.18701 L 495.07474,12.18701 z"
    id="path404" />
 
             <circle
    cx="491.9346"
    cy="9.1723604"
    r="1.63232"
    id="circle406"
    sodipodi:cx="491.9346"
    sodipodi:cy="9.1723604"
    sodipodi:rx="1.63232"
    sodipodi:ry="1.63232" />
 
         </g>
 
         <path
    clip-rule="evenodd"
    d="M 491.91946,3.40771 C 488.68801,3.40771 485.95169,4.53515 483.71243,6.7915 C 481.41458,9.12451 480.26614,11.88671 480.26614,15.07568 C 480.26614,18.26465 481.41458,21.00781 483.71243,23.30273 C 486.01028,25.59716 488.74661,26.74462 491.91946,26.74462 C 495.13235,26.74462 497.91751,25.58788 500.27395,23.27294 C 502.49368,21.07616 503.60305,18.34325 503.60305,15.07567 C 503.60305,11.80809 502.47414,9.04735 500.21535,6.79149 C 497.95657,4.53516 495.19193,3.40771 491.91946,3.40771 z M 491.94974,5.50732 C 494.59818,5.50732 496.84622,6.44091 498.69583,8.3081 C 500.56595,10.15527 501.50052,12.41162 501.50052,15.07568 C 501.50052,17.75927 500.58548,19.98681 498.75443,21.75634 C 496.8267,23.6621 494.55814,24.61474 491.94974,24.61474 C 489.33939,24.61474 487.09036,23.67187 485.20169,21.78564 C 483.31302,19.89892 482.36868,17.66259 482.36868,15.07568 C 482.36868,12.48925 483.32278,10.23339 485.23098,8.3081 C 487.06204,6.44092 489.3013,5.50732 491.94974,5.50732 z"
    id="path408"
    style="fill-rule:evenodd" />
 
     </g>
 
 </g>
   </g>
 </svg>`
}

wikiFilter.all = function(){
    let temp = '';
    if(!this.hasOwnProperty('pagination')){
        temp += wikiFilter.modified.call(this);
        temp += wikiFilter.regdate.call(this);
        temp += `${this.toc?'<div class="blockquote mt-3 pe-3"><div class="fw-bold">TOC</div>':''}` + wikiFilter.createToc.call(this) + `${this.toc?`</div>`:``}`;
    }
    temp += wikiFilter.content.call(this);
    if(!this.origin.name.match(/about|home/gi)) temp += wikiFilter.ccl();
    if(!this.hasOwnProperty('pagination')){
        temp += wikiFilter.ref.call(this);
    }
    setTimeout(() => {
        wikiFilter.scrollPoint();

        document.querySelector('[put-type="wiki"]').addEventListener('scroll', wikiFilter.scrollGauge);
        document.querySelector('.main').addEventListener('scroll', wikiFilter.scrollGauge);
        document.querySelector('[put-type="wiki"]').addEventListener('scroll', wikiFilter.spy);

        document.querySelector('[put-type="wiki"]').addEventListener('scroll', wikiFilter.scrollGauge);
        document.querySelector('.main').addEventListener('scroll', wikiFilter.scrollGauge);
        document.querySelector('[put-type="wiki"]').addEventListener('scroll', wikiFilter.spy);

        if(!document.querySelector('.prev'))
        document.querySelector('[put-type="wiki"]').insertAdjacentHTML('beforeend', `
            <button class="btn btn-danger prev" onclick="location='${this.parent.path}'">👈목록으로</button>
        `);

        let detectHljs = document.querySelector('.hljs');
        if(!detectHljs) {
            hljs.highlightAll();
            hljs.initLineNumbersOnLoad();
        }

        if(document.querySelector('.next-post')) document.querySelector('.next-post').remove();

        let modules = Object.keys(this.parent.page.module);
        let idx = modules.indexOf('$'+this.origin.path.slice(1).replace(/[\-]/g, '_'));

        if(modules.length-1>idx+1){
            document.querySelector('.gnb').insertAdjacentHTML('afterend', `<div class="next-post fs-7"><button class="btn btn-brand" onclick="location='${this.parent.page.module[modules[idx+1]].path}'">Next</button> <span class="post-name">${this.parent.page.module[modules[idx+1]].convertedName}</span></div>`);
        }
    }, 1);

    return temp;
}

function templateInsertAsync({...options}){
    const id = new Date().getTime().toString().split('').map(x=>String.fromCharCode(65+parseInt(x))).join('');
    
    (async function(){
        let result;

        if(options.string) result = options.string;

        if(options.url){
            let res = await fetch(options.url);
            let data = await res.text();
            result = data;
        }

        window[options.type||'setTimeout'](() => {
            let target = document.querySelector(`#${id}`);
            if(target && target.tagName == 'TEMP') {
                target.insertAdjacentHTML('afterend', `<span id="${id}" class="delay-injection">${result||''}</span>`);
                target.remove();
            } else if(target) target.textContent = result;

            if(target && options.string) result = parseInt(result) + options.increase;
            else if(target && !options.string) result = new options.increase();
        }, options.delay);
    })();

    return `<temp id="${id}"></temp>`;
}

function watch(){
    let cur = location.hash.slice(1);
    if(cur != 'home' && cur != ''){
        document.title = 'Wikimson' + '::' + cur;
    } else {
        document.title = 'Wikimson';
    }
    requestAnimationFrame(watch);
    document.querySelectorAll('ul,ol').forEach(el=>{
        el.querySelectorAll('br').forEach(x=>{
            x.remove();
        })
    })
}

requestAnimationFrame(watch);

let tops, lefts, widths, heights, padding, time='', fm=false, onWords = false;

window.onload = ()=>{
    if(!sessionStorage['readmode']) sessionStorage['readmode'] = false;
    let t = JSON.parse(sessionStorage['readmode']);
    document.querySelector('#focusMode').checked = t;
    fm = t;
}

window.addEventListener('click', (ev)=>{
    const focus_mode = ev.target;

    setTimeout(() => {
        let fms = JSON.parse(sessionStorage['readmode']);
        document.querySelector('#focusMode').checked = fms;
        fm = fms;
    });

    if(!sessionStorage['readmode']) sessionStorage['readmode'] = 'false';

    if(focus_mode.id != 'focusMode') return;

    if(focus_mode.checked){
        fm = true;
    } else {
        const focus = document.querySelector('.focused');
        if(focus) focus.remove();
        fm = false;
    }

    sessionStorage['readmode'] = JSON.stringify(fm);

})

window.addEventListener('mouseover', (ev)=>{
    const p = ev.target;
    const focus = document.querySelector('.focused');
    const bt = document.querySelector('.block-time');
    if(!fm) return;
    if(p.closest('p, blockquote') || (p.closest('li') && p.closest('main'))) {
        let closer = p.closest('li,p, blockquote');
        let rect = closer.getBoundingClientRect();

        if(p.closest('li')) {
            padding = 0.5;
            time = '';
        }
        if(p.closest('p, blockquote')) {
            padding = 1;
            let wordsLength = p.closest('p, blockquote').textContent.trim().length;
            let min = parseInt(wordsLength/250);
            let sec = parseInt(wordsLength/(250/60));
            let toggleTime = [min>0?`${min} m`:'',sec>0?`${sec} s`:``];
            time = `${wordsLength} word${wordsLength>1?'s':''} / ${toggleTime.join(' ')}`;
        }

        tops = closer.offsetTop;
        lefts = closer.offsetLeft;
        widths = rect.width;
        heights = rect.height;
        onWords = true;
    } else {
        onWords = false;
        setTimeout(()=>{
            if(!onWords && bt){
                widths = 0;
                heights = 0;
                padding = 0;
                time = '';

                bt.innerHTML = '';
                bt.innerHTML = time;
                focus.style.top = `${tops}px`;
                focus.style.left = `${lefts}px`;
                focus.style.width = `${widths}px`;
                focus.style.height = `${heights}px`;
                if(padding!=null){
                    focus.style.padding = `${padding}rem`;
                    focus.style.transform = `translate(-${padding}rem, -${padding}rem)`;
                } else {
                    focus.style.padding = `${padding}rem`;
                    focus.style.transform = `translate(-${padding}rem, -${padding}rem)`;
                }
            }
        }, 500);
    }

    if(!p.closest('main')) {
        if(focus)
        document.querySelectorAll('.focused').forEach(el=>el.remove());
        return;
    }

    if(!focus)
    document.querySelector('main').insertAdjacentHTML('beforeend', `<div class="focused"><span class="block-time"></span></div>`);

    if(focus){
        bt.innerHTML = '';
        bt.innerHTML = time;
        focus.style.top = `${tops}px`;
        focus.style.left = `${lefts}px`;
        focus.style.width = `${widths}px`;
        focus.style.height = `${heights}px`;
        if(padding!=null){
            focus.style.padding = `${padding}rem`;
            focus.style.transform = `translate(-${padding}rem, -${padding}rem)`;
        } else {
            focus.style.padding = `${padding}rem`;
            focus.style.transform = `translate(-${padding}rem, -${padding}rem)`;
        }
    }
});

setTimeout(()=>{
    Object.assign(document.body.insertAdjacentElement('beforeEnd', document.createElement('script')),{
        src: 'https://cdn.jsdelivr.net/gh/kkn1125/penli@dabfbd0/docs/assets/js/penli.js',
        integrity: 'sha384-v8IcF+Ajik1Du5Pn4UGwOVizMisxuU6LhXVsWYy1WdP2+1MxTdeJRHuYeDAdtQ6v',
        crossorigin: 'anonymous',
    });
    setTimeout(()=>{
        settingHandler();
        wikiFilter.scrollPoint();
    }, 100);
}, 150);