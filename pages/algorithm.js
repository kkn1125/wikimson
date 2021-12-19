const algorithm = {
    modified: '2021-12-19 23:38:30',
    done: false,
    published: true,
    title: '알고리즘을 정리하자',
    tags: ['알고리즘'],
    categories: ['algorithm'],
    authors: ['kimson'],
    wrote: '2021-12-15 12:16:29',
    toc: true,
    content: [
        `
        <div>
            <div class="mt-3">
                <span class="h3">알고리즘을 정리하자</span>
            </div>
            <div>
                <div>
                    <span class="h6">이진탐색 (Binary Search)</span>
                </div>
                <p align="center">
                    <img src="https://i0.wp.com/learningsolo.com/wp-content/uploads/2018/04/binarray1-1.gif?fit=469%2C182&ssl=1" alt="">
                </p>
                <p>면접을 보기 위해 아침 일찍 나와야 했습니다. 출근시간보다 더 빠른 시간에 보는 게 지방에 사는 저로서는 오는 길조차 체력의 반을 써야했습니다. 재량을 두고 저를 알리는 자리이니 이러한 불편은 감수해야하지만 힘든건 부정 못하겠네요...</p>
                <p>면접은 난생 처음 <kbd>다대다</kbd>방식. 심지어 면접도 형식 갖춰서 하는 경험도 전무했던지라 머리가 새하얗게 비었습니다. (이전 직장은 상무님 아들얘기만 듣다가 끝난던 기억이)</p>
                <hr>
                <div>
                    <span class="h6">너비 우선 탐색 (BFS)</span>
                </div>
                <div>
                    <span class="fs-5 fw-bold">Breadth-First-Search</span>
                </div>
                <blockquote class="blockquote blockquote-info">
                    루트 노드에서 시작해서 인접한 노드를 먼저 탐색하는 방법 입니다.
                </blockquote>

                <pQueue를 사용하며 선입선출(FIFO) 원칙으로 탐색합니다.</p>
                <p>
                    <code>
                        <pre>import java.util.ArrayList;
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
                        </pre>
                    </code>
                </p>
            </div>
        </div>
        `,

    ],
    ref: [
        // {
        //     name:'위키 백과 - CS',
        //     link:'https://ko.wikipedia.org/wiki/%EC%93%B0%EB%A0%88%EA%B8%B0_%EC%88%98%EC%A7%91_(%EC%BB%B4%ED%93%A8%ED%84%B0_%EA%B3%BC%ED%95%99)'
        // },
    ]
};