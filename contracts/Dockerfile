# Используем официальный образ PHP 8.1 CLI на базе Alpine Linux
FROM php:8.1-cli-alpine

# Устанавливаем необходимые пакеты
RUN apk update && apk add --no-cache \
    git \
    unzip \
    bash \
    gmp \
    gmp-dev \
    && rm -rf /var/lib/apt/lists/*

# Устанавливаем расширение bcmath для работы с большими числами
RUN docker-php-ext-install bcmath gmp

# Удаляем dev-пакеты для уменьшения размера образа
RUN apk del gmp-dev

# Устанавливаем Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы composer и устанавливаем зависимости
COPY composer.json ./
RUN composer install --no-dev --optimize-autoloader

# Копируем остальные файлы проекта
COPY . .

# Указываем команду по умолчанию для запуска вашего скрипта
CMD ["php", "send_back.php"]
