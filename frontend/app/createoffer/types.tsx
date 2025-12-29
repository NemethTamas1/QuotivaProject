export type QuantityType = "ora" | "db" | "fm" | "m2" | "m3" | "kg";
export type OfferStatus = "pending" | "accepted" | "rejected";

// Readonly string literal
export const AllCurrencies = ["HUF", "EUR"] as const;
export type Currency = typeof AllCurrencies[number];

// Readonly number literal
export const TaxOptions = [0, 27] as const;
export type TaxPercent = typeof TaxOptions[number];

export interface OfferItemInput {
    name: string;
    quantity: number;
    quantity_type: QuantityType;
    labor_unit_price: number;
    material_unit_price: number;
};

export interface OfferItem extends OfferItemInput {
    id: number;
};


export interface CreateOfferForm {
    offer_number: string;
    offer_name: string;
    status: OfferStatus;
    dated: string;
    valid_until: string;
    currency: Currency;
    tax_percent: number;

    client_name: string;
    client_email: string;
    client_phone: string;
    client_tax_number: string;
    client_zip: number;
    client_city: string;
    client_street: string;
    client_house_number: string;

    items: OfferItemInput[];
};