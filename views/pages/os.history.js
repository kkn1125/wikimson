export default {
    published: true,
    modified: '2022-02-08 22:03:23',
    done: false,
    title: '운영체제 역사',
    tags: ['os', 'history'],
    categories: ['cs','Operating System'],
    authors: ['kimson'],
    wrote: '2022-02-07 19:00:29',
    toc: true,
    md: true,
    content: [
`
### 운영체제 역사

컴퓨터의 역사는 1940년대 부터 시작하게 된다. 이전에 1893년 홀러리스에 의해 천공 카드 시스템이 개발되어 대규모 데이터의 취급이 가능해졌다. 천공 카드는 다양한 자료를 동시에 취급, 관리할 수 있게 해주었다.

<figure class="text-center">
    <img src="./src/images/os/fortran_card.jpg" alt="sample">
    <figcaption class="bg-light p-2 text-muted"><span class="tag tag-light">ref</span> 나무 위키 - 천공카드</figcaption>
</figure>

###### 천공카드

*천공카드*는 요즘의 OMR카드의 시초가 된 것으로 입력장치이자 기억장치이다. 20세기 초반까지 컴퓨터 기억장치로 활용이 되었다. 하지만 한장만으로 보관할 수 있는 데이터 양이 너무 적어 몇십장에서 복잡한 연산의 경우 몇백장을 소비해야하는 비효율적인 기억장치이다.

2진법 데이터를 기록한 카드이고, 당시 사용된 대표적인 컴퓨터 언어가 코볼과 포트란이며 언어 자체적으로 80칼럼에 맞추어 코딩하도록 되어 있다.

이때 프로그래머들은 손 코딩으로 종이에 작성하고, 천공카드에 구멍을 뚫는 식이었고, 이후 천공카드에 구멍을 찍어주는 여사원을 따로 고용하기도 했다. 보통 \`펀순이\`라는 은어로 불렸다고 한다.

여담이지만 당시 손 코딩 시 작업자 끼리의 편의성을 위해 L은 대문자, i는 소문자로 적는 규칙이 있었다고 한다. 수기로 적으면 저마다 i와 l이 헷갈리기 때문 인 듯 하다.

하지만 이 천공카드가 현대 시점에서 비효율적이지만 이전과 비교하면 수기로 작성한 서류를 일일히 관리하기 보다는 효율적인 것이다. 그래서 시작은 미국 정부의 국가통계작성과 인구조사 자료처리를 위해 발명되었다고 한다.

1. No OS => 종이에 구멍을 뚫어 식별기호를 조합하여 메모리에 수동으로 올림.
2. Batch Processing (일괄처리 시스템) => 최초의 OS(운영체제)
3. 하드디스크 등장 => OS의 변화를 가져왔으며, 초기에는 파일이 메모리에 하나만 올라갈 수 있었다.

* batch : 꾸러미, resident monitor  
* 연산 : CPU담당, 초기에는 CPU가 효율성이 떨어졌음  
* 입출력 : I/O담당

###### Multi-Programming System

- 컴퓨터는 비싼 자원이었다.
- 빠른 CPU와 느린 I/O => 메모리에 여러개의 일이 가능해졌다.
- CPU Scheduling, 메모리 관리, 보호

###### Time Sharing System (시공유 시스템)

<figure class="text-center">
    <img src="./src/images/os/os02.png" alt="sample">
    <figcaption class="bg-light p-2 text-muted"><span class="tag tag-light">ref</span> google</figcaption>
</figure>

1960년대 Unix가 등장하고 1970년대에 보급되기 시작하였다. Unix가 대표적인 TSS이며, Unix가 현재의 Linux => TSS에 기반 (window 포함)

###### 컴퓨터 규모별 분류

- Super Computer => Mainframe => Mini => Micro
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