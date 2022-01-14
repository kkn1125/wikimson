const javascript = {
    modified: '',
    done: false,
    published: true,
    title: '자바스크립트 정리',
    tags: ['api','worker api'],
    categories: ['javascript'],
    authors: ['kimson'],
    wrote: '2022-01-14 21:47:54',
    toc: true,
    content: [
        `
        <div>
            <div class="mt-3">
                <span class="h3">Console</span>
            </div>
            <div>
                <div>
                    <span class="h6">table</span>
                </div>
                <p align="center">
                    <img src="assets/images/javascript/console/console01.png" alt="sample">
                </p>
                <p>
                    콘솔은 코드를 짜는데 많은 사용 비중을 차지한다고 생각합니다. <kbd class="bg-info">Jest</kbd>를 사용하면서 콘솔의 사용이 줄었지만 데이터 값을 확인 할 때 자주 사용되곤 합니다.
                </p>
                <p>
                    <span class="fw-bold">console.table()</span>메서드는 테이블 형식으로 데이터를 표시합니다. 배열이나 객체를 확인 할 때 보기 좋게 콘솔에 나타나고, 엑셀의 표처럼 인덱싱을 할 수 있습니다.
                </p>
                <p align="center">
                    <img src="${baseurl}assets/images/javascript/console/console02.png" alt="sample">
                </p>
                <p>
                    위 이미지처럼 개체를 테이블로 나타낼 수도 있습니다.
                </p>
                <p>
                    단일 객체, 1차원 배열의 경우 아래와 같이 테이블로 표시되게 할 수 있습니다.
                </p>
                <p>
                    <pre>
                        <code>console.table(new Dog())</code>
                    </pre>
                </p>
                <p>
                    2차원 배열도 table메서드의 첫 번째 인자로 주면 아래와 같이 2차원 배열부터 컬럼이 추가되며 표시됩니다.
                </p>
                <p align="center">
                    <img src="${baseurl}assets/images/javascript/console/console03.png" alt="sample">
                </p>
                <p>
                    조금 더 나아가 선택적으로 테이블 표시를 제한 할 수 도 있습니다. 
                </p>
                <p>
                    <pre>
                        <code>console.table([new Dog(),new Dog()], 'name')</code>
                    </pre>
                </p>
                <p>
                    단일의 컬럼만을 조회하고 싶다면 위의 코드와 같이 table메서드의 두번째 인자로 컬럼명을 주면 됩니다. 더 많은 컬럼명으로 제한하고 싶다면
                    <pre>
                        <code class="language-javascript">console.table([new Dog(),new Dog()], ['name','age', [, ...]])</code>
                    </pre>
                    배열로 묶어 컬럼명을 넣어주면 필터링된 테이블이 표시되는 것을 볼 수 있습니다.
                </p>
                <p align="center">
                    <img src="${baseurl}assets/images/javascript/console/console04.png" alt="sample">
                </p>
                <p>
                    없는 컬럼명은 알아서 오류없이 걸러집니다.
                </p>
                <hr>
                <div>
                    <span class="h6">time/timeEnd</span>
                </div>
                <div>
                    <p>
                        time과 timeEnd는 짝입니다. time은 함수나 어떤 기능의 실행 소요 시간을 측정하는데 사용됩니다.
                    </p>
                    <p>
                        물론 필요에 따라 시간이 얼마나 걸렸는지 중간에 체크할 수 있는 log도 있습니다.
                    </p>
                    <p>
                        <kbd class="bg-info">time과</kbd> <kbd class="bg-info">timeEnd</kbd>, <kbd class="bg-info">log</kbd>는 매우 단순하게 사용가능합니다.
                    </p>
                    <p>
                        <pre>
<code>console.time('라벨1');
// ...do something
console.timeLog('라벨1', '데이터 값');
// ...do something
console.timeEnd('라벨1');
</code>
                        </pre>
                        <blockquote class="blockquote blockquote-info">
                            Console ->
                            <li>test: 0.01513671875 ms 1</li>
                            <li>test: 0.097900390625 ms 2</li>
                            <li>test: 0.133056640625 ms</li>
                        </blockquote>
                    </p>
                </div>
            </div>
        </div>
        `,
        `
        <div>
            <div>
                <span class="h3">Object</span>
            </div>
            <div>
                <div>
                    <span class="h6">defineProperty</span>
                </div>
                <p align="center">
                    <img src="assets/images/javascript/console/console01.png" alt="sample">
                </p>
                <p>
                    class에서 쉽게 getter와 setter를 구현했습니다. 함수형 객체에서도 getter와 setter는 구현할 수 있습니다.
                </p>
                <p>
                    간단한 예로 객체의 프로퍼티중 중 보호되어야 하는 값이 있다면 class에서는 아래와 같이 작성했습니다.
                </p>
                <p>
                    <pre>
<code>class Parent {
    get name () {
        return this._name;
    }
    set name (name) {
        this._name = name;
    }
}
// 객체 리터럴도 마찬가지 입니다.
const obj = {
    get name () {
        return this._name;
    }
    set name (name) {
        this._name = name;
    }
}
</code>
                    </pre>
                </p>
                <p>
                    함수형 객체에서는 <kbd class="bg-info">defineProperty</kbd>로 지정해주어야 합니다. 번거로워 보이지만 for문으로 돌려 원하는 프로퍼티들의 <kbd class="bg-warning">getter</kbd>와 <kbd class="bg-warning">setter</kbd>를 한 번에 넣어버릴 수 있습니다.
                </p>
                <p>
                    <pre>
<code>const porperties = [
    'id',
    'email',
    'password',
    'name',
    'birth',
    'address',
    'sex',
]

const Parent = function () {
    // ... 코드 작성
}
</code>
                    </pre>
                    아래의 예를 보시면 일일이 지정하지 않아도 간단한 getter/setter는 만들 수 있습니다. 각각의 프로퍼티마다 해야할 기능이 다르다면 다른 방식으로 작성해야 합니다.
                </p>
                <p align="center">
                    <img src="${baseurl}assets/images/javascript/object/object01.png" alt="sample">
                    <blockquote class="blockquote blockquote-info">
                        Console ->
                        <li>kimson</li>
                    </blockquote>
                </p>
            </div>
        </div>
        `,

    ],
    ref: [
        // {
        //     name:'위키 백과 - CS',
        //     link:'https://ko.wikipedia.org/wiki/%EC%93%B0%EB%A0%88%EA%B8%B0_%EC%88%98%EC%A7%91_(%EC%BB%B4%ED%93%A8%ED%84%B0_%EA%B3%BC%ED%95%99)'
        // },
    ]
};