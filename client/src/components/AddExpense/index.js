import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { addExpense, getAllUsers } from "../../utils/api";
import * as _ from "lodash";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  memberContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "row",
    gap: "10px",
  },
  debtorContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: "10px",
    "@media (max-width: 600px)": {
      flexDirection: "column",
    },
  },
});

const AddExpenseForm = () => {
  const classes = useStyles();
  const navigate = useNavigate()
  const [reason, setReason] = useState("");
  const [creditors, setCreditors] = useState([{ user_id: "" }]);
  const [debtors, setDebtors] = useState([{ user_id: "", money_paid: 0 }]);

  const [users, setUsers] = useState([]);
  const [showOtherCredtors, setShowOtherCredtors] = useState(true);

  const handleCreditorChange = (index, value) => {
    const updatedCreditors = [...creditors];
    updatedCreditors[index].user_id = value;
    setCreditors(updatedCreditors);
  };

  const handleDebtorChange = (index, field, value) => {
    const updatedDebtors = [...debtors];
    updatedDebtors[index][field] = value;
    setDebtors(updatedDebtors);
  };

  const handleAddCreditor = () => {
    setCreditors([...creditors, { user_id: "" }]);
  };

  const handleAddDebtor = () => {
    setDebtors([...debtors, { user_id: "", money_paid: 0 }]);
  };

  const handleRemoveCreditor = (index) => {
    const updatedCreditors = creditors.filter((_, i) => i !== index);
    setCreditors(updatedCreditors);
  };

  const handleRemoveDebtor = (index) => {
    const updatedDebtors = debtors.filter((_, i) => i !== index);
    setDebtors(updatedDebtors);
  };

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        console.log(res);
        if (res?.success) {
          setUsers(res?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (!showOtherCredtors) {
      const user_id_array = _.map(users, (user) => ({ user_id: user.user_id }));
      setCreditors(user_id_array);
    }
  }, [showOtherCredtors, users]);

  const handleCheckbox = () => {
    setShowOtherCredtors((show) => !show);
  };

  const handleSubmit = () => {
    // Handle form submission here
    addExpense({
      reason,
      creditors,
      debtors,
    })
      .then((res) => {
        console.log(res);
        if(res?.success) {
          alert(res?.data);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add Expense
      </Typography>
      <TextField
        label="Reason"
        fullWidth
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        margin="normal"
      />
      <Box mt={2}>
        <Typography variant="h6" gutterBottom>
          Enter the members involved in the transaction.
        </Typography>
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={!showOtherCredtors}
                onChange={handleCheckbox}
                color="primary"
              />
            }
            label="All members are involved?"
          />
        </Box>
        {showOtherCredtors &&
          creditors.map((creditor, index) => (
            <Box key={index} className={classes.memberContainer}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Member {index + 1}</InputLabel>
                <Select
                  value={creditor.user_id}
                  onChange={(e) => handleCreditorChange(index, e.target.value)}
                >
                  {showOtherCredtors &&
                    users.map((item) => {
                      return (
                        <MenuItem key={item?.user_id} value={item?.user_id}>
                          {item?.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              <IconButton onClick={() => handleRemoveCreditor(index)}>
                <CloseIcon />
              </IconButton>
            </Box>
          ))}
        {showOtherCredtors && (
          <Button variant="outlined" onClick={handleAddCreditor}>
            Add Creditor
          </Button>
        )}
      </Box>
      <Box mt={2}>
        <Typography variant="h6" gutterBottom>
          Enter the members who paid for the expense.
        </Typography>
        {debtors.map((debtor, index) => (
          <Box key={index} className={classes.memberContainer}>
            <Box className={classes.debtorContainer}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Payor {index + 1}</InputLabel>
                <Select
                  value={debtor.user_id}
                  onChange={(e) =>
                    handleDebtorChange(index, "user_id", e.target.value)
                  }
                >
                  {users.map((item) => {
                    return (
                      <MenuItem value={item?.user_id}>{item?.name}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <TextField
                label="Money Paid"
                type="number"
                fullWidth
                value={debtor.money_paid}
                onChange={(e) =>
                  handleDebtorChange(
                    index,
                    "money_paid",
                    parseInt(e.target.value)
                  )
                }
                margin="normal"
              />
            </Box>
            <IconButton onClick={() => handleRemoveDebtor(index)}>
              <CloseIcon />
            </IconButton>
          </Box>
        ))}
        <Button variant="outlined" onClick={handleAddDebtor}>
          Add Debtor
        </Button>
      </Box>
      <Box mt={2}>
        <Button style={{ margin: '10px' }} variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <Button style={{ margin: '10px' }} variant="contained" color="primary" onClick={() => navigate("/")}>
          Go Back
        </Button>
      </Box>
    </Container>
  );
};

export default AddExpenseForm;
