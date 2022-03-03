export default {
    published: true,
    title: 'classical synchronization problem',
    modified: '',
    done: false,
    tags: ['os', 'classical', 'problem', 'synchronization'],
    categories: ['cs','Operating System'],
    authors: ['kimson'],
    wrote: '2022-03-03 20:56:12',
    toc: true,
    md: true,
    content: [`
# 전통적 동기화 (Classical Synchronization Problem)

프로세스 관리라 하면, 크게 두 가지이다. *CPU Scheduling*, *Process Synchronization*이다.

## Producer & Consumer Problems

> 생산자 소비자 문제 또는 유한버퍼 문제(Bounded Buffer Problem) 라고 한다.

### 생산자와 소비자

\`생산자\`가 데이터를 생산하면 \`소비자\`는 그것을 소비한다. 예를 들면 컴파일러는 C, Java 와 같은 \`high-level\` 언어를 \`low-level\` 언어로 번역하는 것이다. 이때 \`high-level\`언어는 \`Assembly\`코드로 만들어 낸다. 그 다음 \`Assembler\`라는 프로그램이 기계어로 번역한다.

즉, 하나의 언어가 컴파일 되어 나타난 결과는 연달아 처리가 되는데, Compiler가 *생산*해낸 결과(Assembly code)를 Assembler가 소비하는 것이다. 그 외 다른 비유는 아래와 같다.

- 파일 서버 (생산) ==> 클라이언트 (소비)
- 웹 서버 (생산) ==> 웹 클라이언트 (소비)

### Bounded Buffer

일반적으로 생산 속도와 소비 속도는 다르다. \`Producer\`와 \`Consumer\`사이에는 \`Buffer\`를 두게 된다. \`Buffer\`는 데이터를 모아 둘 수 있는 공간이다.

생산된 데이터는 *버퍼에 일단 저장* (속도 차이 등) 된다. *버퍼는* 현실 시스템에서 *크기가 유한*하기 때문에 생산자는 버퍼가 가득 차면 더 넣을 수 없다. 그래서 *생산자는 기다리게* 된다. 소비자가 *버퍼를 소비*하므로써 *공간이 생기면* 생산자가 다시 채워 넣을 수 있다. 반대로 *소비자는 비어있으면* 빼 낼 수 없다.


## Readers-Writers Problem

... 작성 중 ...

## Dining Philosopher Problem (식사하는 철학자)

... 작성 중 ...
`],
    ref: [
        {
            name: '경성대 양희재 교수님 - 4강 생산자-소비자 문제',
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