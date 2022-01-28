export default {
    published: true,
    modified: '',
    done: true,
    title: 'pure-function',
    tags: ['pure-function', '순수 함수'],
    categories: ['CS'],
    authors: ['kimson'],
    wrote: '2021-12-14 12:12:22',
    toc: true,
    content:[
        `
            <div>
                <div>
                    <span class="h3">순수 함수 (Pure Function)</span>
                </div>
                <div>
                    <div><span class="h6">특징</span></div>
                    th:구분|설명@
                    tb:!부수효과(side effect)|주어진 입력으로 계산하는 것 외, 프로그램의 실행에 영향을 미치지 않아야 한다.\\
                    !참조투명성(Referential transparency, RT)|입력 값이 같으면 결과 값도 같은 것
                    @:end
                    <div class="span h6">순수함수와 비순수함수</div>
                    <p>
                        순수함수의 예로는 java의 문자열 길이를 반환하는 <kbd>length()</kbd>가 대표적입니다.
                    </p>
                    <p>
                        즉, 순수 함수는 함수 그 자체로 기능이 되어야하고, 어떠한 값이 인자로 왔을 때 원래의 것은 변함이 없어야하며, 항상 같은 결과 값을 리턴해야한다는 것에 있습니다. 부수효과가 없어야 하는 조건과 참조투명성이 있어야 <span class="fw-bold">Pure Function</span>이 성립됩니다.
                    </p>
                    <div><span class="h6">예제</span></div>
                    <p>
                        <code>
                            <pre>
/**
 * @param {int} a 
 * @param {int} b 
 * @returns {int} a와 b의 합
 */
function sum(a, b){
    return a + b;
}

/**
 * @param {array} array
 * @param {int} elem
 * @returns {array} new array
 */
function addElementToArray(array, elem){
    return [...array, elem];
}
</pre>
                        </code>
                    </p>
                    <div>
                    <kbd>sum</kbd>함수와 <kbd>addElementToArray</kbd>함수는 <span class="fw-bold">순수 함수</span>에 해당합니다.
                    </div>
                    <p>
                        <code>
                            <pre>
/**
 * @param {array} array
 * @param {int} elem
 * @returns {array} new array
 */
function addElementToArray(array, elem){
    return [...array, elem, Math.random()];
}
</pre>
                        </code>
                    </p>
                    <div>
                        하지만 처음의 코드와 달리 위의 코드는 <kbd>Math.random()</kbd>이 추가되었습니다.
                        이때 결과 값은 매번 다른 결과 값을 만들어 내기 때문에 <span class="fw-bold">비순수 함수</span>에 해당합니다.
                    </div>
                </div>
            </div>
        `
    ],
    ref: [
        {
            name: '민소네님 블로그 - 순수 함수(Pure Function)',
            link: 'http://minsone.github.io/programming/pure-function'
        },
        {
            name: 'jeong-pro님 블로그 - 순수 함수란? (함수형 프로그래밍의 뿌리, 함수의 부수효과를 없앤다)',
            link: 'https://jeong-pro.tistory.com/23'
        },
    ],
    template(){
        return `
        ${wikiFilter.all.call(this)}
        `
    }
};