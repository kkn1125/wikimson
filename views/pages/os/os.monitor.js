export default {
    published: true,
    title: 'dead lock',
    modified: '',
    done: false,
    tags: ['os', 'classical', 'problem', 'synchronization'],
    categories: ['cs','Operating System'],
    authors: ['kimson'],
    wrote: '2022-03-08 15:39:58',
    toc: true,
    md: true,
    content: [`
# 모니터

... 작성 중 ...
`],
    ref: [
        {
            name: '경성대 양희재 교수님 - 4강 모니터',
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