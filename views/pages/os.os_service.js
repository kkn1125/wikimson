export default {
    published: true,
    title: '운영체제 서비스',
    modified: '',
    done: false,
    tags: ['os', 'Operating System Service', 'OS Service', '운영체제 서비스'],
    categories: ['cs','Operating System'],
    authors: ['kimson'],
    wrote: '2022-02-24 20:51:05',
    toc: true,
    md: true,
    content: [
`
### 운영체제 서비스

###### 운영체제가 하는 일은 무엇인가?

${wikiFilter.img('os/os-service01.jpg', 'kimson', 'sample')}

나라의 정부와 같다. 컴퓨터에는 하드웨어라는 자원이 있다. 제일 중요한 자원이 CPU이고, 그 다음이 메인메모리, 프린터, 키보드, 마우스, 디스크 등등이 있다.

이러한 자원들을 \`Application\`이 사용하는데 \`Application\`에는 \`hwp\`, \`game\`, \`DB\` 등이 있는데, 이 *모든 Application Program들은 자원을 사용*한다.

그 자원을 효율적으로 나누어 주는 것이 \`Operating System (OS)\`이다.

### Process Management

정부와 마찬가지로 자원을 나누어 주는데, 하는 일에 따라 관리 영역이 존재한다.

그 중 \`Process Management\`는 무슨 일을 할까?

들어가기에 앞서 *Process*와 *Program*의 개념을 구분하고 가자.

1. Process -> 하드디스크에서 메인 메모리로 올라 왔을 때의 실행 중인 상태의 프로그램 (*program in execution*)
2. Program -> 하드디스크 내에 있는 실행 파일

주요 기능은 아래와 같다.

- 프로세스 생성, 소멸 (creation, deletion)
- 프로세스 활동 일시 중지, 활동 재개 (suspend, resume)
- 프로세스 간 통신 (interprocess communication : IPC)
- 프로세스 간 동기화 (synchronization)
- 교착상태 처리 (deadlock handling)

### Main memory management

주 기억장치 또는 컴퓨터 메모리는 컴퓨터에서 수치, 명령, 자료 등을 기억하는 컴퓨터 하드웨어 장치를 말한다.

###### 주요 기능

- 프로세스에게 메모리를 할당(allocation)한다.
- 메모리의 어느 부분이 어느 프로세스에게 할당되었는가 추적과 감시를 한다.
- 프로세스가 종료되면 메모리를 다시 회수(deallocation)해서 메모리를 효과적으로 사용하도록 한다.
- 주 기억장치는 보조 기억장치에 비해 용량이 작다. 그래서 필요한 경우 가상 메모리라는 메모리 관리 기법을 사용한다.

> 가상메모리 : 컴퓨터 메모리의 내용은 보조 기억장치로 전송할 수 있는데, 이를 *가상 메모리*라 불리는 *메모리 관리 기법*을 통해 가능하며, 물리적 *실제 메모리보다 큰 용량*을 갖도록 한다.

### File management

${wikiFilter.img('os/os-service02.jpg', 'kimson', 'sample', wikiFilter.focus('img-1'))}

${wikiFilter.toRef('cs-hard-disk', '정의-1', '하드디스크')}는 크게 Flatter(플래터), Spindle(스핀들), Actuator(액추에이터)로 구성된다.

플래터(원반)는 섹터와 트랙이 있는데 학교 운동장 트랙을 떠올리면 쉽다. 이 트랙 내에 간격을 두고 섹터가 있는데 이 섹터에 전기적 신호로 데이터를 쓰고 지워, *파일이라는 개념*으로 보이도록 한다.

###### 주요 기능

- 파일 생성, 삭제 (file creation & deletion)
- 디렉토리(directory)(?== 폴더)의 생성, 삭제
- 파일에 대한 기본동작 지원
    - open
    - close
    - read
    - write
    - create
    - delete
- Track/Sector <-> File 간의 매핑(Mapping)
- 백업(Backup), 복원

### Secondary storage management (보조기억장치 관리)

데스크탑의 하드디스크와 스마트폰의 플래시 메모리 등을 관리를 한다.

###### 주요 기능

> 파일 관리에서 언급한 ${wikiFilter.sup('img-1', '섹터')}의 묶음을 블록이라 한다. 만일 하드디스크를 포맷했을 때 처음에는 비어있는 블록 상태인데 이 빈 공간을 관리한다.

- 빈 공간 관리 (Free space management)
- 저장공간 할당 (Storage allocation)
- 디스크 스케쥴링 (Disk scheduling)

### I/O device management (입출력 장치 관리)

컴퓨터의 여러 입출력 장치, USB나 웹캠, 사운드카드 등의 장치를 사용하기 위해 장치 드라이버가 필요한데, 이 장치 드라이버도 OS에 포함이 된다.

###### 주요 기능

- 장치 드라이브 (Device drivers)
- 입출력 장치 성능 향상
    - \`buffering\` -> 입출력 장치에서 읽은 데이터를 메모리로 들고 오는 것, 한 번 들고오면 빨리 다시 읽을 수 있다. 백과에서는 *정보를 일시적으로 저장*하여 *처리 속도의 차이를 흡수*하는 방법이라 한다.
    - \`caching\` -> buffering과 유사. 원본 데이터 복사본을 저장하는 프로세서에 구현된 메모리. 최근 액세스한 디스크 블록을 캐시 메모리에 저장해야 사용자가 동일 디스크 블록에 다시 액세스 할 때 네트워크 트래픽을 피하면서 캐시 메모리를 통해 로컬로 처리 가능하다.
    - \`spooling\` -> 메모리 대신에 하드디스크를 중간(?==보조) 매체로 사용하는 것.
        - 예를 들어, \`프린터\`로 글자를 찍을 때, \`프린터\`가 다 찍을 때까지 \`CPU\`가 기다리면 너무 늦기 때문에, \`프린터\`보다 빠르고 \`CPU\`보다 느린 *디스크에 저장*한다. 그 후 내용을 천천히 프린터에 보낸다. 이렇게 되면 \`CPU\`는 그 사이 다른 작업이 가능해진다.

### System Calls (시스템 콜)

> \`Application Program\`이 *OS가 제공하는 여러 서비스*를 받기 위해 *호출하는 것*이다.

프로그램이 돌다보면 \`OS\`의 관리가 필요할 때가 있다. 이때 프로그램이 실행되다가 OS로 Jump하여 호출을 하는데 이것이 시스템 콜이다.

###### 주요 시스템 콜

- Process ==> \`end{:title="종료"}\` \`abort{:title="강제종료"}\` \`load{:title="프로그램 \\-> 메인메모리로 가져옴"}\` \`execute{:title="실행"}\` \`create{:title="프로세스 생성"}\` \`terminate{:title="종료"}\` \`get/set attributes{:title="메모리 얼마나 사용하는지 아이디는 무엇인지 등"}\` \`wait\`  \`event\` \`signal event\`
- Memory ==> \`allocate{:title="메모리 할당"}\` \`free{:title="메모리 회수"}\`
- File ==> \`create{:title="생성"}\` \`delete{:title="삭제"}\` \`open{:title="열기"}\` \`close{:title="닫기"}\` \`read{:title="읽기"}\` \`write{:title="쓰기"}\` \`get/set attributes\`
- Device ==> \`request\` \`release\` \`read\` \`write\` \`get/set attributes\` \`attach/detache devices\`
- Information ==> \`get/set time\` \`get/set system data\`
- Communication ==> \`socket\` \`send\` \`receive\`
`,
    ],
    ref: [
        {
            name: '마무님 - 하드디스크 구조 매우 쉽게!',
            link: 'https://mamu2830.blogspot.com/2019/10/blog-post_14.html',
        },
        {
            name: '경성대 양희재 교수님 - 3강 운영체제 서비스',
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

// th: 핵심|설명@
// tb: !Model|데이터를 가지고 로직을 처리한다. 데이터베이스와 대응 될 수 있다\\
// !View|요청된 페이지를 데이터 처리의 과정을 거쳐 브라우저에 나타낼 요소들을 출력해주는 역할을 한다.\\
// !Controller|사용자의 요청을 받아 요청에 맞는 Model의 로직을 실행하고 데이터의 흐름을 제어한다.@
// :end