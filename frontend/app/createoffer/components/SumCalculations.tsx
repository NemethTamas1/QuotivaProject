'use client';

interface Props {
    items: any[];
    tax: number;
    currency: string;
};

export default function SumCalculations({ items, tax, currency }: Props) {

    if(items.length === 0 ) return null;

    const sumLabor = items?.reduce((acc, item) =>
        acc + (Number(item.quantity)) * (Number(item.labor_unit_price)), 0 || 0);

    const sumMaterial = items?.reduce((acc, item) =>
        acc + (Number(item.quantity)) * (Number(item.material_unit_price)), 0 || 0);

    const totalNet = sumLabor + sumMaterial;
    const sumTax = Math.floor(totalNet * (tax / 100));
    const totalGross = totalNet + sumTax;

    const formatValue = (value: number) => {
        return new Intl.NumberFormat('hu-HU').format(value);
    };

    return (
        < div className="flex-row pt-5" >
            <div className="flex">
                <h2 className="text-lg lg:text-2xl font-semibold text-green-400" style={{ textShadow: "0px 0px 10px rgba(34, 197, 94, 1" }}> Munkadíj összesen:</h2><span className="text-white text-xl lg:text-2xl pl-2">{formatValue(sumLabor)} {currency}</span>
            </div>

            <div className="flex">
                <h2 className="text-xl lg:text-2xl font-semibold text-green-400" style={{ textShadow: "0px 0px 10px rgba(34, 197, 94, 1" }}> Anyag összesen:
                </h2><span className="text-white text-xl lg:text-2xl pl-2">{formatValue(sumMaterial)} {currency}</span>
            </div>

            <div className="flex">
                {Number(tax) === 0 ? (
                    <>
                        <h2 className="text-xl lg:text-2xl font-semibold text-green-400" style={{ textShadow: "0px 0px 10px rgba(34, 197, 94, 1)" }}> Alanyi adómentes:
                        </h2><span className="text-white text-xl lg:text-2xl pl-2"> 0 {currency}</span>
                    </>
                ) : (
                    <>
                        <h2 className="text-xl lg:text-2xl font-semibold text-green-400" style={{ textShadow: "0px 0px 10px rgba(34, 197, 94, 1)" }}> Áfa összesen:
                        </h2><span className="text-white text-xl lg:text-2xl pl-2">{formatValue(sumTax)} {currency}</span>
                    </>
                )}
            </div>

            <div className="flex">
                <h2 className="text-xl lg:text-2xl font-semibold text-green-400" style={{ textShadow: "0px 0px 10px rgba(34, 197, 94, 1" }}> Végösszeg:
                </h2><span className="text-white text-xl lg:text-2xl pl-2">{formatValue(totalGross)} {currency}</span>
            </div>

        </div >

    );
};