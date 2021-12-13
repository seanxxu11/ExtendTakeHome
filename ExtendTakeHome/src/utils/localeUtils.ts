export class LocaleUtils {
    locale: string;
    currency: string;
    timezone: string;

    constructor(locale: string, currency: string, timezone: string) {
        this.locale = locale;
        this.currency = currency;
        this.timezone = timezone;
    }

    formatCurrency(amount: number, currency: string = this.currency) {
        return amount.toLocaleString(this.locale, {
            style: "currency",
            currency: currency
        });
    }

    formatDate(date: string) {
        if (!date) {
            return "";
        }
        return new Date(date).toLocaleDateString(this.locale, { timeZone: this.timezone });
    }
}