import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Modal, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { VirtualCard } from '../components/VirtualCard';
import { VirtualCardTransactions } from '../components/VirtualCardTransactions';
import { AppRoutes } from '../models/appRoutes';
import { ITransactionModel, TransactionStatus, TransactionViewModel } from '../models/transactionModel';
import { IVirtualCardModel } from '../models/virtualCardModel';
import { Auth } from '../services/auth';
import { LocaleUtils } from '../utils/localeUtils';
import { urlUtils } from '../utils/urlUtils';

export function VirtualCards() {
    const navigate = useNavigate();

    const [virtualCards, setVirtualCards] = useState<IVirtualCardModel[]>();
    const [transactions, setTransactions] = useState<TransactionViewModel[] | null>(null);

    useEffect(() => {
        axios.get(urlUtils.getUrl("virtualcards")).then(r => {
            setVirtualCards(r.data.virtualCards);
        });
    }, []);

    const openTransactionPopup = (virtualCard: IVirtualCardModel) => {
        axios.get(urlUtils.getUrl(`virtualcards/${virtualCard.id}/transactions?status=${TransactionStatus.Cleared}&status=${TransactionStatus.Pending}`))
            .then(r => {
                const transactions: ITransactionModel[] = r.data.transactions;
                setTransactions(transactions.map(t =>
                    new TransactionViewModel(t, new LocaleUtils(virtualCard.recipient.locale, virtualCard.recipient.currency, virtualCard.recipient.timezone))));
            });
    };

    return (
        <>
            <Box display="flex" justifyContent="space-between">
                <h1>Virtual cards</h1>
                <Box display="flex" alignItems="center">
                    <Button variant="outlined" onClick={() => Auth.logout(() => navigate(AppRoutes.login))}>Sign out</Button>
                </Box>
            </Box>
            {!virtualCards ? <Typography>Loading...</Typography> :
                virtualCards.map(vc => <VirtualCard key={vc.id} data={vc} onClick={openTransactionPopup} />)}
            <Modal
                open={transactions !== null}
                onClose={() => setTransactions(null)}>
                <>
                    {transactions && <VirtualCardTransactions transactions={transactions} onClose={() => setTransactions(null)} />}
                </>
            </Modal>
        </>
    );
}