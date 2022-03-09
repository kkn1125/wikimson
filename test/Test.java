import java.util.concurrent.Semaphore;

class BankAccount {
    int balance;

    Semaphore sem, sem2; // +

    BankAccount() {
        sem = new Semaphore(1);
        sem2 = new Semaphore(0);
    }

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