export default {
    published: true,
    title: 'interrupt',
    modified: '',
    done: false,
    tags: ['Interrupt', '인터럽트'],
    categories: ['CS'],
    authors: ['kimson'],
    wrote: '2022-02-22 18:15:16',
    toc: true,
    md: true,
    content: [`
### Interrupt Service Routine (ISR)

###### 정의

인터럽트는 하드웨어적으로 접수되어 실행되는 것이 일반적이다. \`CPU\`가 특정 기능을 수행하는 도중에 급하게 다른 일을 처리하고자 할 때 사용할 수 있는 기능이다.

대부분 컴퓨터는 한 개의 \`CPU\`를 사용하므로 한 순간에 하나의 일 밖에 처리할 수 없기 때문에, 어떤 일을 처리하는 도중에 우선 순위가 급한 일의 처리가 요구될 때 대처 가능한 방안이 필요하다.

예로는 키보드의 키를 하나 누르면, 눌려진 키 코드 값이 키보드 버퍼에 입력된 후 CPU에 인터럽트가 걸린다. 이때 현재 처리하던 작업에 대한 정보를 수집하여 저장, ${wikiFilter.toRef('cs-isr', '정의-1', '인터럽트 서비스 루틴')}을 수행한다.

이 경우 키보드 버퍼에 있는 키 코드 값을 가져가는 일을 한다.

이렇게 인터럽트 처리가 끝나면 다시 이전에 처리 중이던 작업으로 돌아가 작업을 진행한다.

###### 과정

1. 기존의 작업을 처리하던 도중, 인터럽트가 발생
2. 현재 컴퓨터가 *처리하는 일을 중지*
3. 현재 컴퓨터의 *상태*(CPU 내부 레지스터, 메인 메모리 내용 등) *저장*
4. 해당 인터럽트 처리를 위해 *인터럽트 서비스 루틴*(ISR)을 *처리*
5. 인터럽트 *처리 이후* 저장되었던 *이전 작업의 상태를 복구*
6. 이전 *작업 수행 재개*

`],
    ref: [
        {
            name:'namuwiki - 인터럽트',
            link:'https://namu.wiki/w/%EC%9D%B8%ED%84%B0%EB%9F%BD%ED%8A%B8'
        },
        {
            name:'wiki - 인터럽트',
            link:'https://ko.wikipedia.org/wiki/%EC%9D%B8%ED%84%B0%EB%9F%BD%ED%8A%B8#%EC%9D%B8%ED%84%B0%EB%9F%BD%ED%8A%B8_%EC%B2%98%EB%A6%AC%EC%A0%88%EC%B0%A8'
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