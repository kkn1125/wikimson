export default {
    published: true,
    title: 'Contiguous Memory Allocation',
    modified: '2022-04-18 10:49:53',
    done: true,
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

${wikiFilter.img('os/cma03-2.jpg', 'kimson', 'sample')}

프로세스를 잘라서 메모리 ~hole~에 넣자는 것이다. 페이징은 일정 단위를 뜻한다. 프로세스를 만일 ~10KB~로 자른다면 ~hole~또한 ~10KB~단위로 자르고 분산하여 ~hole~에 할당한다.

그렇다면 어떻게 분산해서 프로세스가 실행이 되는가?

~CPU~에서 ~MMU~의 ~relocation register~가 주소를 변경해 메모리에 할당한 것처럼, 나누어진 프로세스의 개수 만큼 ~relocation register~를 두어 ~CPU~를 속이고, 각각의 프로세스 조각을 ~hole~에 넣는 것이다.

프로세스를 자른 것을 *page*라 하고, 메모리를 자른 것을 *frame*이라 한다. ~page~와 ~frame~의 크기는 *서로 같은 크기*를 가진다. 즉, 프로세스는 *페이지(page)의 집합*이고, 메모리는 *프레임(frame)의 집합*인 것이다.

페이지를 프레임에 할당 할 때 ~MMU~ 내의 재배치 레지스터(relocation register) 값을 바꿈으로서 동작하는데, 이 때 ~MMU~는 페이징을 목적으로 할 때 ~MMU~라 하지않고, *재배치 레지스터*가 여러 개가 *테이블*처럼 있다고해서 *페이지 테이블(page table)*이라고 한다.

${wikiFilter.img('os/cma03-3.jpg', 'kimson', 'sample')}

페이지 테이블을 통해 논리 주소를 물리주소로 변환되고, ~hole~이 어디에 있던지 프로세스 조각이 흩어져 할당되기 때문에 이로써 ~hole~이 흩어져 사용하지 못하던 외부 단편화의 문제가 모두 해결이 된다.

> ~Logical Address~는 *연속(Contiguous)*하고, ~Physical Address~는 *흩어진(Scattered)* 형태를 가진다.

## 주소 변환 (Address Translation) {:.text-danger}

### 논리 주소 (Logical Address) {:.text-danger}

~CPU~가 내는 주소를 말하며, 2진수로 표현한다. 전체를 m비트라 할 때 하위 n비트는 *오프셋(offset)* 또는 *변위(displacement)* 이다. 이때 *변위는 항상 고정된 값을 가지며 변하지 않는다*. 상위 m-n비트는 *페이지의 번호* 이다. 그림으로 보면 아래와 같다.

${wikiFilter.img('os/cma04.jpg','kimson','sample')}

전체 주소 중에 n을 몇 비트로 할 것인지는 페이지의 사이즈를 얼마로 하는 가에 달려있다.

${wikiFilter.toRef('operating-system-contiguous-memory-allocation','페이징 (Paging)-10','페이징')}에서 언급할 때는 ~10KB~라고 했지만 이는 모든 컴퓨터마다 ~10KB~가 아니고 컴퓨터마다 다르다.

간단하게 한 페이지에 ~16Byte~라 가정하자. 즉, 프로세스를 나눌 때 16Byte로 나눈다는 이야기이다.

16Byte는 2의 4제곱이고 n(displacement)의 값은 ~4bit~가 되는 것이다. 다른 예로 한 페이지의 사이즈가 ~1KB~라 한다면 ~1024Byte~이고 2의 10제곱이기 때문에 n은 ~10bit~가 된다.

> *페이지 사이즈가 2의 n제곱*이라면, *displacement는 n*이 된다.

### 주소 변환 : 논리 주소 -> 물리 주소 {:.text-danger}

메인 메모리는 여러 개의 ~frame~으로 이루어져있고, ~frame~의 크기는 페이지의 크기와 동일하다. 페이지의 크기가 ~8KB~이면 ~frame~하나의 크기도 ~8KB~이다. 페이징에서 사용하는 ~MMU~를 ~page table~이라 부르는데, 해당 *프로세스가 몇 개의 페이지를 사용하는 가*에 따라 *page table의 entry갯수가 결정*된다. 즉, 프로세스의 페이지가 ~1KB~이고, 프로세스 크기가 ~8KB~라면 8개의 *relocation register*가 들어가는 ~page table~이 필요하다.

- page table entry 개수 == page 개수

만일 ~CPU~가 50번지의 주소를 냈을 때 메인 메모리의 몇 번지에 해당될까?

한 페이지의 크기를 ~16Byte~라고 가정한다. 50번지를 먼저 2진수로 나타낸다. 2로 나누어 계산하면 ~bn110010~이 된다. 여기서 하위의 4bit를 묶는다. ~bn0010~이 ~displacement~가 된다. ~11~이 ~Page number~가 된다.

따라서 50번지는 몇 번째의 페이지냐하면 ~11~번, 즉, 10진수로 변환했을 때 3번 페이지가 된다.

${wikiFilter.img('os/cma06.jpg','kimson','sample')}

이렇게 ~CPU~가 낸 주소가 실제로는 메인 메모리의 다른 곳에 해당되기 때문에 ~CPU~는 프로세스를 연속된 메모리 공간에 위치한다고 보고, 실제로는 흩어져서 프로세스가 메모리에 올라가게 되는 것이다.

위 그림에서 page table에 할당되는 숫자를 임의 값으로 적었는데 이는 아래와 같은 원리로 할당이 된다.

${wikiFilter.img('os/cma07.jpg','kimson','sample')}

빨간 원에 있는 숫자 순서대로 프로세스 0번의 a는 메인 메모리의 1q번에 있으므로 page table의 frame number는 0번에 1이 된다. 그렇게 쭉 나열해보면 1, 5, 3, 0이 할당되고, ~CPU~의 입장에서는 인덱스번호 순으로 순차적으로 프로세스가 연속된 메모리 공간에 위치한다고 본다.

#### 예제

{%table%}
$예제 1:

> Page size = 4 bytes   
> Page Table -> 5 6 1 2   
> 논리주소 13 번지는 물리주소의 몇 번지인가?

${wikiFilter.img('os/cma08.jpg','kimson','sample')}

논리주소 13을 내었을 때 페이지의 크기가 4바이트가 2의 2제곱이므로 *d(displacement) 값은 2*가 된다. *13을 이진수로 변환하면 bn1101*이고 이때 ~d~가 2이므로 ~01~이 ~d~가 된다.

그러면 페이지 넘버는 ~11~이 되고 십진수로 변환하면 ~3~이므로 page table의 3번 인덱스에 있는 ~frame~번호는 ~2~가 된다.

그러면 ~frame~번호 ~2~를 *이진수로 변환*하여 ~10~을 얻고, ~d~는 원래 값에서 *변하지 않으므로* ~bn1001~이라는 물리주소를 가지게 된다.

[10 === 2]번째 프레임에서 [01 === 1]만큼 떨어진 위치가 된다. 이진수를 뜯어 위치를 찾을 수도 있고, 위의 그림에 메인메모리 우측의 빨간 글씨와 같이 한 프레임이 4bytes간격이므로 0, 4, 8, 16 ... 번지일 때 2번 프레임의 1/4지점인 9번지를 동일하게 찾을 수도 있다.
:$

$예제 2:

> Page size = 1KB   
> Page Table -> 1 2 5 4 8 3 0 6   
> 논리주소 3000 번지는 물리주소의 몇 번지인가?   
> 물리주소 0x1A53 번지는 논리주소 몇 번지인가?

논리주소 3000번지는 물리주소의 몇 번지인가 부터 보자면 아래와 같다.

${wikiFilter.img('os/cma09.jpg','kimson','sample')}

물리주소 16진수 0x1A53은 논리주소 몇 번지인지는 아래와 같다. 논리주소로 물리주소를 구할때와 반대로 풀어주면 된다.

${wikiFilter.img('os/cma10.jpg','kimson','sample')}
:$
{%endTable%}

## 내부 단편화

한 프로세스의 크기가 ~15 bytes~라 할 때 필요한 페이지는 4개가 필요하다. 나열해보면 아래와 같을 것이다.

- ~4~ ~4~ ~4~ ~3~

전체가 15이기 때문에 마지막 페이지는 다 못 채우고 ~1 bytes~가 남게 된다. 이렇게 본인도, 다른 프로세스도 못 쓰게 되는데 남는 공간은 곧 메모리 낭비를 야기한다. 이를 *내부 단편화*라 한다.

최대 내부 단편화 크기는 ~페이지 크기~ - ~1 bytes~로 산정한다. 만일 ~1KB(1024 bytes)~의 프로세스가 있을 때 내부 단편화로 인한 메모리 낭비는 얼마일까?

최대 ~1023 bytes~가 된다. 이는 영향력이 미미하기 때문에 페이징을 사용할 때 내부 단편화가 있더라도 큰 문제가 없다.

## 페이지 테이블

페이지 테이블을 만드는 방법은 몇 가지 있다. 실질적으로 ~MMU~를 ~CPU~내에 기억장치인 *CPU Register*로 만들수도 있고, 또는 메인 메모리 안에 넣을 수도 있다.

**CPU Register로 만든다면?{:.fw-bold}**

- 장점
    - 주소변환이 빠르다.
- 단점
    - \`page table\`의 \`entry\`가 실제로는 \`수백\` ~ \`수천개\`인데 \`CPU\`에 들어가기란 무리가 있다.
    - 현실적으로 적용이 어렵다.

**메인메모리로 만든다면?{:.fw-bold}**

- 장점
    - 주소변환이 빠르다.
- 단점
    - 주소변환이 느리다.
    - 현실적으로 적용이 어렵다.

** 캐시메모리로 만든다면?{:.fw-bold}**

메인메모리는 \`DRAM(동적 램)\`으로 만들고, 캐시메모리의 경우는 \`SRAM(정적 램)\`으로 만들게 된다. 메인 메모리의 내용을 빠르게 엑세스하는 것이 목적이기 때문에 캐시라고 하지 않고, 주소변환을 목적으로 하기 때문에 \`SRAM\`을 사용한 이것을 *${wikiFilter.toRef('cs-tlb','정의-1','TLB(Translation Lookaside Buffer)')}*라 한다.

CPU와 메모리의 중간 성격을 가지게 된다.

1. \`CPU\`보다 느리다. -> 반면 \`CPU Register\`보다 많은 개수를 변환 할 수 있다.
2. \`메모리\`보다 빠르다. -> 반면 \`메모리\`보다 변환하는 개수가 적다.

테이블 엔트리 개수, 변환 속도로 위의 세가지 방식을 비교할 수 있다.

### 연습

TLB 사용 시 *유효 메모리 접근 시간*(Effective Memory Access Time)

- Tm = 100ns, Tb = 20ns, hit ratio = 80%

Et = hit(Tb + Tm) + (1-h)(Tb + Tm + Tm) = 140ns

- ns ==> 나노 초
- Tm ==> 메모리를 읽는데 걸리는 시간
- Tb ==> Translation Look aside Buffer
- hit ==> \`CPU\`가 값을 가져오려 할 때 메모리까지 가지 않고, \`cache\`에 해당하는 값이 있다면 \`cache\`에서 값을 가져올 수 있다. 이를 \`hit\`이라 한다.
- 1-h ==> \`hit\` 되지 않는 확률 ?== miss

TLB를 사용했을 때 80% hit이고 20% miss 라면, 140ns가 걸리는 결과가 나온다. 원래는 100ns의 메모리인데 시간이 140ns이기때문에 약 40%느려진 것이다.

외부단편화 로스를 줄이기 위해 써야하고, 실제 현실에서는 \`hit ratio\`는 예제의 80%보다 훨씬 높은 95%이상이다. 그래서 예제의 결과보다는 훨씬 줄어들 것이다.

## 보호와 공유

- 보호 (Protection): 해킹 등 방지
    - 모든 주소는 페이지 테이블을 경유한다.
    - 페이지 테이블 엔트리마다 r, w, x 비트를 둔다.
        - r ==> read
        - w ==> write
        - x ==> execute

페이징에서의 보호는 다음과 같이 이루어진다. 각 \`page table entry\`마다 frame number외에도 위 3가지를 추가한다. \`CPU\`가 내는 \`page\`에 대해서 *읽고, 쓰고, 실행*할 수 있게 하는 것이다. r, w, x 가 각각 1, 0, 0값을 가질 때, *읽을 수는 있지만 변경할 수는 없다*. 만일 *변경하고자 한다면* 잘못 시도한 것이기 때문에 *CPU에 interrpt*가 가고, *잘못 요청된 프로세스를 제종료* 시킨다.

- 공유 (Sharing): 메모리 낭비 방지
    - reentarant code ==> 재진입 가능한 코드
    - non-self-modifying code ==> 스스로 코드가 실행되면서 그 내용을 바꾸지 않는 코드

하나의 프로그램이 실행될 때는 *code, data, stack이 필요*하다. 같은 프로그램을 쓰는 복수 개의 프로세스가 있다면, code는 공유가 가능하다. 단, *pure code*인 경우를 말한다.

**공유 가능한 코드의 조건{:.fw-bold}**

1. *non-self-modifying code* : 스스로 코드가 실행되면서 그 내용을 바꾸지 않는 코드
2. *reentarant code*가 아닌 코드 : 재진입 가능한 코드

프로세스의 페이지 테이블 코드 영역이 같은 곳을 가리키게 하고, data와 stack이 컨텍스트 스위칭되어 각 프로그램을 실행할 때 *코드를 공유*하게 하므로써 *메모리의 낭비를 방지*하게 된다.
`],
    ref: [
        {
            name: '경성대 양희재 교수님 - 8강 연속 메모리 할당',
            link: 'http://www.kocw.net/home/cview.do?mty=p&kemId=978503',
        },
        {
            name: '경성대 양희재 교수님 - 9강 페이징',
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