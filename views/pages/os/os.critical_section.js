export default {
    published: true,
    title: 'Critical Section',
    modified: '',
    done: true,
    tags: ['os', 'critical section', 'semaphore'],
    categories: ['cs','Operating System'],
    authors: ['kimson'],
    wrote: '2022-03-02 21:35:42',
    toc: true,
    md: true,
    content: [`
# Thread

## 임계구역 문제 (Critical-Section Problem) {:.text-danger}

### Critical section

공유 변수 영역이라도고 하며, 병렬컴퓨팅에서 다중 스레드로 구성된 시스템에서 둘 이상의 스레드가 동시에 접근해서는 안되는 공유 자원을 접근하는 코드의 일부를 말한다. 임계 구역은 지정된 시간이 지난 후에 종료된다. 마치 옷가게의 탈의실을 비유하자면 이해가 빨리 되겠다.

각각의 스레드는 코드영역을 가지는데, 함께 사용하는 변수, 파일, 테이블 등을 변경하거나 업데이트 하는 구간을 *critical section*이라 한다.

\`java\`코드를 보면 \`balance = balance + amount;\`가 *critical section*인 것이다.

### 해결방법

아래의 3 가지 조건이 충족되어야 한다.

- mutual exclusion (상호배타) ==> 오류가 일어나지 않으려면 공유 변수에 하나의 스레드가 접근 중이라면 다른 스레드는 들어가면 안 된다는 것이다.
- Progress (진행) ==> 유한 시간 내에 진입 결정이 나야한다.
- Bounded waiting (유한대기) ==> 어느 스레드라도 기다리고 있으면 유한 시간 내에 critical section에 들어갈 수 있다는 이야기이다.

## 프로세스/스레드 동기화

- 임계구역 문제를 해결해야한다.
    - 상호배타
    - 진행
    - 유한대기
- 프로세스/스레드 실행 순서를 원하는대로 제어할 수 있어야 한다.
- Busy wait 등 비효율성은 제거

## 동기화 도구

- Semaphores ==> 전통적인 동기화 도구
- Monitors ==> Java에서 사용
- Misc.

### Semaphores (세마포)

철도의 신호, 수기, 시그널의 의미이다. OS에서 말하는 세마포는 동기화 툴을 의미한다.

네덜란드의 *Edsger Dijkstra*라는 사람이 제안하였고, 내부 구조는 정수형 변수와 두 개의 동작(P, V)으로 이루어져 있다.

#### 동작

- \`P\` ==> Proberen (test) -> acquire() ?== 검사하는 것
- \`V\` ==> Verhogen (increment) -> release() ?== 증가시키는 것

\`\`\`java
class Semaphore {
    int value; // number of permits 권한의 개수?
    Semaphore(int value) {
        // ...
    }
    void acquire() {
        // ...
        value--; // 값이 1 감소 된다.
        if(value < 0) { // acquire를 호출했던 프로세스/스레드를 리스트에 넣는다.
            add this process/thread to list;
            block; // 멈춘다.
        }
    }
    void release() {
        // ...
        value++;
        if(value <= 0) {
            remove a process P from list;
            wakeup P;
        }
    }
}
\`\`\`

만일 프로세스가 쭉 돌고 있을 때 ready queue나 device queue에 줄 서있는 프로세스들이 있다고 가정하자. 그러다가 한 프로세스가 acquire를 호출하면 value값이 1 감소하고, 이때 semaphore에 queue같은 곳에 list에 추가되어 block된다.

이후 다른 프로세스가 release를 호출하게 되면 갇혀있던 프로세스 하나를 list에서 꺼내고 다시 ready queue에 보낸다.

#### 목적

일반적으로 *상호배타(Mutual exclusion)* 목적으로 사용한다. 초기 값이 \`sem.value = 1\`일 때 \`sem.acquire()\`를 호출하면 \`sem.value\`가 0이므로 \`acquire\`의 \`if\`문에 해당되지 않아 통과되어 *Critical Section*에 들어간다.

두 번째 프로세스가 들어가게 된다면, 이미 첫 번째 프로세스가 \`sem.value\`를 0으로 만들었기 때문에 \`semaphore\`에 갇히게 된다. 즉, \`Critical Section\` 안에 못 들어간다는 것이다.

이제 다시 컨텍스트 스위칭되어 첫 번째 프로세스가 \`Critical Section\`에서 빠져나올 때 \`release\`를 호출하게 되면 \`sem.value\`는 0이 된다.

그러면 \`release\`의 \`if\`문 조건인 \`value <= 0\`에 맞기 때문에 두 번째 프로세스가 \`list\`에서 빠져나와 \`Critical Section\`으로 들어가게 된다.

#### 예제

\`\`\`java
import java.util.concurrent.Semaphore; // +
class BankAccount {
    int balance;
    Semaphore sem; // +
    BankAccount() { // +
        sem = new Semaphore(1); // +
    } // +
    void deposit(int a) {
        try{
            sem.acquire(); // 진입
        } catch(InterruptedException) {}
        //////////////////////////// critical section
        System.out.println("+"); // 시간 지연
        int temp = a;
        balance += temp; // 시간 지연
        //////////////////////////// critical section
        sem.release(); // 퇴장
    }
    void withdraw(int a) {
        try{
            sem.acquire(); // 진입
        } catch(InterruptedException) {}
        //////////////////////////// critical section
        System.out.println("-"); // 시간 지연
        int temp = a;
        balance -= temp; // 시간 지연
        //////////////////////////// critical section
        sem.release(); // 퇴장
    }
    int getBalance(){
        return balance;
    }
}
class Parent extends Thread {
    BackAccount b;
    Parent(BankAccount b){
        this.b = b;
    }
    public void run(){
        for(int i=0; i<100; i++) {
            b.deposit(1000);
        }
    }
}
class Child extends Thread {
    BackAccount b;
    Child(BankAccount b){
        this.b = b;
    }
    public void run(){
        for(int i=0; i<100; i++) {
            b.withdraw(1000);
        }
    }
}
public class Test {
    public static void main(String[] args) throws InterruptedException {
        BankAccount b = new BankAccount();
        Parent p = new Parent(b);
        Child c = new Child(b);
        p.start();
        c.start();
        p.join(); // 부모가 입금 끝날 때까지 기다림
        c.join(); // 자식이 출금 끝날 때까지 기다림
        System.out.println("Balance is : " + b.getBalance());
    }
}
\`\`\`
`],
    ref: [
        {
            name: '경성대 양희재 교수님 - 4강 Thread',
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