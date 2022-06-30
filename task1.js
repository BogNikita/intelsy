const initialValue = {
  5000: 0,
  1000: 7,
  500: 1,
  100: 11,
};

const createATM = (initialBills) => {
  const sortBills = Object.keys(initialBills).sort((a, b) => b - a);

  return (money) => {
    const result = {};
    const allMoney = Object.entries(initialBills).reduce((acc, item) => acc + item[0] * item[1], 0);
    if (money > allMoney) {
      console.log('В банкомате недостаточно денег');
      return;
    }

    for (const bill of sortBills) {
      const countBills = initialBills[bill];
      const billsSum = countBills * bill;
      if (countBills > 0 && money >= bill) {
        let countBnk = Math.floor(money / bill);

        while (billsSum < countBnk * bill) {
          countBnk--;
        }

        initialBills[bill] -= countBnk;
        result[bill] = countBnk;
        money -= bill * countBnk;
      }
    }

    if (money !== 0) {
      console.log('Нет подходящих купюр');
      return;
    }

    console.log(result);
    return;
  };
};
const getMoney = createATM(initialValue);
getMoney(3700);
getMoney(700);
getMoney(600);
