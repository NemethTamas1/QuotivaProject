# --- ASSET BUILDER ---
    FROM node:20-alpine AS asset-builder
    WORKDIR /app
    COPY package*.json ./
    RUN npm install
    COPY . .
    RUN npm run build
    
    # --- PRODUCTION RUNTIME ---
    FROM serversideup/php:8.3-fpm-nginx
    
    USER root
    
    RUN apt-get update && apt-get install -y \
        libsqlite3-dev \
        libpng-dev \
        libzip-dev \
        zip \
        unzip \
        git \
        && docker-php-ext-install pdo pdo_sqlite bcmath gd zip \
        && apt-get clean && rm -rf /var/lib/apt/lists/*
    
    COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
    
    WORKDIR /var/www/html
    
    COPY --chown=www-data:www-data . /var/www/html
    
    COPY --from=asset-builder --chown=www-data:www-data /app/public/build /var/www/html/public/build
    
    RUN composer install --no-interaction --optimize-autoloader
    
    RUN chmod -R 755 storage bootstrap/cache
    
    USER www-data
    
    RUN php artisan optimize
    
    EXPOSE 8080