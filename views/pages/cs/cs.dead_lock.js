export default {
    published: true,
    title: '교착상태',
    modified: '2022-02-26 12:11:32',
    done: false,
    tags: ['dead-lock', '데드락', '교착상태', 'thread'],
    categories: ['CS'],
    authors: ['kimson'],
    wrote: '2021-11-30 14:20:53',
    toc: true,
    md: true,
    content: [`
# ${wikiFilter.toRef('cs-processthread', '멀티 프로세스와 멀티 스레드-2', '교착상태')}

## 정의

교착상태란 두 개 이상의 작업이 서로 간의 작업이 끝나기 만을 기다리는 상태, 결과적으로 아무것도 완료되지 못하는 상태를 말한다.

예를 들어, 연장이 망치와 톱이 있다 가정할 때 두 사람이 각 연장을 사용하다가 서로의 연장을 먼저 줄 것을 요구하며 지연되는 것과 유사하다.

## 조건


|구분|설명|
|---|---|
|상호배제 (Mutal exclusion)|<a class="ref" href="#cs-processthread" scroll-to="정의-1">프로세스</a>들이 필요로 하는 자원에 대해 배타적 통제권 요구|
|점유대기 (Hold & Wait)|프로세스가 할당된 자원을 가진 상태에서 다른 자원을 기다림|
|비선점 (No preemption)|프로세스가 어떤 자원의 사용을 끝낼 때까지 그 자원을 뺏을 수 없음|
|순환대기 (Circular wait)|각 프로세스는 순환적으로 다음 프로세스가 요구하는 자원을 가지고 있음|

`,
],
    ref: [
        {
            name:'위키 백과 - 교착상태',
            link:'https://ko.wikipedia.org/wiki/%EA%B5%90%EC%B0%A9_%EC%83%81%ED%83%9C'
        },
    ],
    template(){
        return `
        ${wikiFilter.all.call(this)}
        `
    }
};