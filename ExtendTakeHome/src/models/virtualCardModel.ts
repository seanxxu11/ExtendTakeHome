import { IUserDetailsModel } from "./userDetailsModel";

export enum VirtualCardStatus {
    Pending = "PENDING",
    Active = "ACTIVE",
    Canceled = "CANCELLED",
    Expired = "EXPIRED",
    Rejected = "REJECTED",
    Consumed = "CONSUMED"
}

export interface IVirtualCardModel {
    id: string;
    status: VirtualCardStatus;
    limitCents: number;
    balanceCents: number;
    currency: string;
    last4: string;
    companyName: string;
    creditCardDisplayName: string;
    recipient: IUserDetailsModel;
    cardholder: IUserDetailsModel;
    cardImage: {
        id: string;
        contentType: string;
        urls: {
            large: string;
            medium: string;
            small: string;
        }
        textColorRGBA: string;
        hasTextShadow: boolean;
        shadowTextColorRGBA: string;
    }
    validFrom: string;
    validTo: string;
    timezone: string;
    issuer: {
        id: string;
        name: string;
    }
    // additional fields omitted
}