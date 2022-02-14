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
            md = this.altCodeBlock();
            this.readBlockUnit();
            // this.raw();
            this.horizontal();
            this.heading();
            this.altTable();
            this.blockListify();
            this.images();
            this.anchors();
            this.paragraphs();
            this.br();
            this.italicBold();
            this.altImages();
            this.altAnchors();
            this.addClass();
        }

        this.readBlockUnit = function () {
            block = md.split(/\n{2,}/gm);
            temp = [...block];
        }

        this.horizontal = function (){
            block.forEach((line, id)=>{
                if(line.match(/^(\-{3,}|\={3,}|\*{3,})(?=\s*)$/gm) && !line.match(/\<\/?(pre|code)\>/g)){
                    console.log(line)
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
                if (line.match(/(^\#+)/gm)) {
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
                if(/(\*+)([\s\S]+?)\*+/g && !x.match(/\<\/?(pre|code)\>/g))
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
                if (line.match(/^\!\[/gm) && !line.match(/\<\/?(pre|code)\>/g)) {
                    const [a, $1, $2, $3] = line.match(/\!\[(.+)\]\(([A-z0-9\.\:\@\/\-\_ㄱ-힣]+)(\s.+)?\)/);
                    block[id] = block[id].replace(/\!\[(.+)\]\(([A-z0-9\.\:\@\/\-\_ㄱ-힣]+)(\s.+)?\)/g, `<img src="${$2}" alt="${$1}"${$3?` title="${$3.replace(/[\'\"]+/gm,'').trim()}"`:''}>`);
                    // block[id] = '';
                }
            });
        }

        this.anchors = function () {
            block.forEach((line, id) => {
                if (line.match(/\[(.+)\]\(([A-z0-9\.\:\@\/\-\_ㄱ-힣#]+)(\s.+)?\)/gm) && !line.match(/\<\/?(pre|code)\>/g)) {
                    const [a, $1, $2, $3] = line.match(/\[(.+)\]\(([A-z0-9\.\:\@\/\-\_ㄱ-힣#]+)(\s.+)?\)/);
                    block[id] = block[id].replace(/\[(.+)\]\(([A-z0-9\.\:\@\/\-\_ㄱ-힣#]+)(\s.+)?\)/g, `<a href="${$2}"${$3?` title="${$3.replace(/[\'\"]+/gm,'').trim()}"`:''}>${$1}</a>`);
                    // block[id] = '';
                }
            });
        }

        this.paragraphs = function () {
            block.forEach((line, id) => {
                
                if (line.trim() != '') {
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
            block.forEach((line, id)=>{
                let table = document.createElement('table');
                let thead = document.createElement('thead');
                let tbody = document.createElement('tbody');
                let toHead = false;
                let classes;

                if(line.match(/(\|.+\|)/g) && !line.match(/\<\/?(pre|code)\>/g)){
                    let rows = line.split(/\n/g);
                    rows = rows.map(row=>row.split(/\|/g));
                    
                    rows = rows.map(r=>{
                        if(r[0]==''){
                            r = r.slice(1);
                        }
        
                        if(r[r.length-1]==''){
                            r = r.slice(0, -1);
                        }
        
                        if(r[0].match(/\{\:(.+)\}/g)){
                            classes = r.pop().replace(/[\{\:\}]/g, '').split('.').filter(x=>x!='');
                        }
                        
                        if(r[0].match(/\{\:(.+)\}/g)){
                            classes = r.pop().replace(/[\{\:\}]/g, '').split('.').filter(x=>x!='');
                        }
                        return r;
                    }).filter(x=>x.length>0);
        
                    rows.map(row=>{
                        let tr = document.createElement('tr');
                        if(row[0].match(/\-{3,}/g)){
                            toHead = true;
                            return '';
                        }
                        if(!toHead){
                            tr.append(...row.map(cols=>{
                                let th = document.createElement('th');
                                th.innerHTML = cols;
                                return th;
                            }));
                            thead.append(tr);
                        } else {
                            tr.append(...row.map(cols=>{
                                let td = document.createElement('td');
                                td.innerHTML = cols;
                                return td;
                            }));
                            tbody.append(tr);
                        }
                    });
        
                    let rowspan = 1;
                    let rowContinus = null;
                    let removeRowTd = [];
                    let basedid = 0;
                    [...tbody.children].forEach((tr, rid, oo)=>{
                        let continues = null;
                        let colspan = 1;
                        [...tr.children].forEach((td, did, o)=>{
                            if(td.innerHTML.trim()==''){
                                if(continues==null) continues = o[did-1];
                                colspan++;
                                td.remove();
        
                                if(o.indexOf(td)==o.length-1){
                                    colspan--;
                                }
        
                                if(colspan>1){
                                    continues.setAttribute('colspan', colspan);
                                }
                            }
        
                            if(td.innerHTML.trim()!='') {
                                continues = null;
                                colspan = 1;
                            }

                            if(td.innerHTML.match(/\^{2,}/g)){
                                if(basedid==-1) basedid = did;
                            }
        
                            if(basedid == did){
                                if(tbody.children[rid]?.children[basedid]?.innerHTML?.match(/\^{2,}/g)){
                                    if(rowContinus == null) rowContinus = tbody.children[rid-1].children[basedid];
        
                                    if(rowContinus) rowspan++;
                                    removeRowTd.push(td);
        
                                    if(rowContinus) rowContinus.setAttribute('rowspan', rowspan);
                                } else {
                                    rowContinus = null;
                                    rowspan = 1;
                                }
                            }
                        });
                    });
                    removeRowTd.forEach(el=>el.remove());
        
                    table.append(thead, tbody);

                    table.classList.add('table');

                    if(classes) table.classList.add(classes);
        
                    convertedHTML[id] = table.outerHTML;
                    block[id] = '';
                }
            });
        }

        this.altCodeBlock = function (){
            if(md.match(/(\`+)([\s\S]+)(\`+)|(\~+)[^\s]([\s\S]+)[^\s](\~+)/gm)){
                return md.replace(/(\`+)([\w]+\n)?([\s\S]+?)(\`+)/gm, (a,dotted,lang,content)=>{
                    console.log(content)
                    let ta = document.createElement('textarea');
                    ta.value = content;
                    let count = dotted.split('').length;
                    if(!lang && count<3){
                        return `<kbd class="bg-info">${content.trim()}</kbd>`;
                    } else {
                        return `<pre><code class="language-${lang.trim()}">${ta.value}</code></pre>`;
                    }
                }).replace(/(\~+)[^\s]([\w]+\n)?([\s\S]+?)[^\s](\~+)/gm, (a,dotted,lang,content)=>{
                    let count = dotted.split('').length;
                    let contents = codeBlockParser.parse(content.trim(), lang);
                    let lines = [...new DOMParser().parseFromString(contents, 'text/html').body.children];
                    let lcount = 1;
                    if(!lang && count<3){
                        return `<kbd class="bg-info">${content.trim()}</kbd>`;
                    } else {
                        return `<pre><code class="language-${lang.trim()}">${ta.value}</code></pre>`;
                    }
                });
            } else return md;
        }

        this.addClass = function (){
            convertedHTML = convertedHTML.map(line=>{
                if(line.match(/\{\:(.+)\}/g)){
                    let origin = line.match(/\{\:(.+)\}/g).pop();
                    let classes = origin.replace(/\{\:(.+)\}/g, '$1').split('.').filter(x=>x!='');
                    let attrs = [];
                    classes.forEach((el,i)=>{
                        if(el.match(/=/g)){
                            attrs.push(classes.splice(i, 1).pop());
                        }
                    });
                    attrs = attrs.map(el=>{
                        let [key, val] = el.split('=');
                        val = val.replace(/[\"]/g, '');
                        return [key, val];
                    });

                    let tag = [...new DOMParser().parseFromString(line, 'text/html').body.childNodes].pop();
                    let text;

                    [...tag.childNodes].filter(x=>x instanceof Text?text=x:null);

                    let idx = [...tag.childNodes].indexOf(text);

                    tag.innerHTML = tag.innerHTML.replace(origin, '');

                    if(tag.childNodes[idx-1]){
                        tag.childNodes[idx-1].classList.add(classes);
                        attrs.forEach(el=>{
                            tag.childNodes[idx-1].setAttribute(el[0], el[1]);
                        });
                    } else {
                        attrs.forEach(el=>{
                            tag.setAttribute(el[0], el[1]);
                        });
                        tag.classList.add(classes);
                    }

                    line = tag.outerHTML;
                    return line;
                } else return line;
            });
        }

        this.br = function (){
            let done = false;
            let isCode = false;
            convertedHTML = convertedHTML.map(x=>{
                if(x.match(/\<(pre|code)\>/g) || x.match(/\<(for|while|var|public|void|int|let|const)\>/gm)){
                    isCode = true;
                    done = false;
                }

                if(x.match(/\<\/(pre|code)\>/g)){
                    if(done==true) isCode = false;
                    done = true;
                }

                if(isCode)
                return '\n'.repeat(2)+x;
                else return x.replace(/\s{3,}/gm, '<br>');
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