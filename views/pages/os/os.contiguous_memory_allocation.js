export default {
    published: true,
    title: 'Contiguous Memory Allocation',
    modified: '',
    done: false,
    tags: ['os', 'main memory management', '메인 메모리 관리', 'contiguous memory allocation', '연속 메모리 할당'],
    categories: ['cs','Operating System'],
    authors: ['kimson'],
    wrote: '2022-03-14 14:54:06',
    toc: true,
    md: true,
    content: [`
# 연속 메모리 할당 (Contiguous Memory Allocation)

## 다중 프로그래밍 환경

부팅이 되면 초기 메인 메모리 상태는 OS가 적재된 채로 아무 프로세스가 없는 비어 있는 상태이다. 비어있는 것을 \`hole\`이라 하고 전체로 비어있는 상태를 *big single hole*이라 한다.

사용자가 컴퓨터를 사용하고 있다면 여러 프로세스가 생성되고 종료되는 것을 반복하게 되는데, 이후에는 \`hole\` -> \`process\` -> \`hole\` -> \`process\` -> \`...\` 이런 식으로 메모리의 내용이 될텐데 이를 scattered holes라 하며 흩어져있다는 의미이다.

- 부팅 직후 메모리 상태 ==> OS + big single hole(비어있는 메인 메모리)
- 프로세스 생성 & 종료 반복 ==> scattered holes

## 메모리의 단편화 (Memory fragmentation) {:.text-danger}

위의 과정 이후처럼 쪼개어져 있는 것을 *메모리의 단편화(Memory fragmentation)*이라 한다. \`hole\`들이 불연속하게 흩어져 있기 때문에 프로세스 적재가 불가하게 된다.

쉽게 예를 들면, hole들이 각각 \`100kb\`, \`150kb\`, \`200kb\`의 메모리를 가진다고 할 때, 300kb프로그램을 실행하려하면 그에 맞는 메모리가 없기 때문에 적재할 수 없다는 것이다. 합치면 들어갈 수 있는데 이렇게 *불연속*하게 떨어져 있어 *할당이 안되는 것*을 *외부 단편화(external fragmentation)*이라 한다.

어떻게 하면 외부 단편화를 최소화 할 수 있을까?

## 연속 메모리 할당 방식

- First-fit (최초 적합)
    - 메모리의 위나 아래에서부터 순차적으로 찾아서 *제일 먼저* 들어갈 수 있는 곳에 넣는 것을 *최초 적합(First-fit)*이라 한다.
- Best-fit (최적 적합)
    - 메모리 중에서 해당 프로세스의 사이즈와 적합한 hole에 넣는 것을 *최적 적합(Best-fit)*이라 한다.
- Worst-fit (최악 적합)
    - 해당 프로세스의 사이즈보다 큰 것 중에서 제일 안 맞는 hole에 넣는 것을 *최악 적합(Worst-fit)*이라 한다.

### 예제 01

- Hole ==> \`100\` \`500\` \`600\` \`300\` \`200\` KB
- 프로세스 ==> \`212\` \`417\` \`112\` \`426\` KB

#### First-fit 일 때

... 작성 중 ...
`],
    ref: [
        {
            name: '경성대 양희재 교수님 - 8강 연속 메모리 할당',
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