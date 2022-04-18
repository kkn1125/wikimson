export default {
    published: true,
    title: 'Segmentation',
    done: false,
    tags: ['os', 'segmentation'],
    categories: ['cs','Operating System'],
    authors: ['kimson'],
    wrote: '2022-04-18 13:20:21',
    toc: true,
    md: true,
    content: [`
# 세그멘테이션 (Segmentation)

... 작성 중 ...
`],
    ref: [
        {
            name: '경성대 양희재 교수님 - 9강 세그멘테이션',
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