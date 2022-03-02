export default {
    published: true,
    title: 'Process Synchronization',
    modified: '2022-03-02 21:36:58',
    done: true,
    tags: ['os', 'process', 'pid', 'synchronization'],
    categories: ['cs','Operating System'],
    authors: ['kimson'],
    wrote: '2022-02-27 22:27:39',
    toc: true,
    md: true,
    content: [`
# Thread

## 쓰레드 (Thread)

> 프로그램 내부의 흐름, 맥이다.

\`\`\`java
class Test {
    public static void main(String[] args) {
        int n = 0;
        int m = 6;
        System.out.pringln(n * m);
        while(n < m)
        n++;
        System.out.pringln("Bye");
    }
}
\`\`\`

위의 코드가 프로그램의 흐름이다. 이러한 맥을 쓰레드라 한다.

### 다중 쓰레드(Multithreads)

한 프로그램에 2개 이상의 맥이 있다는 의미이다. 맥(흐름)이 빠른 시간 간격으로 스위칭되기 때문에 여러 맥이 동시에 실행되는 것처럼 보인다. \`동시(concurrent){:.bg-danger}\` vs \`진짜로 동시에(simultaneous)\`. 실제로는 CPU가 하나이기 때문에 concurrent한 것이 맞다.

- 웹 ==> 화면을 출력하는 스레드와 데이터를 읽어오는 스레드
- 워드 프로세서 ==> 화면 출력 스레드 + 키보드 입력 스레드 + 철자/문법 오류 확인 스레드

하나의 프로세스에는 기본 1개의 스레드를 가진다. 이를 *단일 스레드(Single Thread) 프로그램*이라 한다. 하나의 프로세스에 여러 개의 스레드가 있으면 *다중 스레드(Multi-thread) 프로그램*이라 한다.

### 스레드의 구조

\`P@1@\` \`P@2@\` \`P@3@\` 3개의 프로세스가 있다고 가정할 때, P@1@이 실행되면 보통은 한 개가 돌지만 한 개 이상의 스레드가 돌 수 있다. P@1@이 프린터를 사용하고 있다면 스레드들은 프린터나 해당 파일을 공유하며 사용하게 된다.

스택은 주로 리턴 값이나 파라미터를 저장하는데 사용되는데, 스레드가 서로 다른 메소드를 호출할 수도 있기 때문에 스택에 저장되는 내용도 다르다.

보통 하나의 프로그램이 코드, 스택, 데이터로 구성된다. 코드와 데이터를 서로 공유하지만, 스택은 공유하지 않고 따로 가진다. 하나의 스레드가 호출되어 실행될텐데 이때 파라미터나 리턴 어드레스 등은 스위칭 때 다른 스레드에 가야하기 때문에 공유하면 안 된다.

- 프로세스 메모리 공간 공유 (code, data)
- 프로세스의 자원 공유(file, I/O)
- 비공유 ==> 개별적인 PC, SP, registers, stack

### 프로세스 스위칭 vs 스레드 스위칭

앞에서 싱글 스레드까지는 쉽게 하기 위해 프로세스 단위로 스위칭한다고 생각했지만, 실제로는 스레드 단위의 스위칭이 일어난다. 옛날에는 프로세스만 스위칭 되는 형식이었지만 현대의 운영체제는 스레드도 같이 스위칭되기 때문에 *컨텍스트 스위칭 단위*는 프로세스가 아닌 *스레드*이다.

### 맥 만들기 (🍎 ❌) feat.JAVA

> java.lang ==> Thread
> 주요 메서드
    - public void run() ==> 새로운 맥이 흐르는 곳 (치환)
    - void start() ==> 스레드 시작 요청
    - void join() ==> 스레드 마치기 기다림
    - static void sleep() ==> 스레드 잠자기

\`thread.run()\`하면 스레드가 시작되면 \`run()\` 메소드가 실행된다. 그리고 \`run()\`메소드를 치환한다.

#### 예제

> 글자 A와 B를 동시에 화면에 출력하기
    - 모든 프로그램은 처음부터 1개의 스레드는 갖고 있다. (main)
    - 2개의 스레드 ==> main + MyTread

\`\`\`java
public class Test {
    public static void main(String[] args) {
        MyThread th = new MyThread();
        th.run();
        while (true) {
            System.out.println("A");
            try{
                Thread.sleep(100);
            } catch(InterruptedException e) {}
        }
    }
}
class MyThread extends Thread {
    pubic void run(){
        while (true) System.out.println("B");
        try{
            Thread.sleep(100);
        } catch(InterruptedException e) {}
    }
}
\`\`\`

## 프로세스 동기화 (Process Synchronization) {:.text-danget}

제목은 process이지만 현대에는 *thread*이다. 즉, *thread synchronization*으로 생각하면 된다.

- Concurrent access to shared data may result in data inconsistency
    - 공유된 데이터(데이터베이스든, 프린터든)에 동시에 접근하면 데이터 불일치가 발생할 수 있다.
- Oderly execution of cooperating processes so that data consistency is maintained.
    - 데이터 일관성이 유지되도록 협력 프로세스를 정상적으로 실행한다.

### Independent와 Cooperation

- \`Independent(독립)\` ==> \`P@1@\` \`P@2@\`가 돌고 있을 때 둘 사이의 아무런 관계가 없으면 Independent process(독립 프로세스)라 한다.
- \`Cooperation(협조, 협력)\` ==> 시스템 내에서 실행되는 다른 프로세스에게 영향을 미치거나 혹은 받거나 하는 프로세스를 *Cooperating Process*라 한다.

- 프로세스간 통신 ==> 이 둘 중, \`Cooperating\` 프로그램이 많다. 메일의 경우 받는 프로세스, 주는 프로세스가 있을텐데, 메세지를 공유하면서 서로 영향을 주고 받는다.
- 프로세스간 자원 공유 ==> *명절 기차 표*를 예로 들면 예매 서버에 동시에 많은 프로세스가 접근하면 *데이터베이스*에 서로 접근하여 *메모리 상 자료들을 공유*하기 때문에 각각의 프로세스에 영향을 주게 되어있다는 이야기.
- 다른 예로는 대학 온라인 수강신청, 실시간 주식거래 등이 있다.

*프로세스 관리*에서 중요한 것은 *프로세스 동기화*이다.

### BankAccount Problem (은행계좌 문제)

부모님이 은행계좌에 입금하고 자녀가 출금을 할 때, \`입금(deposit)\`과 \`출금(withdraw)\`은 *독립적*으로 일어난다.

\`\`\`java
class BankAccount {
    int balance;
    
    void deposit(int a) {
        System.out.println("+"); // 시간 지연
        int temp = a;
        balance += temp; // 시간 지연
    }

    void withdraw(int a) {
        System.out.println("-"); // 시간 지연
        int temp = a;
        balance -= temp; // 시간 지연
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

시간지연에 의해 결과 값이 달라질 수가 있다. 프로세스 관리에 있어서 이러한 문제는 중요하다. 위의 코드는 시간지연 코드가 없어도 시간지연은 있기 마련이다.

java가 컴파일할 때 어셈블리어로 변환된다. 예를 들어 \`balance = balance + amount;\`가 변환되어 하나하나의 코드가 여러 줄이 된다. java로 볼 때는 해당 코드에서 컨텍스트 스위칭이 일어나는 것으로 보이지만, 로우레벨 언어로 변환되어 실행될 때는 여러 코드 사이사이에 컨텍스트 스위칭이 언제라도 일어날 수 있기 때문에 중간에 스위칭이 일어나면 이상한 결과가 나올 수 있다.

#### 입출금 동작에 시간 지연 추가

잘못된 결과 값을 가져올 수 있다. 이유는 *공통변수(common variable)*에 대한 *동시 업데이트(concurrent update)*에 있다. 즉, \`balance\`라는 변수에 부모는 \`deposit\`하고 자식은 \`withdraw\`하고 있기 때문에 서로 다른 연산을 하면서 *동시 업데이트*되어 문제가 발생한다.

해결방법은 한 번에 한 스레드만 업데이트 하도록 바꿔야 한다. 즉, 도중에 스위칭이 일어나게 해서는 안 된다는 것이다. 이를 *임계구역 문제*라 한다.
`],
    ref: [
        {
            name: '경성대 양희재 교수님 - 4강 프로세스 동기화',
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