export default {
    pagination: true,
    published: true,
    title: 'home',
    md: true,
    content: [`
## About

> 현재 만들어진 페이지는 순수 자바스크립트로만 이루어져 있습니다. 조작이 쉽도록 구현되어 있고, 페이지 전환은 hash를 통해서 이루어집니다. 자세한 사항은 [github 저장소](https://github.com/kkn1125/wikimson){:target="_blank"}를 참고 해주세요.

매일 배운 것을 나만의 위키백과로 기록하기 위해 만들어졌습니다.

나를 위한 기록이지만 누군가를 위한 기록이기 때문에 오류없이 기록하려 노력합니다. 잘못된 부분이나 지적은 이슈를 통해 지적해주시면 감사하겠습니다.
`],
    template() {
        return `
        ${wikiFilter.content.call(this)}
        `
    }
}