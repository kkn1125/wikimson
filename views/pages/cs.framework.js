export default {
    published: true,
    title: 'framework',
    modified: '2022-02-14 16:26:44',
    done: false,
    tags: ['framework'],
    categories: ['CS'],
    authors: ['kimson'],
    wrote: '2021-11-29 18:56:35',
    toc: true,
    md: true,
    content: [
`
### framework란

###### 정의

|핵심|설명|
|---|---|
|Rule|프레임워크가 "나"를 부른다.|
|^^|규칙이 있어서 내가 따라야한다.|
|^^|규칙을 따를 뿐이다.|
|^^|프레임워크와 라이브러리의 성격을 모두 가진 영역도 존재한다. 예를 들면 리액트, 뷰 등은 라이브러리이면서 프레임워크의 성격을 가진다.|

`,
    ],
    ref: [
        {
            name:'관련 위키 wikimson>library',
            link:'#cs-library'
        },
        {
            name:'관련 위키 wikimson>api',
            link:'#cs-api'
        },
    ],
    template(){
        return `
        ${wikiFilter.all.call(this)}
        `
    }
};