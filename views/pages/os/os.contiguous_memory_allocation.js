export default {
    published: true,
    title: 'Contiguous Memory Allocation',
    modified: '2022-03-17 22:11:46',
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

${wikiFilter.img('os/cma01.jpg', 'kimson', 'sample')}

프로세스를 순서대로 적합한 \`hole\`에 할당하다보면 위의 그림과 같이 \`426KB\`의 \`hole\`이 없어 외부 단편화가 일어나는 것을 볼 수 있다.

#### Best-fit 일 때

${wikiFilter.img('os/cma02.jpg', 'kimson', 'sample')}

프로세스를 적합한 곳에 할당하다보면 위의 그림처럼 ~First-fit~과 달리 모두 ~hole~에 할당되는 것을 볼 수 있다.

#### Worst-fit 일 때

${wikiFilter.img('os/cma03.jpg', 'kimson', 'sample')}

프로세스가 가장 적합하지 않은 곳에 할당할 때 위의 그림처럼 외부 단편화가 일어난다.

### 할당 방식 성능 비교

속도 및 메모리 이용률에 대한 비교는 다음과 같다.

1. 속도 ==> ~first-fit~ (:))
    - 이유 -> ~first-fit~의 경우 적합한 것이 있다면 바로 ~hole~에 넣어버리는 반면, 다른 방식에서는 적합한 것을 찾아 할당하기 때문이다.
2. 이용률 ==> ~first-fit~, ~best-fit~ (:))
    - 이유 -> 위의 예제들 처럼 ~hole~에 "못 들어가는 경우는 없는 가" 이다. 여러 경우를 본 결과 ~first-fit~과 ~best-fit~거의 비슷한 결과를 낸다고 한다.

하지만 여전히 ~first-fit~과 ~best-fit~을 사용하더라도 외부 단편화가 없어지지 않는다. 외부 단편화로 인한 메모리 낭비는 ~1/3~수준으로 사용이 불가한 정도라 한다.

#### Compaction

*~hole~들을 모으는 방법*으로 *최적 알고리즘이 없고*, 메모리를 움직여야하기 때문에 *고부담*이다.

### 페이징 (Paging)

다른 방법을 강구하던 중 "연속 메모리 할당"에서의 "연속"하지 않으면 되지 않을까? 하는 생각으로 만들어 졌다.

프로세스를 잘라서 메모리 ~hole~에 넣자는 것이다. 페이징은 일정 단위를 뜻한다. 프로세스를 만일 ~10KB~로 자른다면 ~hole~또한 ~10KB~단위로 자르고 분산하여 ~hole~에 할당한다.

그렇다면 어떻게 분산해서 프로세스가 실행이 되는가?

~CPU~에서 ~MMU~의 ~relocation register~가 주소를 변경해 메모리에 할당한 것처럼 나누어진 프로세스의 개수 만큼 ~relocation register~를 두어 ~CPU~를 속이고, 각각의 프로세스 조각을 ~hole~에 넣는 것이다.

프로세스를 자른 것을 *page*이라 하고, 메모리를 자른 것을 *frame*이라 한다. ~page~과 ~frame~의 크기는 *서로 같은 크기*를 가진다. 즉, 프로세스는 페이지(page)의 집합이고, 메모리는 프레임(frame)의 집합인 것이다.

페이지를 프레임에 할당 할 때 ~MMU~ 내의 재배치 레지스터 값을 바꿈으로서 동작하는데 이 때 ~MMU~는 페이징을 목적으로 할 때 더 이상 ~MMU~라 하지않고, *재배치 레지스터*가 여러 개가 *테이블*처럼 있다고해서 *페이지 테이블(page table)*이라고 한다. 이로써 외부 단편화의 문제가 모두 해결이 된다.

> ~Logical Address~는 *연속(Contiguous)*하고, ~Physical Address~는 *흩어진(Scattered)* 형태를 가진다.

## 주소 변환 (Address Translation) {:.text-danger}

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