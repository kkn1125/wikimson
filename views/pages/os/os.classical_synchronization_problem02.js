export default {
    published: true,
    title: 'classical synchronization problem 02',
    modified: '',
    done: false,
    tags: ['os', 'classical', 'problem', 'synchronization'],
    categories: ['cs','Operating System'],
    authors: ['kimson'],
    wrote: '2022-03-04 16:41:59',
    toc: true,
    md: true,
    content: [`
# 전통적 동기화 (Classical Synchronization Problem)

## Readers-Writers Problem

... 작성 중 ...

## Dining Philosopher Problem (식사하는 철학자)

... 작성 중 ...
`],
    ref: [
        {
            name: '경성대 양희재 교수님 - 4강 기타 전통적 동기화 문제',
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