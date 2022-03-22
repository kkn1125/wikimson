export default {
    pagination: true,
    published: true,
    title: 'home',
    author: ['kimson'],
    wrote: '2022-02-08 22:01:12',
    md: true,
    content: [`
# About

{%table%}
$다양한 기능:
현재 보시는 tab-list는 마크다우기존의 마크다운에서 별도로 추가한 확장 기능입니다.
(:))
:$

$마크다운지원:
# h1

\`\`\`java
public class test {
    public static void main (String[] args) {
        System.out.print('test')
    }
}
\`\`\`
:$

$Tab3:
탭을 늘리는 것을 단순합니다.

\`$tab명칭: 내용내용 &#x3A;$\` 으로 사용합니다.
:$

{%endTable%}

> 현재 만들어진 페이지는 순수 자바스크립트로만 이루어져 있습니다. 조작이 쉽도록 구현되어 있고, *페이지 전환*은 *hash*를 통해서 이루어집니다. 자세한 사항은 [github 저장소](https://github.com/kkn1125/wikimson){:target="_blank"}를 참고 해주세요.

매일 *배운 것을 기록하기 위해* \`나만의 위키백과\`를 테마로 만들어졌습니다.

나를 위한 기록이지만 누군가를 위한 기록이기 때문에 오류없이 기록하려 노력합니다. 잘못된 부분이나 지적은 이슈를 통해 지적해주시면 감사하겠습니다 🙇‍♂️

현재 wiki페이지에서 이미지로 활용되는 손그림은 자유롭게 쓰시되 출처를 남겨주시기 바랍니다. *비영리 목적으로 변경을 금지하고 출처를 남기시면* 자유롭게 이용이 가능합니다.
`],
    template() {
        return `
        ${wikiFilter.all.call(this)}
        `
    }
}