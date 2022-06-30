type BILLS = 5000 | 1000 | 500 | 100 | 50;

type InitialValue = {
  5000?: number;
  1000?: number;
  500?: number;
  100?: number;
  50?: number;
};

type getMoney = (money: number) => Promise<void>;

type createATM = (initial: InitialValue) => getMoney;

type stepDelay = (bill: BILLS, delay: number) => Promise<void>;

type steps = (length: number) => number[];
