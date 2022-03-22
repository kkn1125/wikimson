import {Router, App} from '../../core/core.js'

export default {
    title: 'home', // Router 객체에 지정한 이름과 동일
    module: {}, // 페이지에 모듈을 지정할 때
    others: [
        {
            href: 'https://kkn1125.github.io',
            target: true,
            name: 'Blog',
        },
        {
            href: 'https://github.com/kkn1125/wikimson',
            target: true,
            name: 'Repository',
        },
    ],
    linkForm({href, name, target}){
        return `<li><a href="${href}"${target?' target="_blank"':''}>${name}</a></li>`
    },
    othersLink(){
        return this.others.map(o=>this.linkForm(o)).join('');
    },
    wikis: () => Object.keys(Router)
    .filter(x=>Router[x].page.pagination)
    .map(w=>`<div><a href="${Router[w].path}" class="nav-link">${Router[w].convertedName.toCapitalize()}</a></div>`)
    .join(''),
    template: function() {
        return `
        <footer class="footer bg-light p-3 text-center fs-7 text-muted" put-name="footer">
            <div>
                <span>Copyright ${new Date().getFullYear()}. ${App.author} all rights reserved.</span>
                |
                <ul class="w-inline-flex gx-3">
                    ${this.othersLink()}
                    |
                    ${this.wikis()}
                </ul>
            </div>
        </footer>
        `
    }
}