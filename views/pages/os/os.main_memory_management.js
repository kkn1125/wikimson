export default {
    published: true,
    title: 'Main Memory Management',
    modified: '2022-03-14 13:11:15',
    done: true,
    tags: ['os', 'main memory management', '메인 메모리 관리'],
    categories: ['cs','Operating System'],
    authors: ['kimson'],
    wrote: '2022-03-10 13:16:37',
    toc: true,
    md: true,
    content: [`
# Main Memory Management

## 메모리 역사

크게 4가지의 종류가 있다.

- Core Memory (50~70년대 중반)
- 진공관 메모리 (50~60년대)
- 트랜지스터 메모리 (70년대)

### Core Memory (50~70년대 중반)

초기 형태의 임의 접근 컴퓨터 메모리이다. 조그마한 자기 세라믹 링, 코어를 사용하며 자기장으로 정보를 저장한다. 50년대에서 70년대 중반까지 *RAM의 일반적인 형태*였으며, *51년 MIT에서 개발*되었다.

코어의 내용을 선택하고 감지한다. 반도체 기술을 기반으로 한 메모리가 도입되면서 코어 메모리는 구식이 되었지만 *일부에서는 여전히 컴퓨터의 메인 메모리를 코어 메모리라고 부른다*고 한다.

${wikiFilter.img('https://upload.wikimedia.org/wikipedia/commons/d/da/KL_CoreMemory.jpg','wiki :: 자기 코어 메모리', 'sample')}

작은 페라이트(Ferrite) 자성체로 된 고리에 케이블이 통과하는 모양의 격자 구조이다.

### 진공관 메모리 (50~60년대)

Williams Tube라고 하는데, 발명가인 Freddie Williams와 Tom Kilburn의 이름을 따서 Williams-Kilburn Tube라고도 한다. 이는 컴퓨터 메모리의 초기 형태로, 최초 랜덤 액세스 디지털 저장 장치였다. 즉, RAM이었다는 이야기이다.

${wikiFilter.img('https://upload.wikimedia.org/wikipedia/commons/c/c0/Williams_tube.agr.jpg','wiki :: Williams-Kilburn Tube','sample')}

여담이지만 독일제 수류탄인 슈틸데그라나테를 닮았다.

### 집적회로 메모리 (SRAM, DRAM)

집적회로는 특정 기능을 수행하는 전기 회로와 반도체 소자(주로 트랜지스터)를 하나의 칩에 모아 구현한 것이다. 58년 텍사스 인스트루먼트에서 일하던 잭 킬비가 만들었고, 이는 노벨 물리학상을 공동 수상하였다고 한다.

정보를 저장하기 위한 집적회로이며, 트랜지스터 및 커패시터로 구성된 회로인 단위 셀을 2차원으로 무수히 배열한 형태로 이루어져 있고, 종류로는 휘발성 메모리인 DRAM과 SRAM, 비휘발성 메모리인 Mask ROM, PROM, EPROM, EEPROM, 플래시 메모리, 옵테인 메모리 등이 있다.

## 언제나 부족한 메모리

1950 ~ 60 년대에는 기계어나 어셈블리어를 사용했고, 이후 높은 수준의 c언어가 등장했고, 점점 *프로그램의 사이즈*가 커지고 *처리하는 데이터*도 많아졌다.

옛날에는 수 십KB라도 많았지만 현재는 MB, GB를 넘어선다. 그래도 사람들은 메모리가 여전히 부족하다고 느낀다. 여담이지만 초등학생 때 사용하던 플로피 디스크를 사용할 때 넉넉하다고 생각했었다.

물론 게임을 받아 저장하거나하면 너무나도 부족했지만 당시에는 그마저도 넉넉했던 기억이 난다.

현재의 시점으로보면 뭐가 크냐 싶겠지만 옛날의 화폐가치를 현재 화폐가치로 환산하는 느낌과 유사하다.

어떻게하면 메모리를 효과적으로 사용할 수 있는지에 대해서는 *메모리 낭비*를 없애는 방법과 *가상 메모리(virtual memory)*가 등장하게 된다.

## 프로그램을 메모리에 올리기

### 메모리 구조

- 주소(Address) + 데이터(Data)

CPU가 몇 번지를 읽겠다고 주소(Address)를 보낸다. 메모리는 해당되는 데이터 혹은 명령을 CPU에게 보내주고 CPU의 연산된 결과를 다시 데이터에 저장하는 원리이다. 이 *데이터 버스*는 \`양방향\`으로 동작한다.

### 프로그램 개발

예를 들어 C언어와 같은 *고수준 언어*(high-level language) 또는 어셈블리언어로 프로그램을 만든다고 가정해보자. 이 언어로 작성한 파일은 *원천 파일, Source file*이라 한다.

${wikiFilter.img('os/mmm01.jpg', 'kimson', 'sample')}

이 Source file을 Compile해서 0101100111...과 같은 기계어로 변환하거나 또는 어셈블 결과를 *목적 파일*(Object file)이라 한다.

\`print\`와 같은 명령은 이미 만들어져 있는 \`library\`에 들어있다. 이 \`library\`와 \`print\`를 연결하는 것을 \`link\`라 하는데 link를 하게 되면 실제 실행파일(Executable file)이 만들어지게 된다.

즉, *high level language*를 *object code*로 변환해주는 프로그램을 *compiler*라 하고, *목적파일*을 *라이브러리*와 연결해주는 프로그램을 *linker*라 한다.

이때 실행파일을 실행하려면 메인메모리로 올려야 하는데, 이때 올리는 것을 *load*라 하고, 올려주는 프로그램을 *loader*라 한다.

- 프로그램 개발 정리
    - 원천파일 (Source File) ==> 고수준 언어 || 어셈블리언어
    - 목적파일 (Object File) ==> 컴파일 또는 어셈블 결과
    - 실행파일 (Executable File) ==> 링크 결과

- 컴파일러, 어셈블러, 링커, 로더
    - Compiler ==> 고수준 언어를 기계어로 변환해주는 프로그램
    - Assembler ==> 어셈블리언어를 어셈블로 변환해주는 프로그램
    - Linker ==> 목적파일과 라이브러리를 연결해주는 프로그램
    - Loader ==> 실행파일을 메인 메모리로 올려주는 프로그램

- 프로그램 실행
    - code + data + stack

### 실행파일을 메모리에 올리기

프로그램을 작성했다면 실행 할 때에 메모리의 몇 번지에 올려야할까? 이러한 고민을 OS가 없다면 개발자가 해야하지만 다행스럽게도 OS가 대신해준다. 위에서 언급한 *Loader*가 해주는 것이다.

프로그램을 짤 때에 몇 번지에 들어가는 것으로 해야할까? 어제는 P@2@에서 실행됐다가 오늘은 P@3@에서 실행된다면?

하지만 이러한 고민을 MMU를 사용해서 어느 프로세스에서 실행되던 상관없다. MMU에는 base와 limit 레지스트가 있는데, 그 외에도 *재배치 레지스터(Relocation register)*가 있다.

만일 main.exe라는 프로그램이 0번지에서 실행되어야 한다고 파일을 작성했을 때, 이 프로그램을 실행한다면 현재 여유 있는 프로세스가 500번지 일 때, MMU의 *relocation*에 500 이라는 값이 주어지고 500을 0번지에 더해서 CPU가 볼 때는 0번지, 실제 메모리에 올라가는 위치는 500번지로 올라가 실행하게 되는 것이다. 이렇게 주소를 변경해 주는 것을 *Address translation*이라 한다.

그래서 몇 번지에 올리는지 중요하지 않고 *relocation* 값을 os가 설정해주면서 프로그램 작성 때의 지정 번지와 관계없이 작동하게 해준다.

위의 과정에서 볼 때 CPU에서 보는 주소와 메모리에서 받는 주소가 서로 달라 주소의 구분이 일어나는데, \`CPU\`에서 읽는 주소를 *논리 주소(Logical Address)*라 하고, \`메모리\`에 오는 주소를 *물리 주소(Physical Address)*라 한다.
`],
    ref: [
        {
            name: '경성대 양희재 교수님 - 8강 주기억장치 관리 개요',
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