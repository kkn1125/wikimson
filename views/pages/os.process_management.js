export default {
    published: true,
    title: '프로세스 관리',
    modified: '2022-02-25 16:50:51',
    done: false,
    tags: ['os'],
    categories: ['cs','Operating System'],
    authors: ['kimson'],
    wrote: '2022-02-14 18:00:34',
    toc: true,
    md: true,
    content: [`
### 프로세스 관리

${wikiFilter.toRef('cs-processthread', '정의-1', '프로세스')}의 관리 주체는 OS가 되는데, 프로세스와 프로그램의 차이를 명확히 알아야 무엇을 관리하는지 분명히 알 수 있다.

프로그램과 프로세스의 차이는 이전 포스팅인 운영체제 서비스의 ${wikiFilter.toRef('operating-system-service', 'Process Management-2', 'Process Management')}에서 다루었다.

조금 더 자세히 프로그램과 프로세스의 상태를 보자면, 아래의 그림과 같다.

${wikiFilter.img('os/os-m01.jpg','kimson','sample')}

이렇게 하나의 프로그램이 메인 메모리에 올라와 실행 될 때는 여러 값들이 바뀌면서 활동한다.

- text
- data
- stack
- pc(Program Counter)
- sp
- registers 등등

###### 프로그램

프로그램은 하드디스크 안에 존재하는 실행 가능한 정적인 것을 말한다.

###### 프로세스

프로세스는 하드디스크에 있던 것이 메인 메모리에 올라와 실행 상태에 있는 것을 말한다. 이때 프로그램은 실행이 되기 때문에 활동적인 상태에 놓인다. 프로그램과 차이를 볼 때 실행되기 전의 *정적*인 것이냐, 실행 상태에 놓인 *동적*인 것이냐의 차이를 보인다. 이 상태를 프로세스 상태에서 보면 \`new\`단계이다.

- 프로세스는 다른 말로 *task*, 또는 *job* 등으로 부른다.

###### 프로세스 상태

${wikiFilter.img('os/os-m02.jpg','kimson','Multiprogramming System')}

위의 이미지는 \`Multiprogramming System\`의 이야기이다. 그에 따라 프로세스 상태 변화에 대한 설명은 아래와 같다.

1. \`new\` -> 프로그램이 메인 메모리에 올라와 실행 상태에 있는 것.
2. \`ready\` -> 모든 초기화를 끝내고, 실행할 준비를 모두 끝낸 상태.
3. \`running\` -> CPU에 의해 실행 상태가 되는 것, CPU가 실제로 실행하는 프로세스를 running상태에 있다고 말한다.
4. \`waiting\` -> CPU가 실행 되다가 *I/O* 작업을 한다면 다음의 프로세스가 아닌 그 다음의 프로세스로 넘어가서 실행하게 되는데, 이때 건너뛴 작업은 대기 상태가 된다. 이를 waiting이라 한다.
    - \`waiting\` 상태가 끝나면 다시 ready상태로 돌아가 실행 할 준비를 한다.
5. \`terminated\` -> 프로세스가 끝나고 종료된 상태
6. \`time expired{:.bg-danger}\` -> 해당 프로세스에 주어진 시간이 일정 시간이 되면 바로 \`ready\`로 상태가 변경되면서 다른 프로세스가 \`running\`가 되는 것

항목 중 *time expired*가 있는데, 이는 \`Timesharing System\`의 프로세스 상태이다. 조금 다른 방식으로 상태가 변화하는데 아래의 이미지를 보면 *일정 시간 간격*으로 *Running의 상태가 wating을 거치지않고* 바로 *Ready상태*로 가는데 일정 시간 간격으로 강제 스위칭을 하기 때문이다.

${wikiFilter.img('os/os-m03.jpg','kimson','Timesharing System')}

### PCB (Process Control Block){:.text-danger}

> *TCB (Task Control Block)*라고도 한다. 프로세스에 대한 모든 정보를 가지고 있고 프로세스 상태, PC, Registers, MMU info, CPU time, Process id(PID), list of open files 등의 정보를 가진다. PCB는 프로세스 관리 영역인 \`Process management\`에 들어있다.

\`PCB\`는 *프로세스 하나 당 하나 씩* 생성된다. \`PCB\`에는 프로세스에 대한 모든 정보를 가지고 있다. 이 정보들이 필요한 이유는 프로세스가 \`running\` 중에 있다가 \`time expired\` 되던지, \`I/O\`를 만나던지 할 때 상태변화를 진행한다.

다시 \`running\`상태로 올 때 이전 상태에서의 \`PC\`값이 얼마이고, \`Register\` 값이 얼마인지, 그 정보들을 기록 해둬야 당시의 상태로 돌아올 수 있기 때문이다. 그래서 *상태가 변하기 전의 상태로 복구하기 위해* 이러한 정보들을 \`PCB\`라는 자료구조에 넣어둔다.

###### PCB가 가지는 정보는?

- \`Process state{:.bg-danger}\` ==> \`running\` \`ready\` \`waiting\` 등등 ...
- \`PC(Program counter){:.bg-danger}\` ==> 이 다음에 몇 번지을 실행 할 것인가 (번지 정보)
- Register
- \`${wikiFilter.toRef('operating-system-dual-mode', 'Memory Management Unit (MMU)-13', 'MMU')}info\` ==> 해당 프로세스가 돌 때 base, limit 값을 저장하고, 다음 프로세스가 돌 때 base, limit 값을 변경해 저장해주는 작업
- \`CPU time\` ==> 현재 프로세스가 시간을 얼마나 사용했는가
- process id(PID) ==> 프로세스 아이디 (?== 주민등록번호)
- list of open files ==> 프로세스에 대해 열려 있는 모든 파일을 나열 (?== \`cmd\`에서 netstat -ano 한 것과 유사한 것 같다.)

### Queues

모든 프로그램은 하드디스크에 들어있다. *하드디스크*는 *용량이 큰* 반면 *메인 메모리*는 *용량이 적다*. 하드디스크의 프로그램이 하나 만 올라가는 것이 아닌 *여러 개*가 올라가기 때문에 메인 메모리에 올라가기 위해 프로그램들은 중간에 *줄을 서서 기다리게* 된다.

###### Job Queue

하드디스크 안에는 수 많은 \`Job(일)\`들이 있는데, *하드디스크에서* \`Job\` 들이 *메인 메모리로* 올라가려면 줄을 서서 기다려야한다. 이를 *Job Queue*라 한다.

메인 메모리로 올라왔다고 해서 바로 서비스를 받는 것은 아니다. \`CPU\`는 하나고 \`Job\`은 여러 개이기 때문에 상태변화하면서 차례를 기다려야한다. \`CPU\` 서비스를 받고나면 다시 \`Ready\`가 되고 \`Running\`이 되는 상태를 반복한다.

###### Job Scheduler

메인 메모리로 올라가기 위해 줄 서있는 프로그램 중 어떤 프로그램을 먼저 올릴 지 처리하는 것인데, FIFO(First in First out)의 방법이 있고, 나머지 다양한 방법들이 존재한다. 이러한 방법을 결정하는 것이 *Job Scheduling*이다.

이때 어떤 프로그램을 먼저 올려 줄 것인가 결정하는 프로그램이 있는데, 이를 *Job Scheduler program*이라 한다. 이 프로그램은 \`Process management\`안에 들어 있다.

###### Long-term Scheduler

Job Scheduling은 자주 일어나지 않는다. 이미 메인 메모리에 프로세스가 가득 차 있다면 Scheduling할 필요가 없기 때문에 가득 차 있을 때는 작동하지 않다가, 프로세스가 종료되고 메모리에 빈 공간이 생기면 이 다음에 올릴 프로그램은 무엇인지 작동하게 된다. \`Job Scheduler\`를 *Long-term Scheduler*라 한다.

###### Ready Queue

만일 \`I/O\`를 사용한다고 가정할 때 이미 다른 프로세스가 \`I/O\`를 사용하고 있다면 이 또한 줄을 서서 기다려야한다.

이렇게 *메인 메모리로 올라온 프로세스*가 *CPU 서비스를 받기 위해* 줄 서서 기다리는 것을 *Ready Queue*라 한다.

###### CPU Scheduler

4개의 프로세스가 메인 메모리에 올라와 있다고 가정할 때, CPU가 어떤 프로세스를 먼저 실행해 줄 것인가 결정하는 것을 *CPU Scheduler*라 한다.

###### Short-term Scheduler

\`CPU\`가 프로세스를 실행 할 때 \`I/O\`를 만나면 다음 프로세스로 넘어가고, 그 프로세스가 \`I/O\`를 만나면 또 다음 프로세스로 넘어간다. 혹은 순서대로가 아닌 경우에도 마찬가지로 스위칭이 빠르게 일어나야하기 때문에 \`CPU Scheduler\`를 *Short-term Scheduler*라 한다.

###### Divice Queue

하드디스크나 프린터와 같은 *Divice(장치)들을 사용하기 위해*서도 줄을 서게 되는데, 프린터에 대기열이 \`A그룹\`이라면 하드디스크 대기열을 \`B그룹\`이라 했을 때 이러한 것을 통틀어 *Divice Queue*라 한다.

그 중에 줄을 서지 않아도 되는 것이 있는데 그것은 \`terminated\` 이다.

###### Divice Scheduler

\`Divice(장치)\` 또한 마찬가지로 여러 프로세스가 \`Divice\`를 사용하기 위해 대기 상태에 있다고 가정할 때, 어떤 프로세스를 먼저 실행해 줄 것인가 결정하는 것이다. 부분적으로 볼 때 프린터에 대한 스케쥴러는 \`Printer Scheduler\`, 디스크에 대한 스케쥴러는 \`Disk Scheduler\`가 있다. 이들을 통틀어 *Divice Scheduler*라 한다.

### Multiprogramming

###### Degree of multiprogramming

멀티 프로그래밍의 *정도*를 말하는데, 메인 메모리에 *프로세스가 몇 개* 올라와져 있는가를 의미한다.

###### I/O-Bound process와 CPU-Bound process

- \`IO Bound\` -> 프로세스가 \`I/O\`관련 작업만 하는 것, 주로 입 출력을 많이 하는 프로세스.
    - 워드 프로그램 등 ...
- \`CPU Bound\` -> 프로세스가 \`CPU\`관련 작업만 하는 것, 주로 연산을 많이 하는 프로세스.
    - 슈퍼컴퓨터를 사용하는 애플리케이션들 ...

> I/O Bound process만 올라오면 CPU가 할 일이 없고, CPU Bound process만 올라오면 I/O가 할 일이 없어진다. 그 때문에 골고루 사용하기 위해 Job Scheduler가 \`CPU\`, \`I/O Bound\`를 적절히 섞어 \`I/O\`, \`CPU\` 어느 하나 놀지 않게 조정하는 일을 *Job Scheduler*가 한다.

###### Midium-term Scheduler {:.text-danger}

컴퓨터와 대화하듯이 사용하는 시스템을 Interactive System이라 하는데, 보통 대화형 시스템은 Time sharing System이며, 프로세스에게 시간을 균등하게 할당 해주는 역할을 한다.

하나의 서버 컴퓨터가 있고, 여러 사용자가 사용하고 있다 가정할 때, \`A\`, \`B\`, \`C\` 사용자가 있다면, 서버 컴퓨터 메모리에 OS와 \`A\`, \`B\`, \`C\`를 위한 메모리가 각각 할당 되어 있을 것이다.

\`B\`라는 사용자가 컴퓨터 사용을 잠시 멈췄을 때 메인 메모리에 있는 \`B\`를 위한 메모리는 아무 일을 하지 않는다. 이렇게 되면 CPU 입장에서는 성능 상으로 손해이다. 사용자 \`B\`가 없는 동안은 메인 메모리에 있을 필요가 없다.

OS가 쭉 감시하고 있다가 \`B\`가 메모리에 있지만 아무 활동일 없는 것을 감지하면 문제가 있는 것으로 보고 하드디스크에 \`B\`메모리를 쫓아낸다. 그러면 빈 공간에 다른 프로세스를 올리거나 돌고 있는 프로세스에 메모리를 더 할당해주거나 하게 된다. 이렇게 쫓아내는 것을 *Swap out*이라고 하는데, 하드디스크에 *Swap out* 목적으로 프로세스 이미지를 저장해두는데 사용하는 것 *Swap divice*라고 한다. \`Swap divice\`는 하드디스크의 일부에 있는데 이는 다른 말로 *Backing Store*라고도 한다.

이후 사용자 \`B\`가 다시 돌아와 작업을 재개하면 *Swap divice로 갔던 프로세스 이미지*가 *메인 메모리로* 와야하는데, 이를 *Swap in*이라 한다. 이들 모든 Swap 활동을 *Swapping이라 통칭*한다.

*Long-term보다는 자주* 일어나고, *Short-term보다는 더디게* 일어나는, 어떠한 프로세스를 *Swapping할 것인가*를 결정하는 것이 *Medium-term Scheduler*이다.

###### Context Switching (문맥 전환)

기사를 읽거나 하면 문맥이 바뀌는 등을 문맥 전환이라 하는데, 컴퓨터로 비유할 때 메인 메모리에 프로세스가 많이 있어도 CPU는 어느 한 순간에느 하나의 프로세스만 처리한다. 이때 특정 프로세스를 처리하고 다음 프로세스를 넘어가는 것을 *Context Switching*이라 한다.

- \`scheduler\` -> 프로세스가 ready queue에서 어떤 순서로 CPU를 사용하게 하는지, job queue에서 어떤 프로그램을 먼저 메인 메모리에 올리는지 등의 일을 한다.
- \`dispatcher\` -> 새로운 컨텍스트를 저장하고, 이전의 컨텍스트 정보를 불러와 복원(restore)하는 일을 한다.
- \`context switching overhead\` -> 스위칭 할 때마다 현재상태를 저장하고, 새로운 상태를 가져오는 등의 많은 부담을 말한다. 스위칭을 자주 할수록 손해이기 때문에 효율이 높은 프로그램(low level)으로 만들게 된다.
`],
    ref: [],
    template(){
        this.title = this.origin.name;
        return `
        ${wikiFilter.all.call(this)}
        `
    }
}