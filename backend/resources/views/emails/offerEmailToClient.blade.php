<table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; table-layout: fixed;">
    <tr>
        <td align="center" style="padding: 40px 10px;">
            <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #111827; color: #ffffff; border-radius: 8px; width: 600px; font-family: sans-serif;">

                <tr>
                    <td colspan="4" style="padding: 40px 30px 20px 30px; text-align: center;">
                        <h1 style="margin: 0; font-size: 24px; color: #ffffff;">Tisztelt {{ $offer->client_name }}!</h1>
                        <p style="margin: 10px 0 0 0; font-size: 16px; color: #cccccc;">
                            A(z) {{ $offer->profile->company_name }}({{$offer->profile->user->name}}) árajánlatot állított ki Önnek.
                        </p>
                    </td>
                </tr>

                <tr style="background-color: #1f2937;">
                    <th align="left" style="padding: 12px; font-size: 14px; border-bottom: 1px solid #374151;">Tétel</th>
                    <th align="center" style="padding: 12px; font-size: 14px; border-bottom: 1px solid #374151;">Menny.</th>
                    <th align="right" style="padding: 12px; font-size: 14px; border-bottom: 1px solid #374151;">Anyag ár</th>
                    <th align="right" style="padding: 12px; font-size: 14px; border-bottom: 1px solid #374151;">Munkadíj</th>
                </tr>

                @foreach($offer->items as $item)
                <tr>
                    <td style="padding: 12px; font-size: 14px; border-bottom: 1px solid #374151;">
                        {{ $item->name }}
                    </td>
                    <td align="center" style="padding: 12px; font-size: 14px; border-bottom: 1px solid #374151;">
                        {{ $item->quantity }} {{ $item->quantity_type }}
                    </td>
                    <td align="right" style="padding: 12px; font-size: 14px; border-bottom: 1px solid #374151;">
                        {{ number_format($item->material_unit_price, 0, ',', ' ') }} Ft
                    </td>
                    <td align="right" style="padding: 12px; font-size: 14px; border-bottom: 1px solid #374151;">
                        {{ number_format($item->labor_unit_price, 0, ',', ' ') }} Ft
                    </td>
                </tr>
                @endforeach

                <tr>
                    <td colspan="4" style="padding: 20px 30px; background-color: #1f2937;">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="color: #ffffff; font-size: 14px;">
                            <tr>
                                <td style="padding: 5px 0;">Nettó összesen:</td>
                                <td align="right" style="padding: 5px 0;">{{ number_format($offer->net_total, 0, ',', ' ') }} Ft</td>
                            </tr>
                            <tr>
                                <td style="padding: 5px 0;">ÁFA összesen:</td>
                                <td align="right" style="padding: 5px 0;">{{ number_format($offer->gross_total-$offer->net_total, 0, ',', ' ') }} Ft</td>
                            </tr>
                            <tr>
                                <td colspan="2" style="padding-top: 10px; border-top: 1px solid #4b5563; font-size: 18px; font-weight: bold;">
                                    Mindösszesen: {{ number_format($offer->gross_total, 0, ',', ' ') }} Ft
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <tr>
                    <td colspan="4" align="center" style="padding: 30px;">
                        <table border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td align="center" style="border-radius: 4px; background-color: #10b981; padding: 12px 25px;">
                                    <a href="{{ $acceptUrl }}" style="color: #ffffff; text-decoration: none; font-weight: bold; display: inline-block;">Elfogad</a>
                                </td>
                                <td width="20"></td>
                                <td align="center" style="border-radius: 4px; background-color: #ef4444; padding: 12px 25px;">
                                    <a href="{{ $rejectUrl }}" style="color: #ffffff; text-decoration: none; font-weight: bold; display: inline-block;">Elutasít</a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>