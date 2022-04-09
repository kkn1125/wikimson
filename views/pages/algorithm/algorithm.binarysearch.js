export default {
    published: true,
    title: '알고리즘을 정리하자',
    modified: '2022-02-26 12:11:32',
    done: true,
    tags: ['알고리즘'],
    categories: ['algorithm'],
    authors: ['kimson'],
    wrote: '2021-12-15 12:16:29',
    toc: true,
    md: true,
    ref: [],
    content: [`
# 이진탐색 (Binary Search)

${wikiFilter.img('algorithm/binary-search.png', 'Medium - Coding Freak', 'sample')}

그림에 잘 설명 되어 있듯이 필요한 수 찾고자 하는 수와 첫번째 인덱스, 마지막 인덱스이다. 중간 인덱스를 찾아 해당 값이 찾고자 하는 수보다 작으면 해당 인덱스를 포한하지 않는 더 낮은 수를 찾아야하기 때문에 middle - 1의 인덱스에서 first 사이의 중간지점을 다시 조회한다. 이런 식으로 반복되면 절반에 절반을 쪼개어 탐색하게 된다.

코드로 보면 아래와 같다.

\`\`\`javascript
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
\`\`\`
`],
    template(){
        return `
        ${wikiFilter.all.call(this)}
        `
    }
}