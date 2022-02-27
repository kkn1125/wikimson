import {tables} from '../../../store/tables/tables.js'

export default {
    published: true,
    title: 'CPU Scheduling Algorithm 04',
    modified: '',
    done: false,
    tags: ['os', 'process', 'pid'],
    categories: ['cs','Operating System'],
    authors: ['kimson'],
    wrote: '2022-02-27 22:27:39',
    toc: true,
    md: true,
    content: [`
# CPU Scheduling Algorithm

## 프로세스 생성과 종료

> 프로세스는 프로세스에 의해 만들어진다.

- 부모 프로세스 (Parent process)
- 자식 프로세스 (Child process)
- 프로세스 트리 (Process Tree)

### Process Identifier (PID)

- Typically an integer number
- PPID

### 프로세스 생성

- fork system call - 부모 프로세스 복사
- exec() -> 실행파일을 메모리로 가져오기

... 작성 중 ...
`],
    ref: [
        {
            name: '경성대 양희재 교수님 - 4강 CPU 스케쥴링 알고리즘',
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