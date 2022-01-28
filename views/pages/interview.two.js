export default {
    published: true,
    modified: '2022-01-03 16:02:42',
    done: true,
    title: '인터뷰를 정리하자',
    tags: ['인터뷰를 정리하자'],
    categories: ['CS'],
    authors: ['kimson'],
    wrote: '2021-12-06 18:14:35',
    toc: false,
    content: [`
    <div>
        <div class="mt-3">
            <span class="h3">모 회사 2차 면접</span>
        </div>
        <div>
            <div>
                <span class="h6">면접 분위기</span>
            </div>
            <p>1차와 다르게 질문과 말하는 어조로 보아 압박면접의 느낌이었습니다. 이 또한 다대다의 면접으로 심지어 면접관, 지원자가 1명씩 더 추가되어 진행됐습니다. 이번에는 임원 면접이기에 회사에 대해 물어볼 것을 대비해 회사 공부를 열심히 했지만 흐름읽기에 실패하고 질문은 거의 기술면접과 유사했습니다.</p>
            <div>
                <span class="h6">면접 질문</span>
            </div>
            <p>
                크게 질문의 종류는 <span class="fw-bold">자기소개</span>, <span class="fw-bold">다른 개발자보다 뛰어난 강점</span>, <span class="fw-bold">어떤 언어를 주로 사용하는지</span>, 즉석에서 추가된 질문이었지만 <span class="fw-bold">TDD와 관련하여 오류 처리를 어떻게 하는지</span> 였습니다.
            </p>
            <div>
                <span class="h6">면접 질문 이후 느낌 점</span>
            </div>
            <p>
                우선 내 자신이 어느 위치에 있는지 파악되는 좋은 계기였고, 지원자 중에서 가장 이론적으로, 기술적으로 떨어지는 느낌을 받아 자극이 되고 어떤 점들을 배워야할 지 눈에 더 명확해지는 느낌이 들었습니다.
            </p>
            <p>
                현재 역량으로는 매우 부족하다는 현실을 다시 알려주었고, 흐지부지하던 JPA공부와 TDD를 먼저 정리해야겠다는 생각이 들고, 코딩을 하면서 클린 코드를 어떻게 짜면 좋을지에 대한 생각과 노력을 했지만 정작 그에 대해서는 아무 언급하지 못하고 어필을 못 한 게 너무 아쉬우면서도 말하지 못했다는 게 심도 있게 다루지 않았기에 그 말이 차마 나오지 못한 것 같아 많은 생각이 듭니다.
            </p>
            <p>
                그래도 꾸준히 하루에 조금씩 발전하고 새로운 것에 도전한다는 말은 전했으니 속은 후련합니다. 특출나게 잘하는 기술은 없지만 문제가 해결될 때까지 붙잡고 있는 것 하나는 그 누가와도 지지않을 자신이 있기 때문에 조만간 좋은 소식을 인터뷰 정리에 올리지 않을까 싶습니다.
            </p>
            <p>
                <span class="tag tag-danger">결과</span>
                <span>불합</span>
            </p>
        </div>
    </div>
    `],
    ref: [
        // {
        //     name:'위키 백과 - CS',
        //     link:'https://ko.wikipedia.org/wiki/%EC%93%B0%EB%A0%88%EA%B8%B0_%EC%88%98%EC%A7%91_(%EC%BB%B4%ED%93%A8%ED%84%B0_%EA%B3%BC%ED%95%99)'
        // },
    ],
    template(){
        return `
            ${wikiFilter.all.call(this)}
        `
    }
}