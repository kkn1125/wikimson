export default {
    pagination: true,
    published: true,
    title: 'home',
    template() {
        return `
        <div>
            <div><span class="h2">About</span></div>
            <blockquote class="blockquote blockquote-info">
                현재 만들어진 페이지는 순수 자바스크립트로만 이루어져 있습니다. 조작이 쉽도록 구현되어 있고, 페이지 전환은 hash를 통해서 이루어집니다. 자세한 사항은 <a href="https://github.com/kkn1125/wikimson" target="_blank">github 저장소</a>를 참고 해주세요.
            </blockquote>
            <p>매일 배운 것을 나만의 위키백과로 기록하기 위해 만들어졌습니다.</p>
            <div>
                나를 위한 기록이지만 누군가를 위한 기록이기 때문에 오류없이 기록하려 노력합니다. 잘못된 부분이나 지적은 이슈를 통해 지적해주시면 감사하겠습니다.
            </div>
            <div class="hr"></div>
            <div class="mb-3">
                <span class="text-muted fs-7">
                    블로그나 위키, js 기능 등이 도움이 되셨다면 Coffee 한 잔 사주세요! ;)
                </span>
            </div>

            <div>
                <a href="https://donaricano.com/creator/kkn1125" target="_blank"><img class="img-fluid donaricano" src="https://d1u4yishnma8v5.cloudfront.net/custom/-eHBmanJuc2VrczFAbmF2ZXIuY29t" alt="donaricano-btn" style="width: 200px !important;" /></a>
            </div>
        </div>
        `
    }
}