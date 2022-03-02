export default {
    published: true,
    title: 'Semaphore',
    modified: '',
    done: false,
    tags: ['os', 'critical section', 'semaphore', 'synchronization'],
    categories: ['cs','Operating System'],
    authors: ['kimson'],
    wrote: '2022-03-02 21:39:23',
    toc: true,
    md: true,
    content: [`
# Semaphore

프로세스 동기화가 필요한 이유는 컴퓨터 메모리 안에 있는 프로세스들은 독립적이지 않고 협력하는 관계이다. 그래서 공통 변수에 접근 가능하기 때문에 서로 영향을 주고 받게 된다. 그래서 이러한 문제를 해결하기 위함이다.

... 작성 중 ...
`],
    ref: [
        {
            name: '경성대 양희재 교수님 - 4강 Thread',
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