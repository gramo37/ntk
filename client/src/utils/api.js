import axios from "axios";
import {host} from "../constants"

export const getAllExpenses = async () => {
    const res = await axios.post(`${host}/get-all-expenses`);
    return res.data;
}

export const getAllTransactions = async () => {
    const res = await axios.post(`${host}/show-all-transactions`);
    return res.data;
}

export const getAllUsers = async () => {
    const res = await axios.post(`${host}/get-all-users`);
    return res.data;
}

export const addExpense = async (body) => {
    const res = await axios.post(`${host}/add-expense`, body);
    return res.data;
}

export const deleteExpense = async (body) => {
    const res = await axios.post(`${host}/delete-expense`, body);
    return res.data;
}