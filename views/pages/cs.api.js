export default {
    published: true,
    title: 'api',
    modified: '2022-02-26 12:11:32',
    done: true,
    tags: ['api','aplication-programming-interface'],
    categories: ['CS'],
    authors: ['kimson'],
    wrote: '2021-11-30 21:15:57',
    toc: true,
    md: true,
    content: [`
# API란

## 정의

|핵심|설명|
|---|---|
|매개역할|프로그램 간 통신을 하게 해준다.|
|^^|요청하면 서버에 저장된 데이터를 꺼내어 준다.|
|^^|권한 또는 효청횟수, 비용 등의 제약이 있는 API도 있다.|
|^^|API를 호출함으로써 다른 프로그램에 전달하여 데이터를 처리, 이용할 수 있다.|

API의 예로 중간 단계에서 요청을 다루는 역할을 하는 것으로 많이들 예로 듭니다.

사용의 예로 들면, 주소 API를 사용한다고 가정할 때 우리가 그 주소데이터가 담긴 서버를 직접 들어가거나 요청하지 않습니다. 그 데이터에 접근할 수 있는 API라는 녀석에게 "경상남도에 어디 지역을 줘"라고 요청이 오면 해당 데이터를 허용된 요청자에게 접근성이 부여된 요청자에게 내용을 전달해줍니다.

즉, "내"가 요청해서 "API"가 데이터에 접근하고 요청 내용을 다시 "내"가 받는 모양세입니다. 이 때문에 어디서는 은행에서의 "창구"와 같은 역할, 또는 음식점에서의 "점원"과 같은 역할이라고 표현합니다.

## API의 유형

1. *private API* 제3자에게 노출되지 않는 내부 API입니다. 사내 개발자가 자사 제품, 서비스를 개선하기 위해 내부적으로 사용됩니다.
2. *public API* 제3자에게 노출되지 않는 내부 API입니다. 사내 개발자가 자사 제품, 서비스를 개선하기 위해 내부적으로 사용됩니다.
3. *partner API* 기업 데이터 공유에 동의한 특정 대상만이 사용가능하고 회사간 소프트웨어의 통합을 위해 사용됩니다.
`],
    ref: [
        {
            name:'wishket 블로그',
            link:'http://blog.wishket.com/api%EB%9E%80-%EC%89%BD%EA%B2%8C-%EC%84%A4%EB%AA%85-%EA%B7%B8%EB%A6%B0%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8/'
        },
        {
            name:'관련 위키 wikimson>library',
            link:'#cs-library'
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