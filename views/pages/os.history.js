export default {
    published: true,
    modified: '',
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

<figure class="w-inline-flex flex-column">
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