export default {
    published: true,
    modified: '',
    done: false,
    title: 'domain-driven-design',
    tags: ['domain-driven-design', 'ddd', '도메인'],
    categories: ['CS', 'refactoring'],
    authors: ['kimson'],
    wrote: '2021-12-14 15:01:34',
    toc: true,
    content:[
        `
        <div><span class="h3">DDD(domain driven design)</span></div>
        <div>
            <div>
                <span class="h6">정의</span>
                <div>
                    <div>도메인 주도 설계라고 직역되며, 도메인의 번역 의미는 <kbd class="bg-danger">영역, 범위</kbd>라는 의미를 가집니다. <kbd class="bg-danger">문제 해결을 하고자 하는 문제 영역</kbd>을 도메인이라 하며 도메인은 여러 하위 도메인으로 구성됩니다. 흔히 객체 지향의 예제로 많이 배우는 형태의 모델로 각 객체가 수행하는 업무를 분담하는 것을 말합니다.</div>
                </div>
            </div>
            <div>
                <span class="h6">도메인 모델 패턴 4 계층</span>
                th: 계층|설명@
                tb: !UI 또는 표현|사용자 요청을 처리하고 사용자에게 정보를 보여준다. 여기서 사용자는 소프트웨어를 사용하는 사람 뿐 아니라 외부 시스템도 사용자가 될 수 있다.\\
                    !응용|사용자가 요청한 기능을 실행한다. 업무 로직을 직접 구현하지 않고 도메인 계층을 조합해서 기능을 실행한다.\\
                    !도메인|시스템이 제공할 도메인의 규칙을 구현한다.\\
                    !인프라스트럭처|데이터베이스나 메시징 시스템과 같은 외부 시스템과의 연동을 처리한다.
                @:end
            </div>
            <div>
                <span class="h6">도메인 모델 도출</span>
                th: 계층|설명@
                tb: !UI 또는 표현|사용자 요청을 처리하고 사용자에게 정보를 보여준다. 여기서 사용자는 소프트웨어를 사용하는 사람 뿐 아니라 외부 시스템도 사용자가 될 수 있다.\\
                    !응용|사용자가 요청한 기능을 실행한다. 업무 로직을 직접 구현하지 않고 도메인 계층을 조합해서 기능을 실행한다.\\
                    !도메인|시스템이 제공할 도메인의 규칙을 구현한다.\\
                    !인프라스트럭처|데이터베이스나 메시징 시스템과 같은 외부 시스템과의 연동을 처리한다.
                @:end
            </div>
        </div>
        `
    ],
    ref: [
        {
            name: 'snowdeer\'s Code Holic 블로그 - DDD START! 도메인 주도 설계 구현과 핵심 개념 익히기',
            link: 'https://snowdeer.github.io/sw-architecture/2021/06/01/sw-domain-model/',
        },
        {
            name: 'Jins\' Dev Inside - 프로그래밍의 2가지 로직 패턴. 도메인 모델(Domain Model) & 트랜잭션 스크립트(Transaction Script)',
            link: 'https://jins-dev.tistory.com/entry/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%EC%9D%98-2%EA%B0%80%EC%A7%80-%EB%A1%9C%EC%A7%81-%ED%8C%A8%ED%84%B4-%EB%8F%84%EB%A9%94%EC%9D%B8-%EB%AA%A8%EB%8D%B8Domain-Model-%ED%8A%B8%EB%9E%9C%EC%9E%AD%EC%85%98-%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8Transaction-Script',
        },
        {
            name: 'gnidoc님 블로그 - 도메인 주도 설계(DDD-Domain Driven Design) - 도메인 모델',
            link: 'https://gnidoc.tistory.com/entry/%EB%8F%84%EB%A9%94%EC%9D%B8-%EC%A3%BC%EB%8F%84-%EC%84%A4%EA%B3%84DDD-Domain-Driven-Design-%EB%8F%84%EB%A9%94%EC%9D%B8-%EB%AA%A8%EB%8D%B8',
        },
        {
            name: 'Incheol\'s TECH BLOG - 1장 도메인 모델 시작',
            link: 'https://incheol-jung.gitbook.io/docs/study/ddd-start/1',
        },
        {
            name: 'joont92님 블로그 - [ddd] 도메인 모델',
            link: 'https://joont92.github.io/ddd/%EB%8F%84%EB%A9%94%EC%9D%B8-%EB%AA%A8%EB%8D%B8/',
        },
        {
            name: '살수다님 블로그 - DDD - 도메인 모델 패턴',
            link: 'https://velog.io/@gentledot/ddd-domain-model',
        },
        {
            name: 'GentleDot\'s 님 velog - 도메인 주도 설계 (1) - 도메인 모델',
            link: 'https://frontierdev.tistory.com/19',
        },
        {
            name: 'Junha Baek님 velog - 백엔드 서버 아키텍처 — Domain Layer1. Domain Layer와 DDD',
            link: 'https://tech.junhabaek.net/%EB%B0%B1%EC%97%94%EB%93%9C-%EC%84%9C%EB%B2%84-%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98-domain-layer1-domain-layer%EC%99%80-ddd-e97a7587a7b0',
        },
        {
            name: 'Junha Baek님 velog - 백엔드 서버 아키텍처 — Application Layer 1. 개요와 기본 Variation',
            link: 'https://tech.junhabaek.net/%EB%B0%B1%EC%97%94%EB%93%9C-%EC%84%9C%EB%B2%84-%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98-application-layer-1-%EA%B0%9C%EC%9A%94%EC%99%80-%EA%B8%B0%EB%B3%B8-variation-9fac801ddba8',
        },
    ],
    template(){
        return `
        ${wikiFilter.all.call(this)}
        `
    }
}