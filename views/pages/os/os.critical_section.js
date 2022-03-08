export default {
    published: true,
    title: 'Critical Section',
    modified: '',
    done: true,
    tags: ['os', 'critical section', 'semaphore', '세마포', '임계구역'],
    categories: ['cs','Operating System'],
    authors: ['kimson'],
    wrote: '2022-03-02 21:35:42',
    toc: true,
    md: true,
    content: [`
# Thread

## 임계구역 문제 (Critical-Section Problem) {:.text-danger}

### Critical section

공유 변수 영역이라도고 하며, 병렬컴퓨팅에서 다중 스레드로 구성된 시스템에서 둘 이상의 스레드가 동시에 접근해서는 안되는 공유 자원을 접근하는 코드의 일부를 말한다. 임계 구역은 지정된 시간이 지난 후에 종료된다. 마치 옷가게의 탈의실을 비유하자면 이해가 빨리 되겠다.

각각의 스레드는 코드영역을 가지는데, 함께 사용하는 변수, 파일, 테이블 등을 변경하거나 업데이트 하는 구간을 *critical section*이라 한다.

\`java\`코드를 보면 \`balance = balance + amount;\`가 *critical section*인 것이다.

### 해결방법

아래의 3 가지 조건이 충족되어야 한다.

- mutual exclusion (상호배타) ==> 오류가 일어나지 않으려면 공유 변수에 하나의 스레드가 접근 중이라면 다른 스레드는 들어가면 안 된다는 것이다.
- Progress (진행) ==> 유한 시간 내에 진입 결정이 나야한다.
- Bounded waiting (유한대기) ==> 어느 스레드라도 기다리고 있으면 유한 시간 내에 critical section에 들어갈 수 있다는 이야기이다.

## 프로세스/스레드 동기화

- 임계구역 문제를 해결해야한다.
    - 상호배타
    - 진행
    - 유한대기
- 프로세스/스레드 실행 순서를 원하는대로 제어할 수 있어야 한다.
- Busy wait 등 비효율성은 제거

## 동기화 도구

- Semaphores ==> 전통적인 동기화 도구
- Monitors ==> Java에서 사용
- Misc.
`],
    ref: [
        {
            name: '경성대 양희재 교수님 - 4강 임계구역 문제',
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