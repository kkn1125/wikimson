const OSI = {
    modified: '2021-12-15 12:54:23',
    done: false,
    published: true,
    title: 'OSI-7계층',
    tags: ['OSI-7계층', '통신규약'],
    categories: ['CS'],
    authors: ['kimson'],
    wrote: '2021-11-29 18:56:35',
    toc: true,
    content: [
        `
        <div><span class="h3">OSI 7계층</span></div>
        <div>
            <div>
                <span class="h6">정의</span>
                <div>
                    OSI 7 계층은 네트워크에서 통신이 일어나는 과정을 7단계로 나눈 것을 말한다.
                </div>
                <span class="h6">계층을 나눈 이유</span>
                <p>
                    통신 과정을 단계별로 파악하기 위해.
                    즉, 문제가 생기면 7계층 중 특정 영역에 이상이 있음을 감지하고 다른 영역을 건들이지 않고 해당 영역만 고칠 수 있기 때문이라는 이야기가 된다. 
                </p>
                <figure align="center">
                    <span class="w-inline-flex flex-column">
                        <img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fg7KXdyFIQoWy4tnLqSs2%2Fuploads%2FbP8e7q5Q2R3CJkARCudZ%2Fimage.png?alt=media&token=7ea1ac13-49ba-428f-a85c-e1304316ca6f" alt="gitbook kimson">
                        <figcaption class="mb-5 bg-light fs-7 p-1">[출처] <a href="https://learningsolo.com/binary-search-algorithm/">https://learningsolo.com/binary-search-algorithm/</a></figcaption>
                    </span>
                </figure>
                <p>
                    그림에 잘 설명 되어 있듯이 필요한 수 찾고자 하는 수와 첫번째 인덱스, 마지막 인덱스입니다. 중간 인덱스를 찾아 해당 값이 찾고자 하는 수보다 작으면 해당 인덱스를 포한하지 않는 더 낮은 수를 찾아야하기 때문에 middle - 1의 인덱스에서 first 사이의 중간지점을 다시 조회합니다. 이런 식으로 반복되면 절반에 절반을 쪼개어 탐색하게 됩니다.
                    코드로 보면 아래와 같습니다.
                </p>
                <pre>
                    <code class="language-java">
${new Option(`
public int searchBinary(int[] arr, int find) {
	int mid, start, end;
	start = 0;
	end = arr.length - 1;
	
	while(start <= end) {
		mid = (start + end) / 2 ;
		if(arr[mid] == find) {
			return mid;
		}
		
		if(find < arr[mid]) {
			end = mid - 1;
		} else {
			start = mid + 1;
		}
	}
	
	return -1; 
}
`).innerHTML}
                    </code>
                </pre>
            </div>
        </div>
        `,
        `
        <div><span class="h3">TCP/IP 프로토콜 스택 4계층</span></div>

        `,
    ],
    ref: [
        // {
        //     name:'',
        //     link:''
        // },
    ],
}