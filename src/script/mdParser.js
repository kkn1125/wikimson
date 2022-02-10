/**
 * @author kimson
 * @since 2022. 02. 07
 * @license MITLicense
 * @description 아직 정리 중 입니다.  미비한 부분이 많습니다.
 */

const Markdown = (function () {
    function Parser() {
        let options, block, temp, md;
        let convertedHTML = [];

        this.init = function (markdown, option) {
            options = option;
            md = markdown;

            this.parse();

            if(options.raw){
                return temp
            } else {
                let body = new DOMParser().parseFromString(convertedHTML.join(''), 'text/html').body
                body.querySelectorAll('.parse-code [lang="javascript"] .token.sc').forEach(el=>{
                    let prev = el.previousElementSibling;
                    if(prev.classList.contains('sp')) prev.remove();
                });

                return body.innerHTML;
            }
        }

        this.renderView = function (){
            return views.renderView(temp, convertedHTML.join(''));
        }

        this.parse = function () {
            this.readBlockUnit();
            // this.raw();
            this.horizontal();
            this.heading();
            this.blockListify();
            this.images();
            this.anchors();
            this.paragraphs();
            this.br();
            this.italicBold();
            this.altImages();
            this.altAnchors();
            this.altTable();
        }

        this.readBlockUnit = function () {
            if(md.match(/(\`+|\~+)/gm)){
                md = md.replace(/(\`+|\~+)([\w]+\n)?([\s\S]+?)(\`+|\~+)/gm, (a,dotted,lang,content)=>{
                    let count = dotted.split('').length;
                    if(!lang && count<3){
                        return `<kbd class="bg-info">${content}</kbd>`;
                    } else {
                        return `<pre><code class="language-${lang.trim()}">${content}</code></pre>`;
                    }
                });
            }

            block = md.split(/\n{2,}/gm);
            temp = [...block];
        }

        this.horizontal = function (){
            block.forEach((line, id)=>{
                if(line.match(/(\-{3,}|\*{3,}|\={3,})/gm)){
                    convertedHTML[id] = line.replace(/^(\-{3,}|\={3,}|\*{3,})(?=\s*)$/gm, (a,$1,$2)=>{
                        return `<hr class="hr">`
                    });
                    block[id] = '';
                }
            });
        }

        this.raw = function () {
            block.forEach((line, id) => {
                if (line.match(/:raw([\s\S]+):rawend/gm)) {
                    convertedHTML[id] = `<p>${line.match(/:raw([\s\S]+):rawend/)[1]}</p>`;
                    block[id] = '';
                }
            });
        }

        this.heading = function () {
            block.forEach((line, id) => {
                if (line.match(/(\#+)/gm)) {
                    convertedHTML[id] = line.trim().replace(/[\s\n]*(\#*)(.+)/gm, (a, $1, $2) => {
                        let count = $1.split('').length;
                        return `<h${count}${options.h?` class="h${count}"`:''}>${$2.replace(/^[\s]*/g, '')}</h${count}>`
                    });
                    block[id] = '';
                }
            });
        }

        this.italicBold = function (){
            convertedHTML = convertedHTML.map(x=>{
                if(/(\*+)([\s\S]+?)\*+/g)
                return x.replace(/(\*{1,3})([\s\S]+?)\*{1,3}/g, (a,$1,$2)=>{
                    return `${$1.length==2?`<em>`:`<b>${$1.length==3?`<em>`:``}`}${$2}${$1.length!=2?`</b>${$1.length==3?`</em>`:``}`:`</em>`}`
                });
                else return x;
            });
        }

        this.blockListify = function (){
            const array = [];
            const checkbox = (cb)=>{
                let ox = cb.match(/\[\s?(x?)\s?\]/);
                if(ox) return cb.replace(/\[\s?(x?)\s?\]/, `<input disabled type="checkbox"${ox[1]?` checked="true"`:``}>`);
                else return cb;
            }
            let indent = 0, before = -1;
            
            block.forEach((line, id)=>{
                if(line.match(/^\s*\>\s/gm) || line.match(/^\s*\-/gm) || line.match(/^\s*[0-9]+\./gm)){
                    convertedHTML[id] = line.split(/\n/gm).filter(x=>x!='').map(li=>{
                        let temp = '';
                        let space = li.match(/(^\s*)/)[1];
                        
                        indent = space.length;

                        if(indent>before){
                            let gap = 0;
                            if(indent > 0 && before == -1){
                                gap = parseInt(indent/(options.indent||4)) + 1;
                            } else {
                                gap = parseInt((indent - before)/(options.indent||4))+(before>-1?0:1);
                            }
                            for(let i=0; i<gap; i++){
                                if(li.match(/^\s*\-/gm)){
                                    array.push('ul');
                                }
                                if(li.match(/^\s*[0-9]+\./gm)){
                                    array.push('ol');
                                }
                                if(li.match(/^\s*\>\s/gm)){
                                    array.push('blockquote');
                                }
                                temp += `<${array[array.length-1]} class="${options[array[array.length-1]]}">`;
                            }
                        } else if(indent < before){
                            let gap = parseInt((before - indent)/(options.indent||4));
                            for(let i=0; i<gap; i++){
                                temp += `</${array.pop()}>`;
                            }
                        }

                        if(li.match(/^\s*\>\s.+/g)){
                            temp += `${checkbox(li.replace(/^\s*\>\s(.+)/gm, '$1'))}`;
                        } else {
                            temp += `<li>${checkbox(li.replace(/^\s*[0-9]\.\s*(.+)/gm, '$1').replace(/^\s*\-\s*(.+)/gm, '$1'))}</li>`;
                        }
                        
                        before = indent;
                        return temp;
                    }).join('\n');
                    while(array.length>0){
                        convertedHTML[id] += `</${array.pop()}>`;
                    }
                    block[id] = '';
                }
                indent = 0;
                before = -1;
                while(array.length>0){
                    array.pop();
                }
            });
        }

        this.checkbox = function (str) {
            let ox = str.match(/\[\s?(x?)\s?\]/);
            if (ox) return str.replace(/\[\s?(x?)\s?\]/, `<input disabled type="checkbox"${ox[1]?` checked="true"`:``}>`);
            else return str;
        }

        this.images = function () {
            block.forEach((line, id) => {
                let classes = this.addClass(line);
                if (line.match(/^\!\[/gm)) {
                    const [a, $1, $2, $3] = line.match(/\!\[(.+)\]\(([A-z0-9\.\:\@\/\-\_ㄱ-힣]+)(\s.+)?\)/);
                    convertedHTML[id] = `<img${classes?` class="${classes}"`:''} src="${$2}" alt="${$1}"${$3?` title="${$3.replace(/[\'\"]+/gm,'').trim()}"`:''}>`;
                    block[id] = '';
                }
            });
        }

        this.anchors = function () {
            block.forEach((line, id) => {
                if (line.match(/^\!\[/gm)) {
                    const [a, $1, $2, $3] = line.match(/\[(.+)\]\(([A-z0-9\.\:\@\/\-\_ㄱ-힣]+)(\s.+)?\)/);
                    convertedHTML[id] = `<a href="${$2}"${$3?` title="${$3.replace(/[\'\"]+/gm,'').trim()}"`:''}>${$1}</a>`;
                    block[id] = '';
                }
            });
        }

        this.paragraphs = function () {
            block.forEach((line, id) => {
                if (line != '') {
                    convertedHTML[id] = `<p>${line}</p>`;
                    // block[id] = '';
                }
            });
        }

        this.altImages = function (){
            convertedHTML.forEach((line, id)=>{
                if(line.match(/\!\[(.+)\]\(([A-z0-9\.\:\@\/\-\_ㄱ-힣]+)(\s.+)?\)/gm)){
                    const [a,$1,$2,$3] = line.match(/\!\[(.+)\]\(([A-z0-9\.\:\@\/\-\_ㄱ-힣]+)(\s.+)?\)/);
                    convertedHTML[id] = convertedHTML[id].replace(/\!\[(.+)\]\(([A-z0-9\.\:\@\/\-\_ㄱ-힣]+)(\s.+)?\)/gm, `<figure><img src="${$2}" alt="${$1}"${$3?` title="${$3.replace(/[\'\"]+/gm,'').trim()}"`:''}></figure>`);
                    // block[id] = '';
                }
            });
        }

        this.altAnchors = function (){
            convertedHTML.forEach((line, id)=>{
                if(line.match(/\[(.+)\]\(([A-z0-9\.\:\@\/\-\_ㄱ-힣]+)(\s.+)?\)/gm)){
                    const [a,$1,$2,$3] = line.match(/\[(.+)\]\(([A-z0-9\.\:\@\/\-\_ㄱ-힣]+)(\s.+)?\)/m);
                    convertedHTML[id] = convertedHTML[id].replace(/\[(.+)\]\(([A-z0-9\.\:\@\/\-\_ㄱ-힣]+)(\s.+)?\)/gm,`<a href="${$2}"${$3?` title="${$3.replace(/[\'\"]+/gm,'').trim()}"`:''}>${$1}</a>`);
                    // block[id] = '';
                }
            });
        }

        this.altTable = function (){
            // convertedHTML = convertedHTML.map(x=>{
            //     if(/(\*+)([\s\S]+?)\*+/g)
            //     return x.replace(/(\*{1,3})([\s\S]+?)\*{1,3}/g, (a,$1,$2)=>{
            //         return `${$1.length==2?`<em>`:`<b>${$1.length==3?`<em>`:``}`}${$2}${$1.length!=2?`</b>${$1.length==3?`</em>`:``}`:`</em>`}`
            //     });
            //     else return x;
            // });
        }

        this.addClass = function (str){
            let classes;
            if(str.match(/\{\:(.+)\}/g)){
                classes = str.match(/\{\:(.+)\}/)[1];
                str = str.replace(/\{\:(.+)\}/g,'');

                return classes.split('.').filter(x=>x!='').join(' ');
            } else {
                return null;
            }
        }

        this.br = function (){
            convertedHTML = convertedHTML.map(x=>{
                return x.replace(/\s{3,}/gm, '<br>');
            });
        }
    }

    return {
        parse(str, options) {
            const parser = new Parser();

            return parser.init(str, options);
        }
    }
})();