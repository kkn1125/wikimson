import {tables} from '../../store/tables/tables.js'

export default {
    published: true,
    title: 'CPU Scheduling Algorithm',
    modified: '2022-02-26 22:09:10',
    done: false,
    tags: ['os'],
    categories: ['cs','Operating System'],
    authors: ['kimson'],
    wrote: '2022-02-26 17:41:36',
    toc: true,
    md: true,
    content: [`
# CPU Scheduling Algorithm

## CPU Scheduling

Ready Queue 혹은 메인 메모리에 프로세스가 줄을 서 있을 때, 현재 실행하고 있는 프로세스가 끝나고 그 다음 어떤 프로세스를 선택해서 서비스를 받게 해 줄 것인가를 결정하는 것.

## Pre-emptive(선점)

CPU가 어떠한 프로세스를 실행하고 있을 때, 아직 프로세스가 일이 끝나지도 않았고, \`I/O\`를 만난 것도 아닌데 강제로 내보내고 새로운 프로세스를 실행하게 하는 것. 병원으로 예를 들 때, 환자(프로세스)를 진료보다가 응급환자(Ready Queue 중 급한 하나의 프로세스)를 먼저 보는 것과 유사하다. 즉, 현재 CPU 점유 중인 프로세스가 쫓겨나는 것을 허용하는 스케쥴링 인 것이다.

## Non-pre-emptive (비선점)

선점과 반대로 CPU가 프로세스 실행 중에 있을 때, 프로세스가 종료되거나 \`I/O\`를 만나기 전까지는 스케쥴링이 안 일어나도록 하는 것. 병원으로 예를 들 때, 환자(프로세스)를 진료가 다 끝날 때 까지 다른 환자들은 대기실(Ready Queue)에 있는 것과 유사하다.

## Scheduling Criteria (스케쥴링 척도)

### CPU Utilization (CPU 이용률) {:.text-danger}

> CPU가 *얼마나 lose(사용하지 않는 것) 없이 일을 하는가*를 말한다.

예를 들어 \`P@1@\`, \`P@2@\`, \`P@3@\`이 있을 때, \`P@1@\`, \`P@2@\`, \`P@3@\` 순서로 하면 효율이 100%이고 \`P@3@\`, \`P@1@\`, \`P@2@\` 순서는 80%일 때 당연히 효율이 높은 100%로 순서를 가지는 것이 좋다.

즉, 쉬지 않고 CPU를 *빈 틈 없이 활용하는 것을 말한다*. 단위로 보면 \`%\`이다.

### Throughput (처리율) {:.text-danger}

> 시간 당 몇 개의 작업을 처리하는 지를 말한다.

예를 들어, 어느 방식으로 스케쥴링을 만들었더니 주어진 1초 동안 프로세스를 3개 처리하는 Schedule@1@이 있고, 다르게 만들었더니 동일 시간에 5개를 처리하는 Schedule@2@가 있을 때 더 많이 일을 처리한 것이 Schedule@2@이다.

*주어진 시간에 얼마나 많은 일을 처리하느냐*를 말한다. 단위로 보면 \`Job/@time(sec, min ...)@\`이다.

### Turnaround Time (반환 시간) {:.text-danger}

> 어떠한 작업이 Ready Queue에 들어갔을 때부터 작업을 끝내고 나오는 데 걸리는 시간을 말한다.

보통 한 번에 작업이 끝나지 않고 여러 프로세스를 CPU가 서비스하면서, I/O도 만나고, Timesharing 같은 경우는 CPU보호 차원에서 일정 시간마다 인터럽트를 걸고, 등의 과정을 거치고 프로세스가 작업을 종료하는 데 까지의 시간을 *Turnaround Time*이라 한다.

이번에는 예비군으로 비유를 해보자. 예비군을 가게 되면 여러 스케쥴이 있다. 입소를 하고 일정을 모두 이수하고 퇴소하기 까지의 시간이라 생각하면 된다.

${wikiFilter.img('os/os-cpu01.jpg', 'kimson', 'sample')}

마치 프로세스가 Ready Queue에 대기하고 있는 것처럼 훈련장에 대기 팀이 많으면 입소 시 팀을 이룬 사람들과 대기한다. 이러한 일련의 과정을 포함해서 퇴소하기 까지의 시간이라 생각하면 쉽다. 단위로는 \`time(sec, min ...)\`이다.

### Waiting Time (대기 시간) {:.text-danger}

> CPU의 서비스를 받기 위해 *Ready Queue에서 대기한 시간*을 말한다.

음식점에서 Waiting이 있다면 그 시간이 짧으면 짧을수록 좋다. CPU의 입장에서도 마찬가지이다. 단위는 \`time(sec, min ...)\`이다.

### Response Time (응답 시간) {:.text-danger}

${wikiFilter.toRef('operating-system-process-management', 'Midium-term Scheduler-18', 'Interactive System')}, 대화형 컴퓨터에서 중요하다. 화면과 키보드가 있을 때, 키보들 명령을 내리고 응답 없이 아무 일도 일어나지 않으면 응답을 기다리는 시간이 지루한 시간이 된다. 뒤가 느리더라도 첫 응답이 빠르면 빠르다고 생각이 된다.

처음 응답이 나오는 시간을 *Response Time*이라 한다.

## CPU Scheduling Algorithm {:.text-danger}

### First-Come, First-Served (FCFS)

> 먼저 온 일을 먼저 서비스한다.

자료구조에서 배우는 FIFO와 의미가 유사하다. Queue에서 적용되는 형태로 먼저 들어오면 먼저 나가는, 먼저 들어온 프로세스를 먼저 서비스해주는 것이다.

병원이나 은행 등에 이러한 형태로 많이 서비스를 한다.

- 방법이 간단하다.
- 공평하다.
- 꼭 좋지만은 않다.

#### Find Average Waiting Time

${tables[0]} <sup class="table"></sup>

P@1@와 P@2@, P@3@이 있다고 가정할 때 각각 \`Busrt Time{:title="해당 프로세스가 CPU를 얼마나 사용할 것인가"}\`이 24, 3, 3이라면, 평균 대기 시간 (AWT)는 무엇인가?

24 + 3 + 3이라고 생각 할 수도 있지만 이것은 Burst Time이고, 대기 시간을 보면 다른 식을 세워야한다는 것을 알 수 있다.

${tables[1]} <sup class="table"></sup>

P@1@은 대기시간이 \`0\`이다. P@2@는 대기시간이 P@1@이 끝난 \`24\`이고, P@3@의 대기시간은 P@2@가 끝나는 \`27(24 + 3)\`이다. 각 대기시간의 합을 프로세스의 개수 \`3\`으로 나누어주면 \`AWT\`는 *17/msec*이 된다. 즉, 식으로 보면 아래와 같다.

- AWT = (0@P1@ + 24@P2@ + 27@P3@) / 3 === \`17/msec\`

##### 만일 반대로 순서를 세웠으면 어떻게 될까?

[표 2]를 다시 바꾸어 보면 아래와 같을 것이다.

${tables[2]} <sup class="table"></sup>

P@3@가 먼저 시작하고 그 다음이 P@2@가, 마지막으로 P@1@이 오게 된다. 이렇게 되면 AWT는 *3/msec*이 된다.

- AWT = (0@P1@ + 3@P2@ + 6@P3@) / 3 === \`3/msec\`

이렇게 봤을 때 순서대로 들어왔을지라도 그대로 처리하면 대기시간 면에서는 별로 좋지 않다는 것을 알 수 있다.

> \`Burst Time\` ==> 해당 프로세스가 CPU를 얼마나 사용할 것인가

#### Convoy Effect (호위 효과)

왕을 예로들면 시중들이 따라다니는 모습을 떠올리면 된다. 프로세스를 예로 들면, CPU 시간을 많이 잡아먹는 프로세스가 앞에 있으면 뒤의 프로세스들이 기다려야하는 모습을 마치 뒤따라 다니는 모습이라 해서 호위효과라 부른다.

- \`FCFS\`에서 일어나는 단점 중 하나이다.
- Non-preemptive Scheduling이다.

### Shortest-Job-First (SJF)

> 짧은 일을 먼저 서비스한다.

은행 등에서 짧게 끝나는 프로세스를 앞세워야 전체적인 시간을 줄일 수 있다는 이야기이다. 예를 들어 표를 그려보자.

${tables[3]} <sup class="table"></sup>

이렇게 P@1@부터 P@4@까지의 프로세스가 있고, 각각 Burst Time이 주어질 때 AWT를 구해보자.

${tables[4]} <sup class="table"></sup>

- AWT = (0@P1@ + 3@P2@ + 9@P3@ + 16@P4@) / 4 === \`7/msec\`

#### 그렇다면 FCFS 측면에서 계산해보면 어떻게 될까?

${tables[5]} <sup class="table"></sup>

- AWT = (0@P1@ + 6@P2@ + 14@P3@ + 21@P4@) / 4 === \`10.25/msec\` (FCFS)

표 4가 더 좋은 결과를 가져온다.

- \`Provably optimal\` (증명 최적) ==> SJF는 대기시간을 줄이는 측면에서 가장 좋은 방법이다.
- \`Not Realistic{:.bg-danger}\` ==> 돌려봐야 CPU 활용시간(Burst Time)을 알 수 있는데 이것은 비현실적이다.
- \`Prediction may be needed\` ==> 하지만 CPU가 활용되는 시간을 예측해 볼 수는 있다. n번째는 CPU를 얼마나 사용했는가, m번째는 CPU를 얼마나 사용했는가를 OS가 조사를 해서 다음 번에는 CPU가 얼마만큼의 CPU를 사용하겠다를 예측하는 것이다. 그만큼 과거의 기록을 많이 가지고 있어야 하기 때문에 overhead가 많은 것이다.

#### Preemptive or Nonpreemptive

##### Nonpreemptive의 예제

${tables[6]} <sup class="table"></sup>

위의 표는 도착 시간이 함께 표시되어 있다. 도착시간 0에 P@1@만 있으므로 P@1@을 먼저 앞에 둔다. Nonpreemptive이기 때문에 나머지 프로세스는 Ready Queue에 대기하게 된다.

${tables[7]} <sup class="table"></sup>

AWT를 계산하면 위의 표와 같이 나온 \`WT\`를 합산해서 나눈다. P@1@은 0에 도착해서 대기시간이 없이 CPU를 활용했다. P@2@는 1에 도착해서 P@1@이 끝나는 8msec까지 기다렸다. 그러면 7msec을 기다린 것이다. P@3@는 2msec에 도착해서 17msec을 기다렸으니 15msec이 된다.

- AWT = (0@P1@ + 7@P2@ + 15@P3@ + 9@P4@) / 4 === \`7.75/msec\`

##### Preemptive의 예제

> 이 방식은 실행 후 얼마나 짧은 시간이 남아있는가를 우선으로 해서 작업을 처리하는 방식이다. 이를 다른 말로 *Shortest-Remaining-Time-First (최소잔여시간 우선)*이라 한다.

표 7을 그대로 사용해보자.

Preemptive는 급한 프로세스를 먼저 처리하기 때문에 표 6과는 많이 다르게 도착 시간에 따라 계산된다.

${tables[8]} <sup class="table"></sup>

1. \`0/msec{:.bg-brand}\` ==> P@1@이 들어온다. 8msec 만큼 CPU를 사용한다.
2. \`1/msec{:.bg-brand}\` ==> P@2@가 들어온다. 이 시점에서 각각의 Burst Time은 아래와 같다.
    - P@1@ -> \`7/msec\`
    - P@2@ -> \`4/msec{:.bg-danger}\`
    - 둘 중 P@2@가 급하므로 컨텐스트 스위칭이 일어나 P@2@가 점유하게 된다.
3. \`2/msec{:.bg-brand}\` ==> P@3@이 들어온다.
    - P@1@ -> \`7/msec\`
    - P@2@ -> \`3/msec{:.bg-danger}\`
    - P@3@ -> \`9/msec\`
4. \`3/msec{:.bg-brand}\` ==> P@4@가 들어온다.
    - P@1@ -> \`7/msec\`
    - P@2@ -> \`2/msec{:.bg-danger}\`
    - P@3@ -> \`9/msec\`
    - P@4@ -> \`5/msec\`
5. \`5/msec{:.bg-brand}\` ==> 이제 들어오는 프로세스가 없으므로 처리중이던 P@2@가 여전히 급하기 때문에 나머지 2/msec을 돈다.
    - P@1@ -> \`7/msec\`
    - P@2@ -> \`끝 (:))\`
    - P@3@ -> \`9/msec\`
    - P@4@ -> \`5/msec{:.bg-danger}\` 제일 급한 P@4@가 점유한다.
6. \`10/msec{:.bg-brand}\` ==> P@4@가 5/msec동안 돈다.
    - P@1@ -> \`7/msec{:.bg-danger}\` P@1@가 점유한다.
    - P@2@ -> \`끝 (:))\`
    - P@3@ -> \`9/msec\`
    - P@4@ -> \`끝 (:))\`
7. \`17/msec{:.bg-brand}\` ==> P@4@가 5/msec동안 돈다.
    - P@1@ -> \`끝 (:))\`
    - P@2@ -> \`끝 (:))\`
    - P@3@ -> \`9/msec{:.bg-danger}\` P@3@가 점유한다.
    - P@4@ -> \`끝 (:))\`
8. \`26/msec{:.bg-brand}\` ==> 작업이 모두 끝난다.

- AWT = (9@P1@ + 0@P2@ + 15@P3@ + 2@P4@) / 4 === \`6.5/msec\`

### Priority Scheduling

> 우선순위가 높은 일을 먼저 서비스한다.

${tables[9]} <sup class="table"></sup>

우선순위 수가 작은 것이 우선순위가 높은 것이다. 간트차트로 다시 흐름을 그려보면 아래와 같다.

${tables[10]} <sup class="table"></sup>

- AWT = (6 + 0 + 16 + 18 + 1) / 5 === \`8.2/msec\`

#### Priority

> 우선순위를 정하는데는 내부적인 요소와 외부적인 요소로 정할 수 있다.

- Internal (내부적 요소)
    - Time limit ==> Time limit가 짧은 프로세스를 먼저.
    - Memoty Requirement ==> 메모리를 적게 차지하는 프로세스 먼저.
    - I/O to CPU Burst ==> I/O 혹은 CPU를 많이 차지하는 프로세스가 있을 때 CPU 입장에서 Burst가 짧은 프로세스인 I/O가 길고 CPU Burst가 짧은 프로세스를 먼저 실행.
- External (외부적 요소)
    - Amount of funds being paid ==> 돈 많이 내는 사람 먼저.
    - Political factors ==> 정치적 요소로 급한 것 먼저.

#### Preemptive or Nonpreemptive

SJF와 마찬가지로 선점, 비선점 방식으로 구성할 수 있다.

#### Problems

- Indefinite blocking ==> starvation (기아)
    - 예를 들어 프로세스 A, B, C가 있을 때 B의 우선순위가 가장 낮다면 새로 들어오는 프로세스의 우선순위가 높을 때 B가 계속해서 대기열에 남아 CPU시간을 차지하지 못하고 실행되지 않는 것을 말한다.
- Solution ==> againg (나이 듦)
    - starvation을 해결하기 위해 위와 같은 상황에 놓여있다면 OS가 주기적으로 Ready Queue를 감시하면서 오랫동안 실행되지 않고 있다면 시간이 지날수록 우선순위를 점진적으로 올려주는 것을 말한다.

### Round-Robin (RR)

> 빙빙 돌면서 순서대로 서비스한다.

#### Time-sharing System (시분할/시공유 시스템)

${tables[11]} <sup class="table"></sup>

Time Quantum(시간 양자) === Time Slice(10 ~ 100/msec) 이고, 시간양자의 단위로는 ⊿(delta)를 사용한다.

#### Preemptive Scheduling

\`RR\`은 선점 스케쥴링이다. P@1@이 끝나지 않아도 일정 시간이 지나면 다음 프로세스를 넘어가기 때문이다.

#### 예제

${tables[12]} <sup class="table"></sup>

그리고 시간 양자를 나타내는 값이 4⊿(delta)일 때 아래와 같은 흐름으로 그려지게 된다.

${tables[13]} <sup class="table"></sup>

- AWT = (6@P1@ + 4@P2@ + 7@P3@) / 3 === \`5.66/msec\`

\`RR\`은 시간 양자의 값이 얼마여야 가장 성능이 좋을 것인지를 중점으로 Time Quantum에 의존적인 방법이다.

#### 델타가 무한대라면?

델타가 무한대이기 때문에 P@1@이 들어오면 P@1@의 작업이 끝날 때까지 진행하고 P@2@가 들어오면 P@2@가 끝날 때까지 진행한다. 이는 \`FCFS\`와 똑같아진다.

### 델타가 0이라면?

Processor sharing (Context switching overhead)이 발생한다. 이 말은 Context switching이 너무 자주 일어나기 때문에 거의 동시에 돌고 있는 것처럼 느껴지는 것을 말한다.

#### Average Turnaround Time (ATT)

이번에는 평균 반환시간을 구해보자.

${tables[14]} <sup class="table"></sup>

##### 델타가 1일 때

\`P@1@\` -> 1/msec ->\`P@2@\` -> 1/msec ->\`P@3@\` -> 1/msec ->\`P@4@\` -> 1/msec ->\`P@1@\` -> 1/msec ->\`P@2@\` -> 1/msec ->\`P@4@\` -> 1/msec ->\`P@1@\` -> 1/msec ->\`P@2@\` -> 1/msec ->\`P@4@\` -> 1/msec ->\`P@1@\` -> 1/msec ->\`P@4@\` ...

- ATT = (15@P1@ + 9@P2@ + 3@P3@ + 17@P4@) / 4 === \`11.0/msec\`

##### 델타가 5일 때

\`P@1@\` -> 5/msec ->\`P@2@\` -> 3/msec ->\`P@3@\` -> 1/msec ->\`P@4@\` -> 5/msec ->\`P@1@\` -> 1/msec ->\`P@4@\` -> 2/msec ->\`끝\`

- ATT = (15@P1@ + 8@P2@ + 9@P3@ + 17@P4@) / 4 === \`12.25/msec\`

### Multilevel Queue (다단계 큐)

> Ready Queue를 여러 개의 Queue로 분리해서 Queue사이에도 우선순위를 부여하는 스케쥴링 알고리즘이다.

### Multilevel Feedback Queue

> ... 작성 중
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