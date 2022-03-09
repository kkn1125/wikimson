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

모니터는 세마포 이후의 고수준 개념의 동기화 도구이다. 세마포를 떠올려보면 \`acquire\`와 \`release\`가 있었고, value값에 대한 조건문으로 동기화를 관리했다.

## 모니터의 구조

공유자원과 공유자원에 접근하는 함수를 가진다. \`common variable\`이 있고, 여기에 접근하는 함수들이 있다.

Queue를 2개 가지는데 하나는 배타동기(Mutual exclusion)를 위함이고, 다른 하나는 조건동기(Conditional Synchronization)를 위한 Queue이다.

배타동기 큐는 common variable에 접근하는 메서드가 있을 때 하나의 스레드만 접근 가능하도록 대기 시키는 역할을 한다.

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