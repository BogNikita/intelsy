const initialValue = {
  5000: 0,
  1000: 7,
  500: 1,
  100: 11,
};
const DURATIONS = { 5000: 500, 1000: 400, 500: 300, 100: 200, 50: 100 };

function stepDelay(bill, delay) {
  return new Promise((res) => {
    setTimeout(function () {
      res(console.log(bill));
    }, delay);
  });
}

const steps = (n) => {
  const result = [];
  for (let i = 1; i <= n; i++) {
    result.push(i);
  }
  return result;
};

const createATM = (initialBills) => {
  const sortBills = Object.keys(initialBills).sort((a, b) => b - a);
  let prevOperationInProgress = false;
  return async function getMoney(money) {
    if (prevOperationInProgress) {
      setTimeout(() => {
        getMoney(money);
      }, 0);
    } else {
      prevOperationInProgress = true;
      const result = {};
      const allMoney = Object.entries(initialBills).reduce(
        (acc, item) => acc + item[0] * item[1],
        0,
      );
      let delay = 0;

      if (money > allMoney) {
        console.log('В банкомате недостаточно денег');
        return;
      }

      for (const bill of sortBills) {
        const countBills = initialBills[bill];
        const billsSum = countBills * bill;
        if (countBills > 0 && money >= bill) {
          let countNote = Math.floor(money / bill);

          while (billsSum < countNote * bill) {
            countNote--;
          }

          delay += DURATIONS[bill];
          const stepsBill = steps(countNote);

          for (const _ of stepsBill) {
            await stepDelay(bill, delay);
          }

          initialBills[bill] -= countNote;
          result[bill] = countNote;
          money -= bill * countNote;
        }
      }

      prevOperationInProgress = false;

      if (money !== 0) {
        console.log('Нет подходящих купюр');
        return;
      }
      console.log(result);
      return;
    }
  };
};

const getMoney = createATM(initialValue);

getMoney(3700);
getMoney(700);
getMoney(600);
