export default {
    published: true,
    title: 'interrupt service routine',
    modified: '',
    done: true,
    tags: ['isr', 'interrupt service routine', 'Interrupt Handler', '인터럽트 서비스 루틴'],
    categories: ['CS'],
    authors: ['kimson'],
    wrote: '2022-02-22 18:15:20',
    toc: true,
    md: true,
    content: [`
### Interrupt Service Routine (ISR)

###### 정의

인터럽트 서비스 루틴은 *인터럽트 핸들러(Interrupt Handler)*라고도 한다.

인터럽트 접수에 의해 발생되는 인터럽트에 대응하여 특정 기능을 처리하는 기계어 코드 루틴이다.

운영 시스템이나 임베디드에서 장치 드라이버에서 요구하는 일을 처리하는 기능적 코드 집합이며, 콜백 루틴 방식으로 처리된다.

인터럽트 원인에 따라 각각 존재하고, 인터럽트 핸들러가 작업을 마치는 데 걸리는 시간도 다양하다.

운영체제를 사용하는 컴퓨터 시스템에서는 커널과 밀접한 관계를 갖는데, 커널에 존재하고 응용 프로그램에는 넣지 않는다.

###### 예외 대응 종류

1. 입출력 장치 인터럽트 종류
    - 하드웨어 RESET
    - 정해진 메모리 밖의 엑세스
    - 0으로 나누기
    - 소프트웨어 인터럽트
2. 컴퓨터 시스템의 기능 장치 인터럽트 종류
    - 타이머
    - UART
    - SPI, I2C
    - USB
    - 이더넷
    - 기타 장치

`],
    ref: [
        {
            name:'wiki - 인터럽트 핸들러',
            link:'https://ko.wikipedia.org/wiki/%EC%9D%B8%ED%84%B0%EB%9F%BD%ED%8A%B8_%ED%95%B8%EB%93%A4%EB%9F%AC'
        },
        {
            name:'관련 위키 wikimson>os>인터럽트 기반 시스템',
            link:'#operating-system-interrupt-based-system'
        },
    ],
    template(){
        return `
        ${wikiFilter.all.call(this)}
        `
    }
}