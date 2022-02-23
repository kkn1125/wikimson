export default {
    published: true,
    title: 'Control Unit',
    modified: '',
    done: false,
    tags: ['Control Unit', 'CU'],
    categories: ['CS'],
    authors: ['kimson'],
    wrote: '2022-02-23 18:37:25',
    toc: true,
    md: true,
    content: [`
### Control Unit (CU)

1. CPU 제어 장치 (Control Unit)
    - 명령어,데이터의 입출력과 ALU의 동작 제어
        - 프로그램/코드/명령어를 해석(해독)하고, 
        - 이의 실행을 위한 제어 신호들을 순차적으로 발생시키며,
        - 명령을 읽고 실행하는데 필요한 CPU 내부의 각 장치 간의 데이터 흐름을 제어
2. CPU 제어 장치의 동작
    - 명령어의 해독, 동작 지시, 타이밍 결정
        - 데이터 연산을 위해, 적절한 회로를 동작시키고, (제어 신호의 발생)
        - 어느 장치/레지스터에게 전송할 것인가를 지시 (방향,통로 등을 지시)
        - 구성 요소들의 동작 시간을 결정함 (동작 시간의 결정)
    - 프로그램에서 어떤 명령어가 실행될지를 결정
        - 이때, 프로그램 카운터 라는 특별한 레지스터를 사용
3. CPU 제어 장치의 특징
    - CPU 명령어 수가 많을수록,
        - 제어 장치 내 내부 회로가 더욱 복잡해짐
`],
    ref: [
        {
            name:'정보통신기술용어해설 - Control Unit (제어 장치)',
            link:'http://www.ktword.co.kr/test/view/view.php?nav=2&no=6039&sh=control+unit'
        },
        {
            name:'관련 위키 wikimson>os>이중 모드',
            link:'#operating-system-dual-mode',
            to: '이중 모드는 어떻게 만드나?-3',
        },
    ],
    template(){
        return `
        ${wikiFilter.all.call(this)}
        `
    }
}