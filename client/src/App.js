import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Transactions from "./components/Transactions";
import AddExpense from "./components/AddExpense";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/show-all-transactions" element={<Transactions />} />
        <Route path="/add-expense" element={<AddExpense />} />
      </Routes>
    </Router>
    </QueryClientProvider>
  );
};

export default App;
