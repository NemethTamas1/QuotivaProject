<!DOCTYPE html>
<html>

<head>
    <style>
        .table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }

        .table th,
        .table td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }

        .table th {
            background-color: #f8fafc;
            color: #334155;
        }

        .total-section {
            text-align: right;
            margin-top: 20px;
        }

        .header-info {
            margin-bottom: 30px;
        }
    </style>
</head>

<body>
    <div class="header-info">
        <h2>Szia {{ $offer->client_name }}!</h2>
        <p>Örömmel értesítünk, hogy az alábbi ajánlatod állapota <strong>elfogadottra</strong> módosult.</p>
        <p><strong>Kiállító:</strong> {{ $sender->name }} ({{ $sender->email }})</p>
    </div>

    <h3>Ajánlat tételei:</h3>
    <table class="table">
        <thead>
            <tr>
                <th>Megnevezés</th>
                <th>Mennyiség</th>
                <th>Egységár</th>
                <th>Összesen</th>
            </tr>
        </thead>
        <tbody>
            @foreach($items as $item)
            <tr>
                <td>{{ $item['name'] }}</td>
                <td>{{ $item['quantity'] }} {{ $item['quantity_type'] }}</td>
                <td>{{ number_format($item['labor_unit_price'] + $item['material_unit_price'], 0, ',', ' ') }} Ft</td>
                <td>{{ number_format($item['quantity'] * ($item['labor_unit_price'] + $item['material_unit_price']), 0, ',', ' ') }} Ft</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="total-section">
        <p>Nettó összesen: <strong>{{ number_format($offer->net_total, 0, ',', ' ') }} Ft</strong></p>
        <p>Áfa ({{ $offer->tax_percent }}%): <strong>{{ number_format($offer->gross_total - $offer->net_total, 0, ',', ' ') }} Ft</strong></p>
        <h2 style="color: #22c55e;">Bruttó végösszeg: {{ number_format($offer->gross_total, 0, ',', ' ') }} Ft</h2>
    </div>

    <p style="margin-top: 40px; font-size: 0.9em; color: #64748b;">
        Köszönjük, hogy a <strong>Quotiva</strong> rendszerét választotta!<br>
        Összeállította: {{ $sender->name }}
    </p>
</body>

</html>