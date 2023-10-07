import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getAllTransactions } from "../../utils/api";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  button_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
  },
  button_link: {
    padding: "10px",
    backgroundColor: "#5ca0d4",
    color: "white",
    fontSize: "16px",
    borderRadius: "5px",
    textDecoration: "none",
    transition: "0.5s",
    "&:hover": {
      scale: 1.1,
    },
  },
});

const Home = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [costPerHead, setCostPerHead] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setIsLoading(true);
    getAllTransactions()
      .then((res) => {
        console.log(res);
        if (res?.success) {
          setData(res?.data?.transactions);
          setCostPerHead(res?.data?.perHeadCost.toFixed(2))
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setData([]);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        All Transactions to settle the trip expenses
      </Typography>
      <Typography variant="h4" gutterBottom>
        Cost Per Head = {costPerHead} Rs
      </Typography>
      {data?.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>PAYER</TableCell>
                <TableCell>RECEIVER</TableCell>
                <TableCell>MONEY TO BE PAID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? data?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : data
              ).map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.payer}</TableCell>
                  <TableCell>{row.receiver}</TableCell>
                  <TableCell>{row.money_to_be_paid.toFixed(2)} Rs</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      ) : (
        <h2 style={{ textAlign: "center" }}>No Transactions to display!</h2>
      )}
      <Box className={classes.button_container}>
        <Button className={classes.button}>
          <Link to="/" className={classes.button_link}>
            Show Expenses
          </Link>
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
