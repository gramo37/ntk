const { Pool } = require("pg");

export const pool = new Pool({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE,
});

export const executeQuery = async (statement: any, bindings?: any) => {
  try {
    const res = await pool.query(statement, bindings);
    return res.rows;
  } catch (error) {
    console.log(error);
  }
};

export const initdb = async () => {
  await pool.connect();
  const areTablesCreated = await checkTables();
  if (!areTablesCreated) await createTables();
};

const checkTables = async () => {
  const isUsertableCreated = await executeQuery(
    `SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = 'users');`
  );
  const isExpensetableCreated = await executeQuery(
    `SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = 'expenses');`
  );
  const isDebtorstableCreated = await executeQuery(
    `SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = 'debtor_expense');`
  );
  const isCreditorstableCreated = await executeQuery(
    `SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = 'creditor_expense');`
  );
  return (
    isUsertableCreated?.[0].exists &&
    isExpensetableCreated?.[0].exists &&
    isCreditorstableCreated?.[0].exists &&
    isDebtorstableCreated?.[0].exists
  );
};

const createTables = async () => {
  try {
    await executeQuery(`
    CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS expenses (
        expense_id SERIAL PRIMARY KEY,
        reason VARCHAR(255) NOT NULL,
        money_paid DECIMAL(10, 2),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    );
    
    CREATE TABLE IF NOT EXISTS creditor_expense (
        expense_id INT REFERENCES expenses(expense_id) ON DELETE CASCADE,
        user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
        PRIMARY KEY (expense_id, user_id)
    );
    
    CREATE TABLE IF NOT EXISTS debtor_expense (
        expense_id INT REFERENCES expenses(expense_id) ON DELETE CASCADE,
        user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
        money_paid DECIMAL(10, 2),
        PRIMARY KEY (expense_id, user_id)
    );`);
    console.log("Successfully created all tables.")
  } catch (error) {
    console.log(error);
  }
};

// export const client = new Client({
//   connectionString:
//     "postgresql://doadmin:AVNS_1VS0CJfTPo8qGsS9izS@nexttripkuthe-do-user-9474677-0.b.db.ondigitalocean.com:25060/defaultdb?sslmode=require",
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });
// export const client = new Client({
//     user: "doadmin",
//     password: "AVNS_1VS0CJfTPo8qGsS9izS",
//     host: "nexttripkuthe-do-user-9474677-0.b.db.ondigitalocean.com",
//     port: 25060,
//     database: "defaultdb"
// });
