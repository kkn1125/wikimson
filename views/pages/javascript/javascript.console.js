export default {
    published: true,
    title: '자바스크립트 정리',
    modified: '2022-02-26 12:11:32',
    done: false,
    tags: ['api','worker api'],
    categories: ['javascript'],
    authors: ['kimson'],
    wrote: '2022-01-14 21:47:54',
    toc: true,
    md: true,
    content: [`
# Console

## table

${wikiFilter.img('javascript/console/console01.png', 'google')}

콘솔은 코드를 짜는데 많은 사용 비중을 차지한다고 생각합니다. <kbd class="bg-info">Jest</kbd>를 사용하면서 콘솔의 사용이 줄었지만 데이터 값을 확인 할 때 자주 사용되곤 합니다.

*console.table()*메서드는 테이블 형식으로 데이터를 표시합니다. 배열이나 객체를 확인 할 때 보기 좋게 콘솔에 나타나고, 엑셀의 표처럼 인덱싱을 할 수 있다.

${wikiFilter.img('javascript/console/console02.png', 'google')}

위 이미지처럼 개체를 테이블로 나타낼 수도 있다. 단일 객체, 1차원 배열의 경우 아래와 같이 테이블로 표시되게 할 수 있다.

\`\`\`javascript
console.table(new Dog());
\`\`\`

2차원 배열도 table메서드의 첫 번째 인자로 주면 아래와 같이 2차원 배열부터 컬럼이 추가되며 표시됩니다.

${wikiFilter.img('javascript/console/console03.png', 'google')}

조금 더 나아가 선택적으로 테이블 표시를 제한 할 수 도 있다. 

\`\`\`javascript
console.table([new Dog(),new Dog()], 'name');
\`\`\`

단일의 컬럼만을 조회하고 싶다면 위의 코드와 같이 table메서드의 두번째 인자로 컬럼명을 주면 됩니다. 더 많은 컬럼명으로 제한하고 싶다면

\`\`\`javascript
console.table([new Dog(),new Dog()], ['name','age', [, ...]])
\`\`\`

배열로 묶어 컬럼명을 넣어주면 필터링된 테이블이 표시되는 것을 볼 수 있다.

${wikiFilter.img('javascript/console/console04.png', 'google')}

없는 컬럼명은 알아서 오류없이 걸러집니다.

***

## time/timeEnd

time과 timeEnd는 짝이다. time은 함수나 어떤 기능의 실행 소요 시간을 측정하는데 사용된다.

물론 필요에 따라 시간이 얼마나 걸렸는지 중간에 체크할 수 있는 log도 있다.

\`time과\` \`timeEnd\`, \`log\`는 매우 단순하게 사용가능합니다.

\`\`\`javascript
console.time('라벨1');
// ...do something
console.timeLog('라벨1', '데이터 값');
// ...do something
console.timeEnd('라벨1');
\`\`\`

> Console ->
- test: 0.01513671875 ms 1
- test: 0.097900390625 ms 2
- test: 0.133056640625 ms
`,
    ],
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
};