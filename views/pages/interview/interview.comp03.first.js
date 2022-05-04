export default {
    published: true,
    title: 'Comp.03 1차 면접',
    done: true,
    tags: ['comp03'],
    categories: ['Interview'],
    authors: ['kimson'],
    wrote: '2022-05-04 22:19:29',
    toc: true,
    md: true,
    content: [`
# Comp.03 결과

## 분위기

편안한 분위기에서 진행이 되었습니다. 1대1 면접으로 진행되었고 회사 전반에 대한 업무 진행 내용과 입사된다면 어느 부서에서 어느 기술이 필요한지에 대한 내용을 들었습니다.

공고와 조금 다른 직무내용이 섞여있었지만 먼저 실무경험이 절실했던 입장에서는 매우 좋은 기회이지 않을까 하는 생각이 많이 들었습니다. 다행히도 면접관님께서 인상을 좋게 봐주셨고, 질문에 대해 친절하게 답변을 해주셨습니다.

## 질문

프로젝트 관련 질문과 프로토타입에 대한 이해에 대해 질문하셨고, 그 외 체력이나 멘탈관리의 부분 등을 물어보셨습니다.

## 결론

회사를 나오고 10분 가량 후에 연락이 왔습니다. 운이 좋아서인지 면접경험에 대해서는 매우 좋았습니다.

-----

결과 \`합격{:.bg-success}\`
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