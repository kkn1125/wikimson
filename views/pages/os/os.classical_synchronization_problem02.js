export default {
    published: true,
    title: 'classical synchronization problem 02',
    modified: '',
    done: false,
    tags: ['os', 'classical', 'problem', 'synchronization'],
    categories: ['cs','Operating System'],
    authors: ['kimson'],
    wrote: '2022-03-04 16:41:59',
    toc: true,
    md: true,
    content: [`
# 전통적 동기화 (Classical Synchronization Problem)

## Readers-Writers Problem

### 공통된 데이터베이스

하나의 데이터베이스에 접근한다 했을 때, 데이터 조회 할 때 데이터를 읽기만 하는 *Reader Process*와 읽고 바꾸기도 하는 *Writer Process*가 있다.

이때 쉽게 보면 데이터베이스 자체를 \`Critical Section\`으로 두면 되는데, 이는 비효율적이게 된다.

### 효율성 제고

\`Reader Process\`가 만일 데이터베이스에 여러 개 접근한다고 가정 해보자. 읽기만 하기 때문에 내용이 바뀔 일이 없다. 그래서 \`Reader\`는 허용하는 것으로 효율성을 제고할 수 있다.

반대로 Writer가 두 개 이상 들어온다면 \`Mutual exclusion\`이 고려되야 한다. 다르게 볼 때, \`Writer\`가 이미 들어와서 내용을 수정 중인데 \`Reader\`도 들어온다면 어떻게 해야할까.

당연히 허용해도 된다. 왜냐하면 굳이 내용이 변경되는 게 아닌 읽기만 하는데 허용을 안 할 이유가 없다는 것이다. \`Writer\`끼리의 상호배타를 신경써야하는 것이다.

- \`Readers\` ==> read data, never modify it
- \`Writers\` ==> read data and modify it
- \`상호배타\` ==> 한 번에 한 개의 프로세스만 접근 -> 비효율적

### 변종

- The fist R/W Problem (Readers-preference) -> 위에서 말한 \`Reader\` -> \`Writer\` 순서로 항상 Reader에 우선순위를 준다는 것이다.
- The second R/W Problem (Writer-preference) -> 반대로 \`Writer\` -> \`Reader\`순서로 항상 \`Writer\`에 우선순위를 주는 것이다.
- The third R/W Problem -> 우선권을 아무에게도 안 주는 것이다.

> 넓게 다루어지는 영역은 아니다. 그래도 알고는 있어야 한다.

## Dining Philosopher Problem (식사하는 철학자)

### 문제 1

5명의 철학자와 5개의 젓가락이 있다. 식사를 하기 위해 젓가락 두 개가 필요하다. 철학자는 생각 -> 식사 -> 생각 -> 식사 ... 패턴으로 밥을 먹는다.

${wikiFilter.img('os/phil01.jpg', 'kimson', 'sample')}

위 내용을 토대로 코드로 구현하고자 한다. 의사코드로 보면 아래와 같다.

1. 0번 철학자가 0번, 1번 젓가락을 든다.
2. 0번 철학자가 밥을 먹는다.
3. 0번 철학자가 0번, 1번 젓가락을 놓는다.
4. 0번 철학자는 생각한다.
5. 1번 철학자가 1번, 2번 젓가락을 든다.
6. 1번 철학자가 밥을 먹는다.
7. 1번 철학자가 1번, 2번 젓가락을 놓는다.
8. 1번 철학자가 생각한다.
9. ...

이제 의사코드를 바탕으로 Java코드로 구현하면 아래와 같다.

\`\`\`java
// ... 작성 중
\`\`\`

... 작성 중 ...
`],
    ref: [
        {
            name: '경성대 양희재 교수님 - 4강 기타 전통적 동기화 문제',
            link: 'http://www.kocw.net/home/cview.do?mty=p&kemId=978503',
        },
    ],
    template(){
        this.title = this.origin.name;
        return `
        ${wikiFilter.all.call(this)}
        `
    }
}