export default {
    published: true,
    modified: '2022-01-03 16:02:42',
    done: true,
    title: '인터뷰를 정리하자',
    tags: ['인터뷰를 정리하자'],
    categories: ['CS'],
    authors: ['kimson'],
    wrote: '2021-12-06 18:14:35',
    toc: true,
    content: [`
    <div>
        <div class="mt-3">
            <span class="h3">이후 목표</span>
        </div>
        <div>
            <div>
                <span class="h6">느낀 점</span>
            </div>
            <p>
                면접이 끝나고 거의 한 달이 되어갑니다. 면접을 보고 느낌 점은 많습니다만, 몇 가지 생각을 정리하자면 내가 얼마나 아느냐 보다는 얼마나 공부하는 의지가 있고 자신만의 강점이 있는지와 툴을 잘 쓰는게 아닌 내용을 잘 숙지하고 있는가에 좀 더 초점을 두려합니다.
            </p>
            <p>
                현재 자바스크립트로 여러 기능을 만들어 봤지만 딱 잘라 말했을 때 "프로젝트"라고 하기에는 너무 작은 부품과도 같은 기능만을 만들어 냈습니다. 물론 이런저런 기능만으로 승부하려한건 아니지만 도움이 되겠지 싶어서 시작한 것들이 지금에 와서는 오히려 독이 되었다 생각됩니다.
            </p>
            <p>
                부질없는 짓은 아니지만 면접에 플러스되는 요인은 아니라고 봅니다. 단순히 기능하나 만들고 일희일비 하는 것보다 제대로 프로젝트 하나를 완성시켜서 거기에 대한 내용을 쭉 설명하고, 혹은 배포도 해보면서 서비스하고, 요구사항에 유동적으로 대처하는 등의 기술을 더 중요시 한다는 느낌을 받았습니다.
            </p>
            <p>
                도움이 될 정보는 아니지만 저와 같은 처지인 분들은 힘내시길.
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
        this.title = this.origin.name;
        
        return `
            ${wikiFilter.all.call(this)}
        `
    }
}