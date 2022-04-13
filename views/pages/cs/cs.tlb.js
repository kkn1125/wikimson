export default {
    published: true,
    title: 'Translation Lookaside Buffer',
    done: true,
    tags: ['Translation Lookaside Buffer', 'TLB'],
    categories: ['CS'],
    authors: ['kimson'],
    wrote: '2022-04-13 13:51:23',
    toc: true,
    md: true,
    content: [`
# Translation Lookaside Buffer (TLB)

## 정의

*"변환 색인 버퍼"*(이하 "TLB")라 하며 가상 메모리 주소를 물리 주소로 변환하는 속도를 높이기 위해 사용되는 *캐시*이다.

## 개요

TLB는 최근에 일어난 ~가상 메모리 주소~와 ~물리주소~의 *변환 테이블을 *저장*하기 때문에 일종의 *주소 변환 캐시*라 할 수 있다.

여러가지 다른 레벨의 캐시들 사이에서 주소를 변환하는데 사용가능하다.

- CPU <==> CPU캐시
- CPU캐시 <==> 메인 메모리

모든 데스크탑, 서버용 프로세서는 *하나 또는 그 이상*의 TLB를 *메모리 관리 하드웨어*에 가지고 있다.

페이지 단위나 세그먼트 단위로 처리하는 가상 메모리를 사용하는 거의 모든 하드웨어는 TLB를 사용한다.
`],
    ref: [
        {
            name:'위키백과 - 변환 색인 버퍼',
            link:'https://ko.wikipedia.org/wiki/%EB%B3%80%ED%99%98_%EC%83%89%EC%9D%B8_%EB%B2%84%ED%8D%BC'
        },
        {
            name:'관련 위키 wikimson>os>이중 모드',
            link:'#operating-system-dual-mode',
            to: '이중 모드는 어떻게 만드나?-3'
        },
    ],
    template(){
        return `
        ${wikiFilter.all.call(this)}
        `
    }
}