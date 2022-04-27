export default {
    published: true,
    title: 'Comp.02 결과',
    done: true,
    tags: ['comp02'],
    categories: ['Interview'],
    authors: ['kimson'],
    wrote: '2022-04-27 17:18:39',
    toc: true,
    md: true,
    content: [`
# Comp.02 결과

## 느낀 점

약 일주일 내로 결과 내용이 나왔습니다. 결과는 예상했지만 좋지 않습니다. 하지만 지금까지 받았던 결과 중에 매우 힘이 나는 내용이었습니다.

확실히 한 명 한 명 신경을 써서 미팅을 진행하는 이유를 알 것 같기도 합니다. 혼자 준비하는 입장에서 타인이 바라본 평가는 굉장히 귀한데 메일로 저의 이점과 맞지 않은 점을 써주셨습니다.

이점은 그대로 살리면서 맞지 않은 점이 곧 부족한 점으로 이어진다 생각하고 하나씩 고쳐나갈 생각입니다 😃

-----

결과 \`불합격{:.bg-danger}\`
`],
    ref: [
    ],
    template(){
        this.title = this.origin.name;
        
        return `
            ${wikiFilter.all.call(this)}
        `
    }
}