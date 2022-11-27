import './style.css';

import { of, map, Observable, Subject } from 'rxjs';

of('World')
  .pipe(map((name) => `Hello, ${name}!`))
  .subscribe(console.log);

// Open the console in the bottom right to see results.

enum Action {
  BUY = 'BUY',
  SELL = 'SELL',
}

class Order {
  constructor(
    public orderId: number,
    public stock: string,
    public action: Action
  ) {}
}

const orders$ = new Subject<Order>();

class Trader {
  constructor(private name: string, private traderId: number) {}

  placeOrders(order: Order) {
    orders$.next(order);
  }
}

const t1 = new Trader('Derek', 1);

const stockExch = orders$.subscribe((a) =>
  console.log('Order placed for :', a.stock, ' with action to: ', a.action)
);
const tradeComm = orders$.subscribe((a) =>
  console.log('Order placed for :', a.stock, ' with action to: ', a.action)
);

t1.placeOrders(new Order(101, 'GOLD', Action.BUY));
t1.placeOrders(new Order(301, 'GOOG', Action.SELL));
// console.log(stockExch);
