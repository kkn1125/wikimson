export default {
    published: true,
    title: 'OSI-7계층',
    modified: '2022-02-26 12:11:32',
    done: false,
    tags: ['OSI-7계층', '통신규약'],
    categories: ['CS'],
    authors: ['kimson'],
    wrote: '2021-11-29 18:56:35',
    toc: true,
    md: true,
    content: [`
# OSI 7계층

## 정의

OSI 7 계층은 네트워크에서 통신이 일어나는 과정을 7단계로 나눈 것을 말한다.

## 계층을 나눈 이유

통신 과정을 단계별로 파악하기 위해서이다. 즉, 문제가 생기면 7계층 중 특정 영역에 이상이 있음을 감지하고 다른 영역을 건들이지 않고 해당 영역만 고칠 수 있기 때문이라는 이야기가 된다. 

${wikiFilter.img('https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fg7KXdyFIQoWy4tnLqSs2%2Fuploads%2FbP8e7q5Q2R3CJkARCudZ%2Fimage.png?alt=media&token=7ea1ac13-49ba-428f-a85c-e1304316ca6f', '<a href="https://learningsolo.com/binary-search-algorithm/">https://learningsolo.com/binary-search-algorithm/</a>', 'gitbook kimson')}

## TCP/IP 프로토콜 스택 4계층

... 작성 중
`],
    ref: [
        // {
        //     name:'',
        //     link:''
        // },
    ],
    template(){
        return `
        ${wikiFilter.all.call(this)}
        `
    }
}