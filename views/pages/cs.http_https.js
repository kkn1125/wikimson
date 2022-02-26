export default {
    published: true,
    title: 'Http와 Https',
    modified: '2022-02-26 12:11:32',
    done: true,
    tags: ['https', 'http'],
    categories: ['CS'],
    authors: ['kimson'],
    wrote: '2021-11-29 20:06:54',
    toc: true,
    md: true,
    content: [`
# Http와 Https

## 정의

|구분|설명|
|---|---|
|HTTP|TCP -> HTTP|
|HTTPS|TCP -> SSL -> HTTP|

## *SSL(Secure Socket Layer)*

*SSL 프로토콜*은 정보를 암호화시키고 이때 *공개 키*와 *개인 키* 두 가지를 이용한다. \`HTTPS\`는 인터넷상에서 정보를 암호화하기 위해 SSL 프로토콜을 이용해 데이터를 전송하고 있다는 것을 말한다.  
즉, 문서 전송시 암호화 처리 유무에 따라 \`HTTP\`와 \`HTTPS\`로 나누어지는 것이며, 모든 사이트가 \`HTTPS\`로 하지 않는 이유는, 암호화 과정으로 인한 속도 저하가 발생하기 때문이다.
`,
    ],
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
};