export default {
    published: true,
    title: '자바스크립트 정리',
    modified: '2022-03-04 16:44:15',
    done: true,
    tags: ['api','object'],
    categories: ['javascript'],
    authors: ['kimson'],
    wrote: '2022-01-14 21:47:54',
    toc: true,
    md: true,
    content: [`
# Object

## defineProperty

${wikiFilter.img('javascript/console/console01.png', 'kimson')}

class에서 쉽게 getter와 setter를 구현했습니다. 함수형 객체에서도 getter와 setter는 구현할 수 있습니다.

간단한 예로 객체의 프로퍼티중 중 보호되어야 하는 값이 있다면 class에서는 아래와 같이 작성했습니다.

\`\`\`javascript
class Parent {
    get name () {
        return this._name;
    },
    set name (name) {
        this._name = name;
    }
}
// 객체 리터럴도 마찬가지 입니다.
const obj = {
    get name () {
        return this._name;
    },
    set name (name) {
        this._name = name;
    }
}
\`\`\`

함수형 객체에서는 \`defineProperty\`로 지정해주어야 합니다. 번거로워 보이지만 for문으로 돌려 원하는 프로퍼티들의 \`getter\`와 \`setter\`를 한 번에 넣어버릴 수 있습니다.

\`\`\`javascript
const porperties = [
    'id',
    'email',
    'password',
    'name',
    'birth',
    'address',
    'sex',
];

const Parent = function () {
    // ... 코드 작성
}
\`\`\`

아래의 예를 보시면 일일이 지정하지 않아도 간단한 getter/setter는 만들 수 있다. 각각의 프로퍼티마다 해야할 기능이 다르다면 다른 방식으로 작성해야 한다.

${wikiFilter.img('javascript/object/object01.png', 'kimson')}

> Console -> kimson
`,
    ],
    ref: [],
    template(){
        return `${wikiFilter.all.call(this)}`;
    }
};