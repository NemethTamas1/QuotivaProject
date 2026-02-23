<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quotiva - Árajánlat</title>
    <style>
        body {
            background-color: #0a0a0a;;
            color: #ffffff;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }

        nav {
            background-color: #1a1a1a;
            padding: 1rem 2rem;
            border-bottom: 2px solid #39FF14;
            box-shadow: 0 0 15px rgba(57, 255, 20, 0.2);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        nav a {
            color: #39FF14;
            text-decoration: none;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        nav span {
            color: #ffffff;
            font-weight: 300;
        }

        main {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 2rem;
        }

        footer {
            background-color: #1a1a1a;
            text-align: center;
            padding: 1rem;
            color: #666;
            font-size: 0.8rem;
            border-top: 1px solid #333;
        }
    </style>
</head>
<body>
    <main>
        @yield('content')
    </main>
</body>
</html>