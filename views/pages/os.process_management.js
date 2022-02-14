export default {
    published: true,
    title: '프로세스 관리',
    modified: '2022-02-14 20:54:45',
    done: false,
    tags: ['os'],
    categories: ['cs','Operating System'],
    authors: ['kimson'],
    wrote: '2022-02-14 18:00:34',
    toc: true,
    md: true,
    content: [`
### 프로세스 관리

<a href="#cs-processthread" scroll-to="정의-1" class="ref">프로세스</a> 의 관리 주체는 OS가 되는데, 프로세스와 프로그램의 차이를 명확히 알아야 무엇을 관리하는지 분명히 알 수 있다.

###### 프로그램

프로그램은 하드디스크 안에 존재하는 실행 가능한 정적인 것을 말한다.

###### 프로세스

프로세스는 하드디스크에 있던 것이 메인 메모리에 올라와 실행 상태에 있는 것을 말한다. 이때 프로그램은 실행이 되기 때문에 활동적인 상태에 놓인다. 프로그램과 차이를 볼 때 실행되기 전의 *정적*인 것이냐, 실행 상태에 놓인 *동적*인 것이냐의 차이를 보인다. 이 상태를 프로세스 상태에서 보면 \`new\`단계이다.

- 프로세스는 다른 말로 *task*, 또는 *job* 등으로 부른다.

###### 프로세스 상태

1. \`new\` -> 프로그램이 메인 메모리에 올라와 실행 상태에 있는 것.
2. \`ready\` -> 모든 초기화를 끝내고, 실행할 준비를 모두 끝낸 상태.
3. \`running\` -> CPU에 의해 실행 상태가 되는 것, CPU가 실제로 실행하는 프로세스를 running상태에 있다고 말한다.
4. \`waiting\` -> CPU가 실행 되다가 *I/O* 작업을 한다면 다음의 프로세스가 아닌 그 다음의 프로세스로 넘어가서 실행하게 되는데, 이때 건너뛴 작업은 대기 상태가 된다. 이를 waiting이라 한다.
    - \`waiting\` 상태가 끝나면 다시 ready상태로 돌아가 실행 할 준비를 한다.
5. \`terminated\` -> 프로세스가 끝나고 종료된 상태
6. \`time expired{:.bg-danger}\` -> 해당 프로세스에 주어진 시간이 일정 시간이 되면 바로 \`ready\`로 상태가 변경되면서 다른 프로세스가 \`running\`가 되는 것

### PCB (Process Control Block){:.text-danger}

> TCB (Task Control Block)라고도 한다. 프로세스에 대한 모든 정보를 가지고 있고 프로세스 상태, PC, Registers, MMU info, CPU time, Process id(PID), list of open files 등의 정보를 가진다.

... 작성 중
`],
    ref: [
        // {
        //     name: '',//'생활코딩 디자인 패턴',
        //     link: '',//'https://opentutorials.org/module/327/3828'
        // },
    ],
    template(){
        this.title = this.origin.name;
        return `
        ${wikiFilter.all.call(this)}
        `
    }
}