export default {
    published: true,
    title: 'Main Memory Management',
    modified: '',
    done: false,
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

... 작성 중 ...
`],
    ref: [
        {
            name: '경성대 양희재 교수님 - 7강 정리와 복습(1)',
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