import * as _ from "lodash";

const addToObject = (obj: any, key: any, value: any) => {
  if (key in obj) {
    obj[key] += value;
  } else {
    obj[key] = value;
  }
};

export const getTransactions = (expenses: any) => {
  let totalMoneySpent = 0;
  // Make a list of users and amount paid by them.
  let users: any = {};
  for (const expense of expenses) {
    for (const creditor of expense?.creditors || [])
      addToObject(users, `${creditor?.name}_${creditor?.user_id}`, 0);
    for (const debtor of expense?.debtors || []) {
      addToObject(users, `${debtor?.name}_${debtor?.user_id}`, _.toNumber(debtor?.money_paid));
      totalMoneySpent += _.toNumber(debtor?.money_paid);
    }
  }
  // Arrange them according to money paid by them in ascending order
  users = _.sortBy(Object.entries(users), ([key, value]) => value);
  const perHeadCost = totalMoneySpent / users.length;
  const transactions: any = [];
  for (let i = 0; i < users.length - 1; i++) {
    const user = users[i];
    const next_user = users[i + 1];
    const money_to_be_paid = perHeadCost - users[i][1];
    transactions.push({
      payer: user[0].split("_")[0],
      receiver: next_user[0].split("_")[0],
      money_to_be_paid,
    });
    users[i][1] += money_to_be_paid;
    users[i + 1][1] -= money_to_be_paid;
  }
  return { transactions, perHeadCost };
};
