import {App} from '../../core/core.js'

export default {
    published: true,
    modified: '',
    done: false,
    title: '자바스크립트 정리',
    tags: ['api','object'],
    categories: ['javascript'],
    authors: ['kimson'],
    wrote: '2022-01-14 21:47:54',
    toc: true,
    content: [
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
                    <img src="${App.baseurl}src/images/javascript/console/console01.png" alt="sample">
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
                    <img src="${App.baseurl}src/images/javascript/object/object01.png" alt="sample">
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
    ],
    template(){
        return `
            ${wikiFilter.all.call(this)}
        `
    }
};