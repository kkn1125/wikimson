export default {
    published: true,
    title: 'Monitor',
    modified: '2022-03-09 20:31:18',
    done: true,
    tags: ['os', 'monitor', 'problem', 'synchronization'],
    categories: ['cs','Operating System'],
    authors: ['kimson'],
    wrote: '2022-03-09 20:28:34',
    toc: true,
    md: true,
    content: [`
# 모니터

모니터는 세마포 이후의 고수준 개념의 동기화 도구이다. 세마포를 떠올려보면 \`acquire\`와 \`release\`가 있었고, value값에 대한 조건문으로 동기화를 관리했다.

## 모니터의 구조

공유자원과 공유자원에 접근하는 함수를 가진다. \`common variable\`이 있고, 여기에 접근하는 함수들이 있다.

Queue를 2개 가지는데 하나는 배타동기(Mutual exclusion)를 위함이고, 다른 하나는 조건동기(Conditional Synchronization)를 위한 Queue이다.

배타동기 큐는 \`common variable\`에 접근하는 메서드가 있을 때 하나의 스레드만 접근 가능하도록 대기 시키는 역할을 한다.

공유자원 접근함수에는 최대 1개의 스레드만 진입 가능한데, 이 때 해당 스레드가 조건을 만족하게 되면 wait함수를 call하게 된다. 그러면 wait함수가 실행되어 들어왔던 스레드는 조건동기로 블록되면서 새 스레드가 진입 가능해진다.

갇히게 되면 새로운 스레드가 진입되면서 해당 스레드가 조건에 따라 notify함수를 실행하게 되면 블록된 스레드를 깨울 수 있다.

깨워진 스레드는 현재 스레드가 나가면 재진입 가능해진다.

## 자바 모니터

java의 모든 객체는 모니터가 될 수 있다.

- \`배타동기\` ==> \`synchronized\` 키워드를 사용해서 지정한다.
- \`조건동기\` ==> \`wait()\`, \`notify()\`, \`notifyAll()\` 메소드를 사용한다.

\`\`\`java
class C {
    private int value;

    synchronized void f(){
        // ...
    }

    synchronized void g(){
        // ...
    }

    void h(){
        // ...
    }
}
\`\`\`

어떠한 프로세스가 \`g()\`나 \`f()\`를 호출하면 다른 스레드는 \`g()\`나 \`f()\`를 호출할 수 없다.

반면 \`h()\`는 \`synchronized\`가 없으니 공통변수에 접근하는 함수가 아닌 것이다.

즉, \`synchronized\`가 붙은 함수만 상호배타 관계이고, \`synchronized\` 되어있지 않다면 얼마든지 스레드가 접근 가능하다는 이야기이다.

자바에서 모니터가 세마포와 다른 점은, \`critical section\`에 들어가기 전에 *acquire를 호출*하고 *나올 때 release*를 하지 않고, 단지 함수 앞에 *synchronized*만 붙이면 된다.

|synchronized {|
|---|
|Critical-section{:.text-center.text-danger}|
|}{:.text-center}|

### BankAccount Problem 예제

이전에 \`BankAccount Problem\`에서 다루었던 코드를 들고와서 *synchronized로 교체*를 해보자.

\`\`\`java
import java.util.concurrent.Semaphore;

class BankAccount {
    int balance;

    synchronized void deposit(int a) { // +
        System.out.println("+");
        int temp = a;
        balance += temp;
    }

    synchronized void withdraw(int a) { // +
        System.out.println("-");
        int temp = a;
        balance -= temp;
    }

    int getBalance() {
        return balance;
    }
}

class Parent extends Thread {
    BankAccount b;

    Parent(BankAccount b) {
        this.b = b;
    }

    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            b.deposit(1000);
        }
    }
}

class Child extends Thread {
    BankAccount b;

    Child(BankAccount b) {
        this.b = b;
    }

    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
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

모니터를 사용해서 \`synchronized\`를 쓰면 세마포를 쓸 때 처럼 \`acquire\`나 \`release\`를 사용하지 않고 간편하게 상호배타를 처리할 수 있다.

모니터도 세마포와 마찬가지로 Ordering이 가능한데 아래처럼 코드를 변경해서 실행해보자.

|P@1@|P@2@|
|---|---|
|-{:.text-center}|wait(){:.text-center}|
|S@1@;{:.text-center}|S@2@;{:.text-center}|
|notify(){:.text-center}|-{:.text-center}|

\`\`\`java
import java.util.concurrent.Semaphore;

class BankAccount {
    int balance;

    synchronized void deposit(int a) { // +
        System.out.println("+");
        int temp = a;
        balance += temp;
        notify();
    }

    synchronized void withdraw(int a) { // +
        while(balance <= 0) {
            try {
                wait();
            } catch(InterruptedException e) {}
        }
        System.out.println("-");
        int temp = a;
        balance -= temp;
    }

    int getBalance() {
        return balance;
    }
}

class Parent extends Thread {
    // ... 생략 ...
}

class Child extends Thread {
    // ... 생략 ...
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

\`[ 표 2 ]\`처럼 변경하면 항상 입금 먼저 실행하게 된다. 만일 반대로 출금을 먼저 실행하려면 반대로 \`withdraw\`와 \`deposit\`에 입력한 것을 바꿔주면 된다.

그렇다면 교차로 실행되게 하려면 어떻게 해야할까?

\`\`\`java
import java.util.concurrent.Semaphore;

class BankAccount {
    int balance;
    boolean turn = true;

    synchronized void deposit(int a) {
        System.out.println("+");
        int temp = a;
        balance += temp;
        notify(); // +
        turn = false; // +
        try { // +
            wait();
        } catch(InterruptedException e) {}
    }

    synchronized void withdraw(int a) {
        while (turn) { // +
            try {
                wait();
            } catch(InterruptedException e) {}
        }
        System.out.println("-");
        int temp = a;
        turn = true; // +
        balance -= temp;
        notify(); // +
    }

    int getBalance() {
        return balance;
    }
}

class Parent extends Thread {
    // ... 생략 ...
}

class Child extends Thread {
    // ... 생략 ...
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

이렇게 parent가 먼저 실행되도록 *turn이라는 boolean을 생성*해서 조정하고, parent가 실행된 후 \`notify()\`로 깨우고, *turn을 false로 바꾸면서* parent는 \`wait()\`시킨다.

### 전통적 동기화 예제

#### Producer and Consumer Problem 예제

\`\`\`java
package os;

class Buffer {
	int[] buf;
	int size, count, in, out;
	
	Buffer(int size) {
		buf = new int[size];
		this.size = size;
		count = in = out = 0;
	}
	
	synchronized void insert(int item) {
        while(count == size) {
            try {
                wait();
            } catch(InterruptedException e) {}
        }
        ///////////////////////// CS
        buf[in] = item;
        in = (in + 1) % size;
        ///////////////////////// CS
        notify();
        count++;
	}
	
	synchronized int remove() {
        while(count == 0) {
            try {
                wait();
            } catch(InterruptedException e) {}
        }
        ///////////////////////// CS
        int item = buf[out];
        out = (out + 1) % size;
        ///////////////////////// CS
        count--;
        notify();
	}
}

// ================ Producer ================
class Producer extends Thread {
	Buffer b;
	int N;
	public Producer (Buffer b, int N) {
		this.b = b;
		this.N = N;
	}
	public void run() {
		for (int i=0; i<N; i++) {
			b.insert(i);
		}
	}
}

// ================ Consumer ================
class Consumer extends Thread {
	Buffer b;
	int N;
	public Consumer (Buffer b, int N) {
		this.b = b;
		this.N = N;
	}
	public void run() {
		int item;
		for (int i=0; i<N; i++) {
			item = b.remove();
		}
	}
}

public class Test2 {
	public static void main (String[] args) {
		Buffer b = new Buffer(100);
		Producer p = new Producer(b, 10000);
		Consumer c = new Consumer(b, 10000);
		p.start();
		c.start();
		try {
			p.join();
			c.join();
		} catch (Exception e) {
			// TODO: handle exception
		}
		System.out.println("Number of items in the buf is " + b.count);
	}
}
\`\`\`

세마포를 사용하지 않고 생산자-소비자 문제 또한 *synchronized*로 해결하는 코드로 변경하였다.

#### Dining Philosopher Problem 예제

\`\`\`java
class Chopstick {
    private boolean inUse = false;

    synchronized void acquire() throws InterruptedException {
        while(inUse)
            wait();
        inUse = true;
    }

    synchronized void release() {
        inUse = false;
        notify();
    }
}

class Philosopher extends Thread {
    int id;
    Chopstick lstick, rstick;

    Philosopher(int id, Chopstick stick) {
        this.id = id;
        this.stick = stick;
    }

    public void run() {
        try {
            while (true) {
                // +
                if ((id % 2 == 0)) {
                    lstick.acquire();
                    rstick.acquire();
                } else {
                    rstick.acquire();
                    lstick.acquire();
                }

                eating();

                lstick.release();
                rstick.release();
                thinking();
            }
        } catch (InterruptedException e) {
        }
    }

    void eating() {
        System.out.println("[" + id + "] eating");
    }

    void thinking() {
        System.out.println("[" + id + "] thinking");
    }
}

public class test {
    static final int num = 5;

    public static void main(String[] args) {
        int i;

        // chopsticks
        Semaphore[] sticks = new Semaphore[num];
        for (i = 0; i < num; i++)
            sticks[i] = new Semaphore(1);

        // philosopher
        Philosopher[] phil = new Philosopher[num];
        for (i = 0; i < num; i++)
            phil[i] = new Philosopher(i, sticks[i], sticks[(i + 1) % num]);

        // let philosophers eat and think
        for (i = 0; i < num; i++)
            phil[i].start();
    }
}
\`\`\`

세마포를 사용하지 않고 클래스로 Chopstick을 만들어 철학자 문제를 해결하고 있다. 하지만 결과는 실행 도중 블록된다. 이렇게 블록되는 것은 교착상태 때문에 발생하는데, *교착상태 회피*에서 *환형 대기*를 해소하는 방법 등을 사용해서 해결하면 된다.
`],
    ref: [
        {
            name: '경성대 양희재 교수님 - 7강 모니터',
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