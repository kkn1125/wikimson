export default {
    published: true,
    title: '알고리즘을 정리하자',
    modified: '2022-02-14 17:30:38',
    done: false,
    tags: ['알고리즘'],
    categories: ['algorithm'],
    authors: ['kimson'],
    wrote: '2021-12-15 12:16:29',
    toc: true,
    md: true,
    ref: [
        // {
        //     name:'위키 백과 - CS',
        //     link:'https://ko.wikipedia.org/wiki/%EC%93%B0%EB%A0%88%EA%B8%B0_%EC%88%98%EC%A7%91_(%EC%BB%B4%ED%93%A8%ED%84%B0_%EA%B3%BC%ED%95%99)'
        // },
    ],
    content: [`
### 이진탐색 (Binary Search)

${wikiFilter.img('https://i0.wp.com/learningsolo.com/wp-content/uploads/2018/04/binarray1-1.gif?fit=469%2C182&ssl=1', 'ref')}

그림에 잘 설명 되어 있듯이 필요한 수 찾고자 하는 수와 첫번째 인덱스, 마지막 인덱스입니다. 중간 인덱스를 찾아 해당 값이 찾고자 하는 수보다 작으면 해당 인덱스를 포한하지 않는 더 낮은 수를 찾아야하기 때문에 middle - 1의 인덱스에서 first 사이의 중간지점을 다시 조회합니다. 이런 식으로 반복되면 절반에 절반을 쪼개어 탐색하게 됩니다.

코드로 보면 아래와 같습니다.
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

###### 너비 우선 탐색 (BFS)

*Breadth-First-Search*

> 루트 노드에서 시작해서 인접한 노드를 먼저 탐색하는 방법 입니다.

Queue를 사용하며 선입선출(FIFO) 원칙으로 탐색합니다.

\`\`\`java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.Queue;

public class bfsTest {
Boolean[] check;
ArrayList<Integer>[] list;

@Test
public void bfsTest() {
    int[][] graph = {
            {0,0,0,0,0},
            {0,0,0,0,0},
            {0,0,0,0,0},
            {0,0,0,0,0},
            {0,0,0,0,0},
    };
    int maxX = 5;
    int maxY = 5;
    int result = bfs(graph, 2, 2, maxX, maxY);
    System.out.println(result);
    for(int[] row : graph) {
        System.out.println(Arrays.toString(row));
    }
}

public Integer bfs(int[][] graph, int x, int y, int maxX, int maxY) {  
    Queue<Integer[]> q = new LinkedList<Integer[]>(); // x 2 y 2  
    int[] dx = {-1, 1, 0, 0};
    int[] dy = {0, 0, 1, -1};
    q.add(new Integer[] {x, y}); // [2 2]
        while(!q.isEmpty()) {
            Integer[] poll = q.poll(); // [2 2]
            x = poll[0]; // 2
            y = poll[1]; // 2
            for(int i=0; i<4; i++) { // 1 2
                int row=y+dy[i],col=x+dx[i]; // row 2 col 1
                if(row<0 || col<0 || row>=maxY || col>=maxX) {
                    continue;
                }
                if(graph[row][col]==0) { // 2 1
                    graph[row][col] = 1;
                    q.add(new Integer[] {row, col});
                }
            }
        }
        return 1;
    }
}
\`\`\`
`],
    template(){
        return `
        ${wikiFilter.all.call(this)}
        `
    }
}