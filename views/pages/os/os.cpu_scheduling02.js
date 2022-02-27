import {tables} from '../../../store/tables/tables.js'

export default {
    published: true,
    title: 'CPU Scheduling Algorithm 02',
    modified: '2022-02-27 21:25:01',
    done: true,
    tags: ['os', 'fcfs', 'sjf'],
    categories: ['cs','Operating System'],
    authors: ['kimson'],
    wrote: '2022-02-26 17:41:36',
    toc: true,
    md: true,
    content: [`
# CPU Scheduling Algorithm

## First-Come, First-Served (FCFS) {:.text-danger}

> 먼저 온 일을 먼저 서비스한다.

자료구조에서 배우는 FIFO와 의미가 유사하다. Queue에서 적용되는 형태로 먼저 들어오면 먼저 나가는, 먼저 들어온 프로세스를 먼저 서비스해주는 것이다.

병원이나 은행 등에 이러한 형태로 많이 서비스를 한다.

- 방법이 간단하다.
- 공평하다.
- 꼭 좋지만은 않다.

### Find Average Waiting Time

${tables[0]} <sup class="table"></sup>

P@1@와 P@2@, P@3@이 있다고 가정할 때 각각 \`Busrt Time{:title="해당 프로세스가 CPU를 얼마나 사용할 것인가"}\`이 24, 3, 3이라면, 평균 대기 시간 (AWT)는 무엇인가?

24 + 3 + 3이라고 생각 할 수도 있지만 이것은 Burst Time이고, 대기 시간을 보면 다른 식을 세워야한다는 것을 알 수 있다.

${tables[1]} <sup class="table"></sup>

P@1@은 대기시간이 \`0\`이다. P@2@는 대기시간이 P@1@이 끝난 \`24\`이고, P@3@의 대기시간은 P@2@가 끝나는 \`27(24 + 3)\`이다. 각 대기시간의 합을 프로세스의 개수 \`3\`으로 나누어주면 \`AWT\`는 *17/msec*이 된다. 즉, 식으로 보면 아래와 같다.

- AWT = (0@P1@ + 24@P2@ + 27@P3@) / 3 === \`17/msec\`

#### 만일 반대로 순서를 세웠으면 어떻게 될까?

[표 2]를 다시 바꾸어 보면 아래와 같을 것이다.

${tables[2]} <sup class="table"></sup>

P@3@가 먼저 시작하고 그 다음이 P@2@가, 마지막으로 P@1@이 오게 된다. 이렇게 되면 AWT는 *3/msec*이 된다.

- AWT = (0@P1@ + 3@P2@ + 6@P3@) / 3 === \`3/msec\`

이렇게 봤을 때 순서대로 들어왔을지라도 그대로 처리하면 대기시간 면에서는 별로 좋지 않다는 것을 알 수 있다.

> \`Burst Time\` ==> 해당 프로세스가 CPU를 얼마나 사용할 것인가

### Convoy Effect (호위 효과)

왕을 예로들면 시중들이 따라다니는 모습을 떠올리면 된다. 프로세스를 예로 들면, CPU 시간을 많이 잡아먹는 프로세스가 앞에 있으면 뒤의 프로세스들이 기다려야하는 모습을 마치 뒤따라 다니는 모습이라 해서 호위효과라 부른다.

- \`FCFS\`에서 일어나는 단점 중 하나이다.
- Non-preemptive Scheduling이다.

## Shortest-Job-First (SJF) {:.text-danger}

> 짧은 일을 먼저 서비스한다.

은행 등에서 짧게 끝나는 프로세스를 앞세워야 전체적인 시간을 줄일 수 있다는 이야기이다. 예를 들어 표를 그려보자.

${tables[3]} <sup class="table"></sup>

이렇게 P@1@부터 P@4@까지의 프로세스가 있고, 각각 Burst Time이 주어질 때 AWT를 구해보자.

${tables[4]} <sup class="table"></sup>

- AWT = (0@P1@ + 3@P2@ + 9@P3@ + 16@P4@) / 4 === \`7/msec\`

### 그렇다면 FCFS 측면에서 계산해보면 어떻게 될까?

${tables[5]} <sup class="table"></sup>

- AWT = (0@P1@ + 6@P2@ + 14@P3@ + 21@P4@) / 4 === \`10.25/msec\` (FCFS)

[표 5]가 더 좋은 결과를 가져온다.

- \`Provably optimal\` (증명 최적) ==> SJF는 대기시간을 줄이는 측면에서 가장 좋은 방법이다.
- \`Not Realistic{:.bg-danger}\` ==> 돌려봐야 CPU 활용시간(Burst Time)을 알 수 있는데 이것은 비현실적이다.
- \`Prediction may be needed\` ==> 하지만 CPU가 활용되는 시간을 예측해 볼 수는 있다. n번째는 CPU를 얼마나 사용했는가, m번째는 CPU를 얼마나 사용했는가를 OS가 조사를 해서 다음 번에는 CPU가 얼마만큼의 CPU를 사용하겠다를 예측하는 것이다. 그만큼 과거의 기록을 많이 가지고 있어야 하기 때문에 overhead가 많은 것이다.

### Preemptive or Nonpreemptive

#### Nonpreemptive의 예제

${tables[6]} <sup class="table"></sup>

위의 표는 도착 시간이 함께 표시되어 있다. 도착시간 0에 P@1@만 있으므로 P@1@을 먼저 앞에 둔다. Nonpreemptive이기 때문에 나머지 프로세스는 Ready Queue에 대기하게 된다.

${tables[7]} <sup class="table"></sup>

AWT를 계산하면 위의 표와 같이 나온 \`WT\`를 합산해서 나눈다. P@1@은 0에 도착해서 대기시간이 없이 CPU를 활용했다. P@2@는 1에 도착해서 P@1@이 끝나는 8msec까지 기다렸다. 그러면 7msec을 기다린 것이다. P@3@는 2msec에 도착해서 17msec을 기다렸으니 15msec이 된다.

- AWT = (0@P1@ + 7@P2@ + 15@P3@ + 9@P4@) / 4 === \`7.75/msec\`

#### Preemptive의 예제

> 이 방식은 실행 후 얼마나 짧은 시간이 남아있는가를 우선으로 해서 작업을 처리하는 방식이다. 이를 다른 말로 *Shortest-Remaining-Time-First (최소잔여시간 우선)*이라 한다.

[표 7]을 그대로 사용해보자.

Preemptive는 급한 프로세스를 먼저 처리하기 때문에 [표 6]과는 많이 다르게 도착 시간에 따라 계산된다.

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