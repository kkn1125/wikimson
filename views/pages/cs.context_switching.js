export default {
    published: true,
    modified: '',
    done: false,
    title: 'context-switching',
    tags: ['컨텍스트 스위칭','process'],
    categories: ['CS'],
    authors: ['kimson'],
    wrote: '2021-11-29 18:56:35',
    toc: true,
    content: [
        `
        <div><span class="h3">context switching이란</span></div>
        <div>
            <div>
                <span class="h6">정의</span>
                <div>
                    <p>컴퓨터가 마치 동시에 작업을 진행 하는 것처럼 보이는 이유는 아주 빠른 속도로 task를 바꿔가며 실행하기 때문입니다. 이때 CPU가 task를 바꾸면서 실행하기 위해 context switching이 요구됩니다.</p>
                    <p>현재 진행 중인 task(process, thread)의 상태를 저장하고 다음 진행할 task의 상태 값을 읽는 일련의 과정을 말합니다.</p>
                </div>
                <span class="h6">과정</span>
                <div>
                    <p>task의 대부분 정보는 레지스터에 저장되고 pcb(process control block)로 관리됩니다.</p>
                    <p>실행 중인 task pcb정보를 저장하며 다음 실행할 task의 pcb정보를 읽어 레지스터에 저장하고 cpu가 이전에 진행한 과정을 이어서 수행하게 됩니다.</p>
                </div>
            </div>
        </div>
        `,
    ],
    ref: [
        {
            name:'관련 위키 wikimson>library',
            link:'#library'
        },
        {
            name:'관련 위키 wikimson>api',
            link:'#api'
        },
    ],
    template(){
        return `
        ${wikiFilter.all.call(this)}
        `
    }
};