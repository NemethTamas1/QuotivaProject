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