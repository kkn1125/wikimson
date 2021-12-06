const garbage_collection = {
    modified: '',
    done: false,
    published: true,
    title: 'garbage-collection',
    tags: ['garbage-collection'],
    categories: ['CS'],
    authors: ['kimson'],
    wrote: '2021-11-28 21:19:21',
    toc: true,
    content: [ // th: thead, tb: tbody, \\: tr 추가, !: 강조, @: 단락바꿈, |: td 추가
        `
        <div><span class="h3">가비지 컬렉션이란</span></div>
        <div>
            <div>
                <span class="h6">정의</span>
                <p>메모리 관리 기법 중의 하나이며, 프로그램이 동적으로 할당했던 메모리 영역 중 필요 없게 된 영역을 해제하는 기능.</p>
                <p>정리되지 않은 메모리, 유효하지 않은 메모리 주소인 가비지를 정리해주는 프로그램이며, 1959년 무렵 LISP 문제를 해결하기 위해 존 매카시가 개발하였다.</p>
                <p>자바, C# 등은 처음부터 GC를 염두에 두고 설계되었다.</p>
                <div>
                    <span class="fw-bold fs-5">장단점</span>
                    th: 구분|텍스트@
                    tb: !장점|<ol>
                        <li>유효하지 않은 포인터 접근</li>
                        <li>이중 해제 방지</li>
                        <li>메모리 누수 방지</li>
                    </ol>\\
                    !단점|<ol>
                        <li>어떤 메모리를 해제할지 결정하는데 비용이 든다</li>
                        <li>가비지 수집이 일어나는 타이밍이나 점유시간 예측이 어렵다</li>
                        <li>할당 메모리가 해제되는 시점을 알 수 없다</li>
                    </ol>@
                    :end
                </div>
            </div>
        </div>
        `,
        `<div><span class="h3">포인터 추적 방식</span></div>`
    ],
    ref: [
        {
            name:'위키 백과 - CS',
            link:'https://ko.wikipedia.org/wiki/%EC%93%B0%EB%A0%88%EA%B8%B0_%EC%88%98%EC%A7%91_(%EC%BB%B4%ED%93%A8%ED%84%B0_%EA%B3%BC%ED%95%99)'
        },
    ],
}