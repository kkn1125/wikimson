import {tables} from '../../../store/tables/semaphore.js';

export default {
    published: true,
    title: 'Semaphore',
    modified: '2022-03-03 20:32:42',
    done: true,
    tags: ['os', 'critical section', 'semaphore', 'synchronization', '세마포'],
    categories: ['cs','Operating System'],
    authors: ['kimson'],
    wrote: '2022-03-02 21:39:23',
    toc: true,
    md: true,
    content: [`
# Semaphores (세마포)

프로세스 동기화가 필요한 이유는 컴퓨터 메모리 안에 있는 프로세스들은 독립적이지 않고 *협력하는 관계*이기 때문에 공통 변수에 접근 가능해서, 서로 영향을 주고 받게 되는데, 이런 문제를 해결하기 위함이다.

## 세마포 구조

철도의 신호, 수기, 시그널의 의미이다. OS에서 말하는 세마포는 동기화 툴을 의미한다.

네덜란드의 *Edsger Dijkstra*라는 사람이 제안하였고, 내부 구조는 정수형 변수와 두 개의 동작(P, V)으로 이루어져 있다.

### 동작

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

### 목적

일반적으로 *상호배타(Mutual exclusion)* 목적으로 사용한다. 초기 값이 \`sem.value = 1\`일 때 \`sem.acquire()\`를 호출하면 \`sem.value\`가 0이므로 \`acquire\`의 \`if\`문에 해당되지 않아 통과되어 *Critical Section*에 들어간다.

두 번째 프로세스가 들어가게 된다면, 이미 첫 번째 프로세스가 \`sem.value\`를 0으로 만들었기 때문에 \`semaphore\`에 갇히게 된다. 즉, \`Critical Section\` 안에 못 들어간다는 것이다.

이제 다시 컨텍스트 스위칭되어 첫 번째 프로세스가 \`Critical Section\`에서 빠져나올 때 \`release\`를 호출하게 되면 \`sem.value\`는 0이 된다.

그러면 \`release\`의 \`if\`문 조건인 \`value <= 0\`에 맞기 때문에 두 번째 프로세스가 \`list\`에서 빠져나와 \`Critical Section\`으로 들어가게 된다.

## 예제 1

sem.value가 1일 때,

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

세마포 값이 1이면 아래와 같이 입/출금이 진행된다.

1. \`P@1@\`이 먼저 \`acquire()\`를 호출한다.
    1. \`sem.value\`가 1에서 *1감소* 한다. \`sem.value === 0\`
2. \`P@2@\`가 들어와 \`acquire()\`를 호출한다.
    1. \`sem.value\`가 0에서 *1감소* 한다. \`sem.value === -1\`
    2. \`조건{:title="value < 0"}\`에 걸린다.
    3. list에 추가된다.
    4. block(갇힘)된다.
3. \`if\` -> \`P@1@\`이 나온다면
    1. \`release()\`를 호출한다.
    2. \`sem.value\`가 -1에서 *1증가* 한다. \`sem.value === 0\`
    3. \`조건{:title="value \\<= 0"}\`에 걸린다.
    4. list에서 ready queue로 이동한다.
    5. critical section에 접근한다.
4. \`elif\` -> \`P@3@\`이 들어온다면
    1. \`acquire()\`를 호출한다.
    2. \`sem.value\`가 -1에서 *1감소* 한다. \`sem.value === -2\`
    3. \`조건{:title="value < 0"}\`에 걸린다.
    4. list에 추가된다.
    5. block(갇힘)된다.

즉, 몇 번을 block되어도 순서대로 줄을 서 기다리게 되고, 나오게 되면 줄 서있던 프로세스를 하나 씩 실행시켜 *critical section에 프로세스*가 *하나 씩 접근* 가능하게 된다.

## 예제 2

예제 1과 달리 sem.value가 0일 때, \`P@1@\`은 \`S@1@\`코드와 sem.release()를 호출하고, \`P@2@\`는 sem.acquire()를 호출하고 \`S@2@\`코드를 돈다고 가정한다.

이때 프로세스가 어느 것 먼저인지는 *랜덤*이다. 여기서 중요한 것은 *\`P@1@\`을 먼저 실행하고자 하는 것*이다.

표로 보면 아래와 같다.

${tables['t1']}

만일 \`P@1@\`가 먼저 작동되면 예제 2의 목적이 달성된다. 하지만 \`P@2@\`가 먼저 작동하게 될 때, \`acquire()\`를 호출하면 \`sem.value\`가 0에서 1감소하여 -1이 되므로 block된다. 그리고 컨텍스트 스위칭 되어 \`P@1@\`이 오면 \`acquire()\`호출 없이 바로 \`S@1@\`코드를 원하던 대로 먼저 실행된다.

실행된 후 \`release()\`를 호출하기 때문에 이때 \`sem.value\`는 -1에서 0이 되고, 0은 \`release\`의 조건에 충족되어 \`P@2@\`를 깨워 \`S@2@\`가 동작된다.

> *CPU Scheduling에 상관없이* \`S@1@\`이 실행된다.   
> 항상 \`S@1@\` -> \`S@2@\` -> \`S@3@\`순이 되도록 할 때 사용한다.

\`Code Block [2]\`에서 조금 변형해서 위의 \`[ 표 1 ]\`처럼 부모가 \`deposit()\`할 때는 \`S@1@\`인 *balance += 1000;*을 실행한 후 \`release()\`를 실행하고, 자식이 \`withdraw()\`할 때는 \`acquire()\`을 호출하고 \`S@2@\`인 *balance -= 1000;*을 하도록 한다.

\`\`\`java
import java.util.concurrent.Semaphore;

class BankAccount {
    int balance;

    Semaphore sem, sem2; // +

    BankAccount() {
        sem = new Semaphore(1);
        sem2 = new Semaphore(0);
    }

    void deposit(int a) {
        try{
            sem.acquire();
        } catch(InterruptedException) {}
        //////////////////////////// critical section
        System.out.println("+");
        int temp = a;
        balance += temp;
        //////////////////////////// critical section
        sem.release();
        sem2.release(); // +
    }

    void withdraw(int a) {
        try{
            sem2.acquire(); // +
            sem.acquire();
        } catch(InterruptedException) {}
        //////////////////////////// critical section
        System.out.println("-");
        int temp = a;
        balance -= temp;
        //////////////////////////// critical section
        sem.release();
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

        p.join();
        c.join();
        
        System.out.println("Balance is : " + b.getBalance());
    }
}
\`\`\`

위의 코드를 반대로 \`withdraw\`를 먼저 하고싶다면 \`release\`와 \`acquire\`를 반대로 해주면 된다.

### 번갈아서 입/출금하기

세마포를 입금용, 출금용으로 따로 두 개 만든다. 그리고 각 \`value\`를 0으로 같게 하고, deposit 먼저 실행하면서 입 -> 출 -> 입 -> 출 ... 하려한다.

\`deposit\`할 때 \`wSem.release()\` 호출하고, \`dSem.acquire()\`를 호출한다. 반대로 \`wSem.acquire()\`를 호출하고 \`withdraw\`할 때는 \`dSem.release()\`를 호출해서 \`deposit\`을 깨운다.

> 이렇게 동기화 툴을 써서 컨텍스트 스위칭이 언제 일어날지 모르지만 제어할 수 있어야 한다는 이야기이다.
`],
    ref: [
        {
            name: '경성대 양희재 교수님 - 4강 세마포',
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