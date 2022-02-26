export default {
    published: true,
    title: 'legacy-code',
    modified: '2022-02-26 12:11:32',
    done: false,
    tags: ['legacy-code', '레거시 코드'],
    categories: ['CS'],
    authors: ['kimson'],
    wrote: '2021-12-14 12:12:22',
    toc: true,
    md: true,
    content:[`
# 레거시 코드

## 정의

> 테스트가 불가능하거나 기능이 정상적이지 않거나, 난해한 코드를 의미한다.

1. 다른 사람으로부터 상속 받은 코드
2. 이전 버전의 소프트웨어에서 상속된 코드
3. 테스트 없는 코드
4. 개발자가 변경하기 두려워하는 코드

\`코드의 수정이 어렵다\` -> 단위 테스트가 되어 있지 않기 때문에 기능을 수정하면 어디까지 영향이 미칠지 예상하기 어렵다(4번에 해당)  
\`코드 이해가 어렵다\` -> 코드 리팩터링이 되어 있지 않다. 기능 추가 개발이 되어야 하는 상황인데 땜빵코드로 스파게티 코드를 짜놓은 경우와 그 외 불필요한 기능이나 추가로 예외상황이 생기는 경우, 사용만 안하고 남기는 경우 등이 있다.  
\`코드의 결합도가 높다.\` -> 코드 흐름이 파악하기 어려운 형태로 작업되어 있는 경우와 코드 결합도가 너무 높고 종속적인 경우

## 레거시 코드 -> 좋은 코드

> 레거시 코드 조건에서 벗어나기 위해서 기본적으로 코드를 제대로 파악해야한다.

- 변경 지점 찾기
    - 변경 지점을 알기 위해 프로그램 전반의 아키텍처를 봐야한다. 노트/스케치/스크래치 리팩터링 기법과 같은 방법을 통해 변경 지점을 식별한다.
- 테스트 지점 찾기
    - 리팩터링이 필요한 부분을 찾았다면 어느 부분에 테스트 루틴을 작성할 지 결정해야한다. 가장 간단한 판단 기준으로는 모든 메서드에 대해 테스트를 수행하는 것, 각 메서드들이 의존관계를 이루는 묶음끼리도 테스트가 필요하며, 이를 위해 의존 관계를 최소화시키는 것이 중요하다.
- 의존관계 깨기
    - 코드에서 의존관계는 타 클래스, 인터페이스 등에 방향성을 가지고 의지하는 코드를 의미한다. 예를 들어 Apple클래스와 Fruit인터페이스가 있고, Apple클래스에서 Fruit인터페이스의 메서드를 사용 할 때 Fruit인터페이스의 메서드 일부가 변경되면 Apple클래스에 영향을 미친다. 이를 의존관계에 있다고 말한다.
    - 의존관계는 코드 유지 보수성을 떨어뜨리기 때문에 의존 관계를 최소화하는 것이 중요하다고 하는데요. 상황별 의존관계 해소 방법은 여러가지고 있고 공통적으로 나오는 이야기는 캡슐화에 대한 이야기가 많았다. 관련 내용을 맨 하단 "함께보면 좋은 자료"를 참고하자.

## *테스트 루틴 작성*

테스트 루틴 작성 시 코드의 족당을 이해하는데 필요하다고 느끼는 만큼의 사례를 작성해야한다고 한다. 기능 추출이나 이동하려할 때 사례별로 동작 존재 여부와 연결을 검증할 수 있는 테스트 루틴을 작성합니다. 작업할 코드가 수행되는지, 연결이 되어있는지 검증 한 후 변환을 수행한다.

## *리팩토링*

크게 보면 덩치가 큰 메서드를 작은 단위로 쪼개는 작업이다. 작은 단위로 쪼개어지면 재사용성을 높일 수 있고 다른 영역에 있는 로직과 중복을 제거할 수 있다.
`
    ],
    ref: [
        {
            name:'juunini님 velog - 레거시코드(Legacy Code)',
            link:'https://velog.io/@juunini/%EB%A0%88%EA%B1%B0%EC%8B%9C-%EC%BD%94%EB%93%9CLegacy-code'
        },
        {
            name:'테샤르 테샤르님 블로그 - 레거시코드(Legacy Code)',
            link:'https://drehzr.tistory.com/56'
        },
        {
            name:'개발자 휴님 블로그 - 의존성 주입,Dependency Injection에 관한 고찰🔎 With OOP',
            link:'https://hue-dev.site/springframework/2021/05/03/Dependency-Injection-%EC%9D%B4-%EB%AD%90%EC%97%90%EC%9A%94.html'
        },
        {
            name:'khsb2012님 velog - Java 객체 지향 - 의존관계와 캡슐화',
            link:'https://velog.io/@khsb2012/%EC%9E%90%EB%B0%94-%EA%B0%9D%EC%B2%B4-%EC%A7%80%ED%96%A5'
        },
        {
            name:'자바니또님 블로그 - [ SPRING ] 의존관계 주입(Dependency Injection) (1)',
            link:'https://brandpark.github.io/spring/2020/12/19/spring_di_1.html'
        },
        {
            name:'dodeoni님 깃북 - 의존 관계',
            link:'https://dodeon.gitbook.io/study/toby-spring/1-object-dependency/dependency-injection'
        },
        {
            name:'우아한테크코스 - 의존관계 주입(Dependency Injection) 쉽게 이해하기',
            link:'https://tecoble.techcourse.co.kr/post/2021-04-27-dependency-injection/'
        },
    ],
    template(){
        return `
        ${wikiFilter.all.call(this)}
        `
    }
};