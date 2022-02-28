import {tables} from '../../../store/tables/tables.js'

export default {
    published: true,
    title: 'Process Synchronization',
    modified: '2022-02-28 22:25:48',
    done: false,
    tags: ['os', 'process', 'pid'],
    categories: ['cs','Operating System'],
    authors: ['kimson'],
    wrote: '2022-02-27 22:27:39',
    toc: true,
    md: true,
    content: [`
# Thread

## 쓰레드 (Thread)

> 프로그램 내부의 흐름, 맥이다.

\`\`\`java
class Test {
    public static void main(String[] args) {
        int n = 0;
        int m = 6;
        System.out.pringln(n * m);
        while(n < m)
        n++;
        System.out.pringln("Bye");
    }
}
\`\`\`

위의 코드가 프로그램의 흐름이다. 이러한 맥을 쓰레드라 한다.

### 다중 쓰레드(Multithreads)

한 프로그램에 2개 이상의 맥이 있다는 의미이다. 맥(흐름)이 빠른 시간 간격으로 스위칭되기 때문에 여러 맥이 동시에 실행되는 것처럼 보인다. \`동시(concurrent){:.bg-danger}\` vs \`진짜로 동시에(simultaneous)\`. 실제로는 CPU가 하나이기 때문에 concurrent한 것이 맞다.

- 웹 ==> 화면을 출력하는 스레드와 데이터를 읽어오는 스레드
- 워드 프로세서 ==> 화면 출력 스레드 + 키보드 입력 스레드 + 철자/문법 오류 확인 스레드

하나의 프로세스에는 기본 1개의 스레드를 가진다. 이를 *단일 스레드(Single Thread) 프로그램*이라 한다. 하나의 프로세스에 여러 개의 스레드가 있으면 *다중 스레드(Multi-thread) 프로그램*이라 한다.

### 스레드의 구조

프로세스는 서로의 메모리를 공유한다. 스택은 공유하지 않는다. 하나의 스레드가 호출되어 실행될텐데 이때 파라미터나 리턴 어드레스 등은 스위칭 때 다른 스레드에 가야하기 때문에 공유하면 안 된다.

- 프로세스 메모리 공간 공유 (code, data)
- 프로세스의 자원 공유(file, I/O)
- 비공유 ==> 개별적인 PC, SP, registers, stack

### 프로세스 스위칭 vs 스레드 스위칭

옛날에는 프로세스만 스위칭 되는 형식이었지만 현대에는 스레드도 같이 스위칭되기 때문에 *컨텍스트 스위칭 단위*는 프로세스가 아닌 *스레드*가 된다.

### 맥 만들기 (🍎 ❌)

> java.lang ==> Thread
> 주요 메서드
    - public void run() ==> 새로운 맥이 흐르는 곳 (치환)
    - void start() ==> 스레드 시작 요청
    - void join() ==> 스레드 마치기 기다림
    - static void sleep() ==> 스레드 잠자기
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