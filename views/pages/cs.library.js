export default {
    published: true,
    title: 'library',
    modified: '2022-02-14 16:26:29',
    done: true,
    tags: ['library', '라이브러리'],
    categories: ['CS'],
    authors: ['kimson'],
    wrote: '2021-11-29 18:56:35',
    toc: true,
    md: true,
    content: [
`
### 라이브러리란

###### 정의

|핵심|설명|
|---|---|
|*require*|대체해도 프로젝트가 망하거나 하지 않는다.|
|^^|"내"가 요청한다.|

`,
    ],
    ref: [
        {
            name:'관련 위키 wikimson>api',
            link:'#cs-api'
        },
        {
            name:'관련 위키 wikimson>framework',
            link:'#cs-framework'
        },
    ],
    template(){
        return `
        ${wikiFilter.all.call(this)}
        `
    }
}