import {tables} from '../../../store/tables/tables.js'

export default {
    published: true,
    title: 'CPU Scheduling Algorithm 03',
    modified: '2022-02-27 22:18:39',
    done: true,
    tags: ['os', 'round robin', 'rr', 'priority', 'multi queue'],
    categories: ['cs','Operating System'],
    authors: ['kimson'],
    wrote: '2022-02-26 17:41:36',
    toc: true,
    md: true,
    content: [`
# CPU Scheduling Algorithm

## Priority Scheduling

> 우선순위가 높은 일을 먼저 서비스한다.

${tables[9]} <sup class="table"></sup>

우선순위 수가 작은 것이 우선순위가 높은 것이다. 간트차트로 다시 흐름을 그려보면 아래와 같다.

${tables[10]} <sup class="table"></sup>

- AWT = (6 + 0 + 16 + 18 + 1) / 5 === \`8.2/msec\`

### Priority

> 우선순위를 정하는데는 내부적인 요소와 외부적인 요소로 정할 수 있다.

- Internal (내부적 요소)
    - Time limit ==> Time limit가 짧은 프로세스를 먼저.
    - Memoty Requirement ==> 메모리를 적게 차지하는 프로세스 먼저.
    - I/O to CPU Burst ==> I/O 혹은 CPU를 많이 차지하는 프로세스가 있을 때 CPU 입장에서 Burst가 짧은 프로세스인 I/O가 길고 CPU Burst가 짧은 프로세스를 먼저 실행.
- External (외부적 요소)
    - Amount of funds being paid ==> 돈 많이 내는 사람 먼저.
    - Political factors ==> 정치적 요소로 급한 것 먼저.

### Preemptive or Nonpreemptive

SJF와 마찬가지로 선점, 비선점 방식으로 구성할 수 있다.

### Problems

- Indefinite blocking ==> starvation (기아)
    - 예를 들어 프로세스 A, B, C가 있을 때 B의 우선순위가 가장 낮다면 새로 들어오는 프로세스의 우선순위가 높을 때 B가 계속해서 대기열에 남아 *CPU시간을 차지하지 못하고 실행되지 않는 것*을 말한다.
- Solution ==> againg (나이 듦)
    - starvation을 해결하기 위해 위와 같은 상황에 놓여있다면 *OS가 주기적*으로 *Ready Queue를 감시*하면서 오랫동안 *실행되지 않고* 있다면 *시간이 지날수록 우선순위를 점진적으로 올려주는 것*을 말한다.

## Round-Robin (RR)

> 빙빙 돌면서 순서대로 서비스한다.

### Time-sharing System (시분할/시공유 시스템)

${tables[11]} <sup class="table"></sup>

Time Quantum(시간 양자) === Time Slice(10 ~ 100/msec) 이고, 시간양자의 단위로는 ⊿(delta)를 사용한다.

### Preemptive Scheduling

\`RR\`은 선점 스케쥴링이다. P@1@이 끝나지 않아도 일정 시간이 지나면 다음 프로세스를 넘어가기 때문이다.

### 예제

${tables[12]} <sup class="table"></sup>

그리고 시간 양자를 나타내는 값이 4⊿(delta)일 때 아래와 같은 흐름으로 그려지게 된다.

${tables[13]} <sup class="table"></sup>

- AWT = (6@P1@ + 4@P2@ + 7@P3@) / 3 === \`5.66/msec\`

\`RR\`은 시간 양자의 값이 얼마여야 가장 성능이 좋을 것인지를 중점으로 Time Quantum에 의존적인 방법이다.

### 델타가 무한대라면?

델타가 무한대이기 때문에 P@1@이 들어오면 P@1@의 작업이 끝날 때까지 진행하고 P@2@가 들어오면 P@2@가 끝날 때까지 진행한다. 이는 \`FCFS\`와 똑같아진다.

### 델타가 0이라면?

*Processor sharing (Context switching overhead)이 발생*한다. 이 말은 Context switching이 너무 자주 일어나기 때문에 *거의 동시에 돌고 있는 것처럼* 느껴지는 것을 말한다.

### Average Turnaround Time (ATT)

이번에는 평균 반환시간을 구해보자.

${tables[14]} <sup class="table"></sup>

#### 델타가 1일 때

\`P@1@\` -> 1/msec ->\`P@2@\` -> 1/msec ->\`P@3@\` -> 1/msec ->\`P@4@\` -> 1/msec ->\`P@1@\` -> 1/msec ->\`P@2@\` -> 1/msec ->\`P@4@\` -> 1/msec ->\`P@1@\` -> 1/msec ->\`P@2@\` -> 1/msec ->\`P@4@\` -> 1/msec ->\`P@1@\` -> 1/msec ->\`P@4@\` ...

- ATT = (15@P1@ + 9@P2@ + 3@P3@ + 17@P4@) / 4 === \`11.0/msec\`

#### 델타가 5일 때

\`P@1@\` -> 5/msec ->\`P@2@\` -> 3/msec ->\`P@3@\` -> 1/msec ->\`P@4@\` -> 5/msec ->\`P@1@\` -> 1/msec ->\`P@4@\` -> 2/msec ->\`끝\`

- ATT = (15@P1@ + 8@P2@ + 9@P3@ + 17@P4@) / 4 === \`12.25/msec\`

## Multilevel Queue (다단계 큐)

> Ready Queue를 여러 개의 Queue로 분리해서 Queue사이에도 우선순위를 부여하는 스케쥴링 알고리즘이다.

### Process Groups

앞서 라운드 로빈이나 \`FCFS\`, \`SJF\` 등등의 예제를 봤을 때 여러 프로세스가 Ready Queue에서 CPU의 서비스를 받기 위해 기다린다. 하지만 *어떤 것은 급하거나, 우선순위가 높거나* 하는 등의 *서로 같은 Queue에 있기에는 안 맞는 경우*가 생긴다. 그래서 *여러 개의 그룹*으로 나누어 그 사이에 *특정 정책을 두고 스케쥴링하는 것*이다. 그룹 기준을 보면 아래와 같다.

- \`System Processes\` ==> 가상메모리 맵핑을 하거나 통신 등을 하는 OS만의 작업을 하는 Process
- \`Interactive Processes\` ==> 대화형 프로세스, 워드프로세스 등의 키보드로 입력하고 응답받는 프로세스
- \`Interactive editing processes\`
- \`Batch Processes\`
- \`Student Processes\`

### Single Ready Queue -> Several separate queues

하나의 큐에서 분산된 큐의 그룹으로 관리하는 것이다.

1. 각각의 Queue에 절재적 우선순위가 존재한다.
    - 주로 System process가 상위
    - 그 다음 Interactive process
    - Batch process
    - Student process ...
2. CPU time을 각 Queue에 차등 배분 가능하다.
    - 100%가 주어질 때 \`A\`가 80%
    - \`B\`가 10%
    - \`C\`가 5%
    - \`D\`가 5% ...
3. 각 Queue에 다른 스케쥴링 정책을 둘 수 있다.
    - 100%가 주어질 때 \`A\`가 80%
    - \`B\`는 FCFS ...
    - \`C\`는 RR으로 델타 값 4msec ...
    - \`D\`는 SJF로 ...
    - \`E\`는 Priority 방식으로 ...

## Multilevel Feedback Queue

> Queue를 여러 개 둔다는 점에서 Multilevel Queue와 유사하다.

${wikiFilter.img('os/os-cpu02.jpg', 'kimson', 'sample')}

첫 번째 정책에서 해봤다가 안되면 다음 그룹으로 넘어가 다시 다른 줄을 서서 CPU 서비스를 기다리는 방법으로 *Queue사이를 옮겨다니며 CPU 서비스를 받게하는 방식*이다.

[그림 1]에서는 아래로 내려가지만, 만일 \`starvation\`이 일어나면 다시 순위를 올려 그룹을 위쪽으로 이동할 수도 있다.

윈도우나 리눅스는 여러 스케쥴링 정책을 사용하고 있다.
`],
    ref: [
        {
            name: 'wiki - 다단계 큐 스케쥴링',
            link: 'https://ko.wikipedia.org/wiki/%EB%8B%A4%EB%8B%A8%EA%B3%84_%ED%81%90_%EC%8A%A4%EC%BC%80%EC%A4%84%EB%A7%81',
        },
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