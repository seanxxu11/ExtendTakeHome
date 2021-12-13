import React from "react";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { IVirtualCardModel } from "../models/virtualCardModel";
import { LocaleUtils } from "../utils/localeUtils";

export interface IVirtualCardProps {
    data: IVirtualCardModel;
    onClick: (virtualCard: IVirtualCardModel) => void;
}

export function VirtualCard(props: IVirtualCardProps) {
    const localeUtils = new LocaleUtils(props.data.recipient.locale, props.data.recipient.currency, props.data.recipient.timezone);

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                image={props.data.cardImage.urls.small}
                alt={props.data.issuer.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.data.creditCardDisplayName} (...{props.data.last4})
                </Typography>

                <Box display="flex" flexDirection="column">
                    <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                        <Typography variant="h6">Balance</Typography>
                        <Typography variant="h6" color="success.main">{localeUtils.formatCurrency(props.data.balanceCents / 100)}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                        <Typography variant="subtitle2">Expires on</Typography>
                        <Typography variant="subtitle2">{localeUtils.formatDate(props.data.validTo)}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                        <Typography variant="subtitle2">Recipient</Typography>
                        <Typography variant="subtitle2">{`${props.data.recipient.firstName} ${props.data.recipient.lastName}`}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                        <Typography variant="subtitle2">Card holder</Typography>
                        <Typography variant="subtitle2">{`${props.data.cardholder.firstName} ${props.data.cardholder.lastName}`}</Typography>
                    </Box>
                </Box>

            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => props.onClick(props.data)}>View Transactions</Button>
            </CardActions>
        </Card>
    );
}