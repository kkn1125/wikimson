export default {
    published: true,
    title: 'pure-function',
    modified: '2022-02-14 16:45:18',
    done: true,
    tags: ['pure-function', '순수 함수'],
    categories: ['CS'],
    authors: ['kimson'],
    wrote: '2021-12-14 12:12:22',
    toc: true,
    md: true,
    content:[
`
### 순수 함수 (Pure Function)

###### 특징

|구분|설명|
|---|---|
|부수효과(side effect)|주어진 입력으로 계산하는 것 외, 프로그램의 실행에 영향을 미치지 않아야 한다.|
|참조투명성(Referential transparency, RT)|입력 값이 같으면 결과 값도 같은 것|

###### 순수함수와 비순수함수

순수함수의 예로는 java의 문자열 길이를 반환하는 *length()*가 대표적입니다.

즉, 순수 함수는 함수 그 자체로 기능이 되어야하고, 어떠한 값이 인자로 왔을 때 원래의 것은 변함이 없어야하며, 항상 같은 결과 값을 리턴해야한다는 것에 있습니다. 부수효과가 없어야 하는 조건과 참조투명성이 있어야 \`Pure Function\`이 성립됩니다.

###### 예제

<pre>
<code class="language-javascript">/**
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
}</code>
</pre>

*sum*함수와 *addElementToArray*함수는 \`순수 함수\`에 해당합니다.

<pre>
<code class="language-javascript">/**
* @param {array} array
* @param {int} elem
* @returns {array} new array
*/
function addElementToArray(array, elem){
return [...array, elem, Math.random()];
}</code>
</pre>

하지만 처음의 코드와 달리 위의 코드는 *Math.random()*이 추가되었습니다.
이때 결과 값은 매번 다른 결과 값을 만들어 내기 때문에 \`비순수 함수\`에 해당합니다.
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