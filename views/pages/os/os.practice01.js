export default {
    published: true,
    title: 'Monitor',
    modified: '',
    done: false,
    tags: ['os', 'monitor', 'problem', 'synchronization'],
    categories: ['cs','Operating System'],
    authors: ['kimson'],
    wrote: '2022-03-09 20:28:34',
    toc: true,
    md: true,
    content: [`
# 정리와 복습

... 작성 중 ...
`],
    ref: [
        {
            name: '경성대 양희재 교수님 - 7강 정리와 복습(1)',
            link: 'http://www.kocw.net/home/cview.do?mty=p&kemId=978503',
        },
    ],
    template(){
        this.title = this.origin.name;
        return `
        ${wikiFilter.all.call(this)}
        `
    }
}