export default {
    published: true,
    modified: '2022-02-08 22:03:17',
    done: false,
    title: '운영체제 서론',
    tags: ['os'],
    categories: ['cs','Operating System'],
    authors: ['kimson'],
    wrote: '2022-02-08 22:03:13',
    toc: true,
    md: true,
    content: [
`
### 운영체제 (Operating System)

> 운영체제란 시스템 하드웨어를 관리, 응용 소프트웨어를 실행하기 위해 하드웨어 추상화 플랫폼과 공통 시스템 서비스를 제공하는 시스템 소프트웨어이다.

###### 운영체제의 필요성

프로세스가 메인 메모리의 명령을 가져와 실행하고, 그 다음 명령을 가져와 실행 반복하는데 이를 가능하도록 메모리에 실행 파일을 올려주는 역할을 운영체제가 한다.

운영체제가 없다면 메모리에 혼재되어 있는 \`Instruction\`들을 프로세스가 읽더라도 제멋대로의 명령이 실행되어 컴퓨터를 사용하지 못하게 된다.

> *파일의 실행조건* -> 메모리에 올려져야 실행 가능한 상태가 된다.  
> *하드디스크 내부* -> 실행 파일이 들어있다. (OS도 포함)  
> *프로그램* -> 메인 메모리에 어떠한 명령(Instruction)들이 기록되어야 하는데 이 명령들의 모음  
> *프로그램 내장형 컴퓨터* -> 미리 프로그램을 메모리에 내장해두고 실행하는 구조의 컴퓨터

###### 운영체제의 목적

1. 성능(Performance)을 높인다.{:.bg-info.bg-opacity-50}
2. 편의성(Convenience)을 제공한다.
3. 컴퓨터를 관리해주는 프로그램이다. (Control program for computer)

### 컴퓨터의 구조

<figure class="w-inline-flex flex-column">
    <img src="./src/images/os/os03.png" alt="structure of computer" title="structure of computer">
    <figcaption class="bg-light p-2 text-muted"><span class="tag tag-light">ref</span> GeeksforGeeks</figcaption>
</figure>

###### 컴퓨터 동작 과정

1. 전원 on
    - ROM을 읽어 실행
    - POST(Power on self test) 진행
        - CPU가 컴퓨터의 메인 메로리가 얼마나 있고 하드디스크 용량이 얼마이고, 하드웨어가 잘 연결되어 있는지 부팅 시 테스트 하는 것
    - Boot Load 진행 (과정을 부팅이라고 한다.)
        1. 하드디스크의 OS를 조회
        2. 메인 메모리에 올림
            - 이때부터 OS는 메모리에 상주하게 된다.
            - 전원이 꺼지기 전까지 Resident
    - 위의 과정 종료 후 ROM의 역할이 끝나고 더 이상 ROM을 읽지 않음
2. 화면이 출력 (흔한 들판 배경 이미지에 폴더, 파일들 주르륵...)

###### Main Memory

th: 구분|내용|비고@
슈: !RAM|전원이 꺼지면 사라지는 휘발성 메모리|수 백MB ~ 수GB\\
    !ROM  (Read only memory)|전원과 관계 없이 내용이 유지(메인 메모리에서 극히 일부 차지)|수 십KB ~ 수 백KB@
:end

### 커널(Kernel)과 쉘(Shell)

<figure class="w-inline-flex flex-column">
    <img src="./src/images/os/os01.png" alt="kernel&shell" title="kernel shell">
    <figcaption class="bg-light p-2 text-muted"><span class="tag tag-light">ref</span> google</figcaption>
</figure>

> 어플리케이션 영역으로 갈수록 사용자와 근접하고, 커널로 갈수록 하드웨어와 밀접한 관계를 가진다. *OS*는 *커널*과 *쉘*로 구성이 되어 있고, *커널이 핵심*이 되어 하드를 관리하고, *쉘*은 *사용자의 명령을 해석*하는 개념이다.

1. \`H/W(하드웨어)\` 하드디스크
2. \`OS(운영체제)\` 하드디스크를 관리, 제어한다.
    - \`kernel\` 실제로 관리를 하는 프로그램 (CPU, Memory, Disk ...)
    - \`Shell\` 윈도우는 UI로, Linux는 텍스트로 명령을 내린다.
        - 사용자 명령을 해석하고 출력해준다.
        - 다른 말로 Command Interpreter
3. \`H/W(하드웨어)\`

\`\`\`javascript
function test() {
    return 123;
}
\`\`\`

###### OS의 자원관리

운영체제에는 여러 자원 관리자, 자원 할당자가 존재한다.

- Process Management
- Memory Managementm I/O Management
- File Management
- Network Management ... 등등
`,
    ],
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