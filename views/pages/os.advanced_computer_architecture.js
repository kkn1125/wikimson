export default {
    published: true,
    modified: '',
    done: false,
    title: '고등운영체제, 인터럽트 기반 운영체제',
    tags: ['os', 'advanced computer architecture', '고등운영체제'],
    categories: ['cs','Operating System'],
    authors: ['kimson'],
    wrote: '2022-02-11 22:44:53',
    toc: true,
    md: true,
    content: [
`
# 고등 운영체제

... 작성 중
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