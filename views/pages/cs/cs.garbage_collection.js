export default {
    published: true,
    title: 'garbage-collection',
    modified: '2022-02-26 12:11:32',
    done: false,
    tags: ['garbage-collection'],
    categories: ['CS'],
    authors: ['kimson'],
    wrote: '2021-11-28 21:19:21',
    toc: true,
    md: true,
    content: [`
# 가비지 컬렉션이란

## 정의

메모리 관리 기법 중의 하나이며, 프로그램이 동적으로 할당했던 메모리 영역 중 필요 없게 된 영역을 해제하는 기능.

정리되지 않은 메모리, 유효하지 않은 메모리 주소인 가비지를 정리해주는 프로그램이며, 1959년 무렵 LISP 문제를 해결하기 위해 존 매카시가 개발하였다.

자바, C# 등은 처음부터 GC를 염두에 두고 설계되었다.

|구분|설명|
|---|---|
|장점|유효하지 않은 포인터 접근|
|^^|이중 해제 방지|
|^^|메모리 누수 방지|
|단점|어떤 메모리를 해제할지 결정하는데 비용이 든다|
|^^|가비지 수집이 일어나는 타이밍이나 점유시간 예측이 어렵다|
|^^|할당 메모리가 해제되는 시점을 알 수 없다|

`,
        // `<div><span class="h3">포인터 추적 방식</span></div>`
    ],
    ref: [
        {
            name:'위키 백과 - CS',
            link:'https://ko.wikipedia.org/wiki/%EC%93%B0%EB%A0%88%EA%B8%B0_%EC%88%98%EC%A7%91_(%EC%BB%B4%ED%93%A8%ED%84%B0_%EA%B3%BC%ED%95%99)'
        },
    ],
    template(){
        return `
        ${wikiFilter.all.call(this)}
        `
    }
}