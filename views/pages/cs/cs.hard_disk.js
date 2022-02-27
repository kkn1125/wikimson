export default {
    published: true,
    title: 'Hark Disk',
    modified: '2022-02-26 12:11:32',
    done: false,
    tags: ['hard disk','하드디스크', '보조기억장치'],
    categories: ['CS'],
    authors: ['kimson'],
    wrote: '2022-02-24 19:39:54',
    toc: true,
    md: true,
    content: [`
# Hark Disk (보조기억장치)

## 정의

${wikiFilter.img('os/os-service02.jpg', 'kimson', 'sample')}

액추에이터는 헤드(Head)와 암(Arm)을 가진다.

작은 섹터(Sector) 단위부터 보자면, 섹터는 *활동이 있는 지역이 나눠진 것 중 하나*이다. 디스크 최소 단위로 보통 512bite(0.5KB) 정도이다.

그래서 하드 디스크는 저장할 데이터를 *섹터 단위*로 나눈 후 순차적으로 *같은 반지름의 섹터들에 저장*한다. 즉, 현재 위치에서 가장 가까운 곳부터 저장한다.

이 섹터들이 같은 띠 모양을 하고 있는데, 이를 트랙(Track)이라 한다. 이러한 트랙들이 플래터에 있고, 플래터는 트랙의 섹터에 데이터를 저장하게 된다.

플래터의 저장공간은 앞 만 있는게 아닌 양면으로 존재하는데, 데이터를 읽고, 쓰는 역할인 액추에이터 또한 양면으로 존재한다. 그림에서 볼때 뾰족한 헤드가 플래터의 양면을 마주한 형태다.

액추에이터가 움직이는 방향은 플래터의 원심 방향에서 바깥 방향이다. 좌우는 플래터가 이미 돌기 때문에 앞 뒤로만 움직인다.

... 작성 중
`,
    ],
    ref: [
        {
            name: '마무님 - 하드디스크 구조 매우 쉽게!',
            link: 'https://mamu2830.blogspot.com/2019/10/blog-post_14.html',
        },
    ],
    template(){
        return `
        ${wikiFilter.all.call(this)}
        `
    }
};