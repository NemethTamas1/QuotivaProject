FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
    git \
    curl \
    unzip \
    libsqlite3-dev \
    libpng-dev \
    libzip-dev \
    zip \
    && docker-php-ext-install pdo pdo_sqlite \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

RUN composer install
RUN npm install

RUN chmod -R 777 storage bootstrap/cache

EXPOSE 8000

CMD php artisan serve --host=0.0.0.0 --port=8000
