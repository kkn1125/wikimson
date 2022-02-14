export default {
    published: true,
    title: 'mvc',
    modified: '2022-02-14 16:29:00',
    done: true,
    tags: ['mvc','design-pattern'],
    categories: ['cs','design-pattern'],
    authors: ['kimson'],
    wrote: '2021-11-30 18:42:38',
    toc: true,
    md: true,
    content: [
`
### mvc란

###### 정의

<figure class="text-center">
    <img src="https://s3.ap-northeast-2.amazonaws.com/opentutorials-user-file/module/327/1262.png" alt="sample">
    <figcaption class="bg-light p-2 text-muted"><span class="tag tag-light">ref</span> amazon</figcaption>
</figure>

|구분|설명|
|---|---|
|Model|데이터를 가지고 로직을 처리한다. 데이터베이스와 대응 될 수 있다|
|View|요청된 페이지를 데이터 처리의 과정을 거쳐 브라우저에 나타낼 요소들을 출력해주는 역할을 한다.|
|Controller|사용자의 요청을 받아 요청에 맞는 Model의 로직을 실행하고 데이터의 흐름을 제어한다.|

###### MVC1 패턴

사용자 요청이 들어오면 서버 내의 jsp(view & controller)와 javaBean을 거치게 된다.

요청이 들어오면 jsp에서 view, controller역할을 함께 하게 되고, model을 통해 데이터 처리가 이루어지며, 필요에 따라 데이터베이스와 대응한다. model이 update된 내용을 view에 전달하여 브라우저에 출력이 된다.

비즈니스 로직이 복잡하지 않을 때, 즉, 소규모 프로젝트에 사용되며 빠르고 쉽게 개발할 수 있다는 장점이 있지만 복잡해지고 더 큰 규모로 발전한다면 Controller와 View가 혼재되어 유지보수에 어려움을 겪을 수 있다.

###### MVC2 패턴

패턴2에서는 패턴1의 jsp에서 사용하던 controller와 view를 분리한 형태이다.

단, mvc1 패턴보다 구현이 복잡하고 개발 난이도가 높지만 유지보수 측면에서 유리하고 PE와 BE의 분업이 가능하다.
`,
    ],
    ref: [
        {
            name:'preamtree님 블로그',
            link:'https://preamtree.tistory.com/11'
        },
        {
            name:'생활코딩 디자인 패턴',
            link:'https://opentutorials.org/module/327/3828'
        },
    ],
    template(){
        return `
        ${wikiFilter.all.call(this)}
        `
    }
}