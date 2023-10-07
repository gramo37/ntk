import {
  addExpense,
  getAllExpenses,
  deleteExpense,
  updateExpense,
  showTransactions,
} from "./controllers/expense_controller";
import { addUsers, getAllUsers } from "./controllers/user_controller";

export const injectRoutes = (app: any) => {
  // Display all expenses made at a particular time frame
  app.post("/get-all-expenses", getAllExpenses);

  app.post("/add-expense", addExpense);

  // Delete an expense
  app.post("/delete-expense", deleteExpense);

  // Update an expense
  app.post("/update-expense", updateExpense);

  // Calculate who owes how much in minimum no of transactions
  app.post("/show-all-transactions", showTransactions);

  // User Authentication routes
  app.post("/get-all-users", getAllUsers);

  app.post("/add-users", addUsers);
};
