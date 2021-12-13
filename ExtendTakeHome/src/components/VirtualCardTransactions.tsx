import React from "react";
import { Box, Button, Paper, SxProps, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { TransactionViewModel } from "../models/transactionModel";

const style: SxProps = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export interface IVirtualCardTransactionsProp {
    transactions: TransactionViewModel[];
    onClose: () => void;
}

export function VirtualCardTransactions(props: IVirtualCardTransactionsProp) {
    return (
        <Box sx={style}>
            <Typography variant="h6" component="h2" mb={3}>
                Transactions
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date / Time</TableCell>
                            <TableCell>Merchant</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.transactions.map(tx => (
                            <TableRow key={tx.id}>
                                <TableCell component="th" scope="row">
                                    {tx.occurredAt}
                                </TableCell>
                                <TableCell>{tx.merchantName}</TableCell>
                                <TableCell>{tx.status}</TableCell>
                                <TableCell>{tx.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box display="flex" justifyContent="center" mt={5}>
                <Button variant="outlined" onClick={() => props.onClose()}>Close</Button>
            </Box>
        </Box>
    );
}