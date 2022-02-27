export default {
    published: true,
    title: 'CPU Scheduling Algorithm 01',
    modified: '2022-02-27 21:24:58',
    done: true,
    tags: ['os', 'scheduling'],
    categories: ['cs','Operating System'],
    authors: ['kimson'],
    wrote: '2022-02-26 17:41:36',
    toc: true,
    md: true,
    content: [`
# CPU Scheduling

Ready Queue 혹은 메인 메모리에 프로세스가 줄을 서 있을 때, 현재 실행하고 있는 프로세스가 끝나고 그 다음 어떤 프로세스를 선택해서 서비스를 받게 해 줄 것인가를 결정하는 것.

## Pre-emptive(선점) {:.text-danger}

CPU가 어떠한 프로세스를 실행하고 있을 때, 아직 프로세스가 일이 끝나지도 않았고, \`I/O\`를 만난 것도 아닌데 강제로 내보내고 새로운 프로세스를 실행하게 하는 것. 병원으로 예를 들 때, 환자(프로세스)를 진료보다가 응급환자(Ready Queue 중 급한 하나의 프로세스)를 먼저 보는 것과 유사하다. 즉, 현재 CPU 점유 중인 프로세스가 쫓겨나는 것을 허용하는 스케쥴링 인 것이다.

## Non-pre-emptive (비선점) {:.text-danger}

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