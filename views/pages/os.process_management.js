export default {
    published: true,
    title: '프로세스 관리',
    modified: '',
    done: false,
    tags: ['os'],
    categories: ['cs','Operating System'],
    authors: ['kimson'],
    wrote: '2022-02-14 18:00:34',
    toc: true,
    md: true,
    content: [`
### 프로세스 관리

... 작업 중
`],
    ref: [
        // {
        //     name: '',//'생활코딩 디자인 패턴',
        //     link: '',//'https://opentutorials.org/module/327/3828'
        // },
    ],
    template(){
        this.title = this.origin.name;
        return `
        ${wikiFilter.all.call(this)}
        `
    }
}