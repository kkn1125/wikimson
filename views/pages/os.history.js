export default {
    published: true,
    title: '운영체제 역사',
    modified: '2022-02-11 22:42:00',
    done: true,
    tags: ['os', 'history'],
    categories: ['cs','Operating System'],
    authors: ['kimson'],
    wrote: '2022-02-07 19:00:29',
    toc: true,
    md: true,
    content: [
`
# 운영체제 역사

컴퓨터의 역사는 1940년대 부터 시작하게 된다. 이전에 1893년 홀러리스에 의해 천공 카드 시스템이 개발되어 대규모 데이터의 취급이 가능해졌다. 천공 카드는 다양한 자료를 동시에 취급, 관리할 수 있게 해주었다.

### No Operating System \`(1940 ~)\`

<figure class="text-center">
    <img src="./src/images/os/fortran_card.jpg" alt="sample">
    <figcaption class="bg-light p-2 text-muted"><span class="tag tag-light">ref</span> 나무위키 - 천공카드</figcaption>
</figure>

###### 천공카드

*천공카드*{:.text-danger}는 요즘의 OMR카드의 시초가 된 것으로 입력장치이자 기억장치이다. 20세기 초반까지 컴퓨터 기억장치로 활용이 되었다. 하지만 한장만으로 보관할 수 있는 데이터 양이 너무 적어 몇십장에서 복잡한 연산의 경우 몇백장을 소비해야하는 비효율적인 기억장치이다.

2진법 데이터를 기록한 카드이고, 당시 사용된 대표적인 컴퓨터 언어가 코볼과 포트란이며 언어 자체적으로 80칼럼에 맞추어 코딩하도록 되어 있다.

이때 프로그래머들은 손 코딩으로 종이에 작성하고, 천공카드에 구멍을 뚫는 식이었고, 이후 천공카드에 구멍을 찍어주는 여사원을 따로 고용하기도 했다. 보통 \`펀순이\`라는 은어로 불렸다고 한다.

여담이지만 당시 손 코딩 시 작업자 끼리의 편의성을 위해 L은 대문자, i는 소문자로 적는 규칙이 있었다고 한다. 수기로 적으면 저마다 i와 l이 헷갈리기 때문 인 듯 하다.

하지만 이 천공카드가 현대 시점에서 비효율적이지만 이전과 비교하면 수기로 작성한 서류를 일일히 관리하기 보다는 효율적인 것이다. 그래서 시작은 미국 정부의 국가통계작성과 인구조사 자료처리를 위해 발명되었다고 한다.

- Card reader -> Memory -> Processing -> Line printer

카드리더기에 천공카드를 넣고 메모리에 올린다. 마지막으로 컴파일러를 올려 메모리에 있는 프로그램들을 해석하고 프린터를 하는 방식이다.

이러한 방식이 도저히 사람이 해서는 너무 일이 많아 다름의 시스템이 출현하게 된다.

### Batch Processing System (일괄처리){:.text-danger}

> \`Batch\`는 꾸러미라는 뜻이고 묶어서 처리(Process)한다는 의미를 가진다. 최초의 운영체제(OS)이며, 이는 기존에 Operator(컴퓨터 관리자)가 카드리더기에 카드를 넣고 프린터까지 하는 과정을 대폭 줄여주게 된다.

아래 체크 된 것이 Batch Processing 되는 요소들의 예 입니다.

- Card reader [x]
- Memory [x]
- Processing [x]
- Line printer []

이러한 반복되는 일련의 작업들을 Operator가 아닌 컴퓨터가 스스로 처리 가능하도록 메모리에 프로그램을 넣어주게 고안 된다.

###### Resident Monitor

메모리에 상주해서 소스코드 -> 컴파일 -> 링크(라이브러리 등등) -> 로드(적재) 등의 꾸러미 일들을 처리한다.

### 하드디스크의 등장 \`(1956 ~)\`

<figure class="text-center">
    <img src="./src/images/os/ramac.jpg" alt="sample">
    <figcaption class="bg-light p-2 text-muted"><span class="tag tag-light">ref</span> 나무위키 - HDD</figcaption>
</figure>

최초의 하드디스크는 1956년 IBM에서 개발된 라막(RAMAC)이다. 크기가 약 60CM에 저장 용량이 그 당시에 무려 약 5MB이다. 당시 천공카드와 자기 코어 메모리가 전부였던 시절을 생각하면 압도적인 용량이다. (여담으로 무게가 무려 1톤이었다고...😲)

초기에는 메모리가 적어 파일 하나만 올라가는데 그쳤다. 하드디스크가 등장하고 메모리가 커지면서 보다 많은 파일을 올릴 수 있었다.

###### 당시 컴퓨터 동작

메모리에 OS(Batch Processing System)가 있고, 유저 프로그램 혹은 컴파일러, 링크, 게임 등 하나만 올라갔다.

*문제점*

1. 컴퓨터 사용 때 CPU(연산) 사용
2. 입/출력(I/O) 장치 사용
3. CPU(연산) 사용
4. ... 교대로 반복

이러한 과정을 볼 때 입/출력 장치를 사용할 시 CPU는 Idle(논다)한다. 입/출력은 속도가 느리고 반면 CPU는 빠르다. 입/출력 사용 시 많은 시간을 CPU가 대기하기 때문에 CPU의 활용도가 떨어진다.

당시 컴퓨터는 비싼 자원이었다. 비싸게 주고 산 컴퓨터가 CPU의 효율이 좋지 않으면 그만큼 가성비가 떨어진다.

### Multiprogramming System (다중 프로그래밍){:.text-danger} \`(1960 ~)\`

CPU가 노는 것을 방지하고 효율을 높이는 OS가 출현한다. 메모리가 커지면서 가능해진 다중 프로그래밍은 이전과 달리 유저 프로그램 하나가 아닌 여러 개의 유저 프로그램을 메모리에 올릴 수 있게 됐는데, 이때 \`User 1\`에서 \`CPU\`가 작업하다가 \`I/O\`를 실행하는 사이에 \`CPU\`는 놀지 않고 \`User 2\`로 넘어가 \`CPU\`가 작업하게 된다.

<figure class="text-center">
    <img src="./src/images/os/history-multiprogramming.png" alt="sample">
    <figcaption class="bg-light p-2 text-muted"><span class="tag tag-light">ref</span> kimson</figcaption>
</figure>

대강 아래와 같은 과정이 그려진다.

1. User 1(Program === Job) => CPU => I/O => Ready => Ready
2. User 2(Program === Job) => Ready => CPU => I/O => Ready
3. User 3(Program === Job) => Ready => Ready => CPU => I/O

즉, I/O가 실행 중이어도 CPU를 쉬지 않고 효율적으로 돌릴 수 있고, 여러 개의 프로그램(일)이 가능해졌다.

###### CPU Scheduling

다중 프로그래밍 출현으로 단순히 여러 개의 작업이 가능한 것에 그치는게 아니라 생각해야 할 것이 더 많아졌다.

대표적으로 CPU의 작업 우선순위를 정하는 것이다. 어떠한 순서로 작업을 진행해야 성능이 더 좋은지 결정하는 것을 CPU \`Scheduling\`이라 한다.

###### 메모리 보호

여러 개의 프로그램이 돌기 때문에 다른 프로그램으로 침범이 되지 않도록 고려해야한다. 메모리의 사용을 제어하는 방법이고, 모든 운영 체제에서 중요한 쟁점사항 중 하나이다.

즉, 실행 중인 프로세스가 자신에게 할당되지 않은 영역의 메모리에 접근하는 것을 막는 다는 것이 메모리 보호의 핵심이자 목적이다.

### Time Sharing System (시공유 시스템){:.text-danger} \`(1970 ~)\`

현대는 당연하게 키보드가 있지만 옛날에는 없었다. 시간이 지나고 기술이 발달하면서 모니터가 생기고 키보드가 생기면서 이제는 컴퓨터와 상호작용(Interactive)할 수 있게 된다. 이를 *상호 대화형 컴퓨터*라고 한다.

당시에 컴퓨터를 사용하는 구조는 아래와 같다.

<figure class="text-center">
    <img src="./src/images/os/os02.png" alt="sample">
    <figcaption class="bg-light p-2 text-muted"><span class="tag tag-light">ref</span> google</figcaption>
</figure>

당시 비싼 자원이었던 컴퓨터는 한 대에 여러 단말기(Terminal)을 달아 사용하는 방식이었다. 여러 명이 사용하는데 있어 \`Multiprogramming\` 방식에 문제가 생기기 시작했다.

예를들어 \`User 1\`이 돌 때 나머지 \`User 2\`와 \`User 3\`는 일하지 못하고 대기한다. \`CPU\`가 하나이기 때문에 하나의 프로그램이 끝날 때까지 아무것도 하지 못 하는 것이다.

시간 축이 있다고 가정할 때 100 ~ 1,000초 단위로 나누어 1/100초 동안 \`User 1\`의 작업을 다음 1/100초 동안 \`User 2\`의 작업을 진행하는 식으로 스위칭을 하는 방법이다.

만일 3개의 프로그램이 돌 때 1/100초로 스위칭하면 각자 할당되는 시간은 33.333초로 균일하게 할당되고, 매우 빠른 속도로 스위칭 되기 때문에 사람이 느끼기에는 컴퓨터가 동시에 작업이 되는 것처럼 보이게 된다. 이를 *동기화*라고 한다.

이 방법을 \`시공유 시스템(TSS)\`이라고 하며, 이때부터 컴퓨터에 명령을 내리고 응답을 받는 대화형 시스템이 가능해지고, 한 사용자가 다른 사용자에게 어떠한 데이터를 보낼 수 있게 되는, *프로세스간 통신*이 가능하게 된다.

###### 가상 메모리 (Virtual Memory)

하드디스크가 보편화되면서 사용자가 많아지다 보면 메인메모리가 부족해지는데, 원래의 메인 메모리는 크지 않지만 CPU가 봤을 때 메인 메모리가 커 보이는, 하드디스크의 일부를 마치 메인 메모리처럼 쓰는 기술인 *가상메모리*가 고안 된다.

###### Unix (Linux)

1960년대 \`Unix\`가 등장하고 1970년대에 보급되기 시작하였다. \`Unix\`가 *대표적인 TSS*이며, Unix가 현재의 Linux => TSS에 기반 (window 포함)

- 여담으로 MD DOS는 OS가 하나 User 프로그램이 하나 있는 모델이었다. MS-DOS가 지나고 현재의 Window 등은 TSS 계열이다.

### OS 기술의 변천사

###### 컴퓨터 규모별 분류

- Super Computer -> Mainframe -> Mini -> Micro
- Super Computer ->  Server -> Workstation -> PC -> Handheld -> Embedded

여기서 \`Mainframe\`은 <a href="#operating-system-history" scroll-to="img-1" class="ref">TTS이미지</a>의 CPU처럼 중앙에 위치하고 많은 단말기(Mini)가 달려있는 것을 상상하면 된다.

대형 컴퓨터를 위해 기술의 발전이 거듭되었고 점점 대형의 컴퓨터가 가졌던 OS, TSS등의 기술이 점차 작은 단위의 기기도 가지게 되면서 대형 기종을 위한 기술이 작은 단위 기종까지 적용범위가 확대 되게 된다.
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

// th: 핵심|설명@
// tb: !Model|데이터를 가지고 로직을 처리한다. 데이터베이스와 대응 될 수 있다\\
// !View|요청된 페이지를 데이터 처리의 과정을 거쳐 브라우저에 나타낼 요소들을 출력해주는 역할을 한다.\\
// !Controller|사용자의 요청을 받아 요청에 맞는 Model의 로직을 실행하고 데이터의 흐름을 제어한다.@
// :end