export default {
    published: true,
    modified: '2022-02-07 19:00:41',
    done: false,
    title: '운영체제 서론',
    tags: ['os'],
    categories: ['cs','Operating System'],
    authors: ['kimson'],
    wrote: '2022-02-04 22:37:44',
    toc: true,
    md: true,
    content: [
`
### 운영체제

> 운영체제란 시스템 하드웨어를 관리, 응용 소프트웨어를 실행하기 위해 하드웨어 추상화 플랫폼과 공통 시스템 서비스를 제공하는 시스템 소프트웨어이다.

입출력, 메모리 할당 등 하드웨어 기능의 경우 운영 체제는 응용 프로그램과 컴퓨터 하드웨어 사이 중재 역할을 한다. 메모리에 있는 파일을 올려 실행하려면 운영체제가 필요하며, 없으면 사용하지 못한다.

*운영체제의 목적*

1. 성능을 높인다.
2. 편의성을 제공한다.
3. 컴퓨터를 관리해주는 프로그램이다.

###### Main Memory

*RAM* => 대부분을 차지  
*ROM* => 일부만 차지 (10~100KB)

1. read only memory => 전원과 관계 없이 저장
2. power on => ROM을 먼저 읽음
3. Power Of Self Test(POST) => 부팅 때 검은 화면에서 테스팅을 하는 것
4. Boot Load(Booting) => 하드의 OS를 메인 메모리에 올리는 작업

###### 컴퓨터를 켜는 과정

- 전원을 킨 후 ROM은 더 이상 읽히지 않는다.
- 전원을 끄면 OS가 메모리에서 사라진다.

### 커널과 쉘

<figure class="w-inline-flex flex-column">
    <img src="./src/images/os/os01.png" alt="kernel&shell" title="kernel shell">
    <figcaption class="bg-light p-2 text-muted"><span class="tag tag-light">ref</span> google</figcaption>
</figure>

컴퓨터가 켜진 동안 <kbd>OS</kbd>는 항상 메모리에 있다. 어플리케이션 영역으로 갈수록 사용자와 근접하고 커널로 갈수록 하드웨어와 밀접한 관계를 가진다. 커널과 쉘이 OS이며 커널이 핵심이 되어 하드를 관리하고, 쉘은 명령을 해석하는 OS의 껍데기 정도의 개념이다.

파일을 실행하면 하드에서 메모리로 OS가 올려지고, 컴퓨터를 끝내면 다시 메모리에서 삭제 한다.

운영체제가 바뀌면 APP은 기존 운영체제와 달라 실행되지 않는다. 어플리케이션을 하나의 OS위에서 동작하기 때문이다.

###### OS의 자원관리

운영체제에는 여러 자원 관리, 할당자가 존재한다.

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

// th: 핵심|설명@
// tb: !Model|데이터를 가지고 로직을 처리한다. 데이터베이스와 대응 될 수 있다\\
// !View|요청된 페이지를 데이터 처리의 과정을 거쳐 브라우저에 나타낼 요소들을 출력해주는 역할을 한다.\\
// !Controller|사용자의 요청을 받아 요청에 맞는 Model의 로직을 실행하고 데이터의 흐름을 제어한다.@
// :end