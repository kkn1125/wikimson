export default {
    published: true,
    title: '알고리즘을 정리하자',
    modified: '2022-03-08 14:45:59',
    done: true,
    tags: ['알고리즘'],
    categories: ['algorithm'],
    authors: ['kimson'],
    wrote: '2021-12-15 12:16:29',
    toc: true,
    md: true,
    ref: [],
    content: [`
# 너비 우선 탐색 (BFS)

> *Breadth-First-Search*, 루트 노드에서 시작해서 인접한 노드를 먼저 탐색하는 방법 입니다.

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