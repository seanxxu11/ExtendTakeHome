import { LocaleUtils } from "../utils/localeUtils";

export enum TransactionStatus {
    Pending = "PENDING",
    Cleared = "CLEARED",
    Declined = "DECLINED",
    NoMatch = "NO_MATCH",
    AvsPass = "AVS_PASS",
    AvsFail = "AVS_FAIL"
}

export interface ITransactionModel {
    id: string;
    type: string;
    status: TransactionStatus;
    authedAt?: string;
    clearedAt?: string;
    authBillingAmountCents?: number;
    authBillingCurrency?: string;
    clearingBillingAmountCents?: number;
    clearingBillingCurrency?: string;
    merchantName: string;
}

export class TransactionViewModel {
    id: string;
    status: TransactionStatus;
    merchantName: string;
    occurredAt: string;
    amount: string;

    constructor(model: ITransactionModel, localeUtils: LocaleUtils) {
        this.id = model.id;
        this.status = model.status;
        this.merchantName = model.merchantName;

        let occurredAt = model.authedAt;
        if (model.clearedAt) {
            occurredAt = model.clearedAt;
        }
        this.occurredAt = localeUtils.formatDate(occurredAt ?? "");

        let amount = 0;
        let currency = null;
        if (model.authBillingAmountCents) {
            amount = model.authBillingAmountCents / 100;
            currency = model.authBillingCurrency;
        }
        if (model.clearingBillingAmountCents) {
            amount = model.clearingBillingAmountCents / 100;
            currency = model.clearingBillingCurrency;
        }
        this.amount = localeUtils.formatCurrency(amount, currency ?? localeUtils.currency);
    }
}