export interface profileType {
    id: number,
    user_id: number,
    company_name: string,
    tax_number: string,
    company_email: string,
    city: string,
    zip: number | null,
    street: string,
    house_number: string,
    company_phone: string
};

export type DataPoint = { x: number, y: number };

export type LineChartProps = {
    width: number;
    height: number;
    data: DataPoint[];
}

export type MyOfferProps = {
    id: number;
    profile_id: number;
    offer_number: string;
    offer_name: string;
    status: string;
    dated: Date;
    valid_until: Date;
    currency: string;
    tax_percent: number;
    net_total: number;
    gross_total: number;
    client_name: string;
    client_email: string;
    client_phone: string;
    client_tax_number: string;
    client_zip: number;
    client_city: string;
    client_street: string;
    client_house_number: string;
};