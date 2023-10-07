import { sendError, sendSuccess } from "../utils/common";
import { executeQuery } from "../utils/database";

export const getAllUsers = async (req: any, res: any) => {
  try {
    const users = await executeQuery(`select * from users`);
    sendSuccess(req, res, users);
  } catch (error) {
    console.log(error);
    sendError(req, res, error);
  }
};

export const addUsers = async (req: any, res: any) => {
  try {
    const {users} = req.body;
    if(users.length === 0) return sendSuccess(req, res, "Users Added Successfully.");
    let statement = `INSERT INTO users (name, email, password)
    VALUES `
    users.forEach((user: any) => {
      statement += `('${user.name}', '${user.email}', '${user.password}'),`;
    });
    statement = statement.slice(0, -1);
    statement += ";";
    await executeQuery(statement)
    sendSuccess(req, res, "Users Added Successfully.");
  } catch (error) {
    console.log(error);
    sendError(req, res, error);
  }
}