# American Pizza API

FastAPI-бэкенд для сайта American Pizza. Принимает заказы с сайта
(`POST /api/orders`) и обрабатывает оплату через Payme и Click.

Никакого Telegram-бота здесь больше нет — только REST API. Есть
опциональное уведомление админу в Telegram (одно HTTP-сообщение на новый
заказ), но это не бот: без команд, без polling, без Mini App.

## Требования

- Python 3.8+

## Установка

1. Клонируйте репозиторий:

```bash
git clone <your-repo>
cd premium-pizza/server
```

2. Создайте виртуальное окружение:

```bash
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# или
venv\Scripts\activate  # Windows
```

3. Установите зависимости:

```bash
pip install -r requirements.txt
```

4. Настройте переменные окружения:

```bash
cp .env.example .env
nano .env  # при желании впишите BOT_TOKEN/ADMIN_ID и PAYME_*/CLICK_* ключи
```

5. Запустите сервер:

```bash
python main.py
```

Сервер поднимется на порту **3001** (или том, что указан в `PORT`).
Проверить, что жив: `GET /health`.

6. В `script.js` на сайте укажите адрес этого сервера в `API_BASE_URL`
   (в самом начале файла) — иначе фронтенд не будет знать, куда слать заказы.

## Деплой на сервер

### Вариант 1: Systemd (Ubuntu/Debian)

1. Скопируйте файлы на сервер:

```bash
scp -r . user@server:/var/www/premium-pizza/server
```

2. Установите зависимости на сервере:

```bash
ssh user@server
cd /var/www/premium-pizza/server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

3. Настройте systemd:

```bash
sudo cp pizza-api.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable pizza-api
sudo systemctl start pizza-api
```

4. Проверьте статус:

```bash
sudo systemctl status pizza-api
```

### Вариант 2: Screen (простой способ)

```bash
screen -S pizza-api
cd /var/www/premium-pizza/server
source venv/bin/activate
python main.py
# Нажмите Ctrl+A затем D для выхода
```

Вернуться:

```bash
screen -r pizza-api
```

### Вариант 3: Docker

```bash
docker build -t pizza-api .
docker run -d --name pizza-api -p 3001:3001 --env-file .env pizza-api
```

## Структура проекта

```
server/
├── main.py               # FastAPI сервер (маршруты /api/orders, /payments/*)
├── payme.py               # Payme Merchant (Subscribe) API
├── click_pay.py            # Click Shop API (Prepare/Complete)
├── notifications.py        # Опциональное Telegram-уведомление админу
├── utils.py                # Хранение заказов/транзакций в JSON
├── requirements.txt        # Зависимости
├── .env                    # Конфигурация (не коммитить!)
├── .env.example             # Шаблон конфигурации
└── orders.json              # База заказов (создаётся автоматически)
```

## API Endpoints

- `POST /api/orders` — создать заказ (сайт зовёт это при оформлении)
- `POST /payments/payme` — вебхук Payme (JSON-RPC), регистрируется в кабинете Payme
- `POST /payments/click/prepare` — вебхук Click, шаг Prepare
- `POST /payments/click/complete` — вебхук Click, шаг Complete
- `GET /api/orders/{order_id}/payment-link?method=payme|click` — получить свежую ссылку на оплату для существующего заказа
- `GET /health` — проверка живости

### Формат `POST /api/orders`

```json
{
  "orderDetails": {
    "customer": {
      "name": "Имя",
      "phone": "+998901234567",
      "address": "Адрес доставки",
      "comment": "необязательно",
      "paymentMethod": "cash | payme | click"
    },
    "items": [
      { "id": "pizza-margherita-30", "name": "Маргарита 30см", "count": 2, "price": 55000 }
    ],
    "totalPrice": 110000
  }
}
```

Ответ:

```json
{ "success": true, "orderId": "123456", "paymentUrl": "https://checkout.test.paycom.uz/..." }
```

`paymentUrl` — `null` для наличных, ссылка на оплату для Payme/Click
(фронтенд должен сделать `window.location.href = paymentUrl`).

## Переменные окружения

- `PORT` — порт сервера (по умолчанию 3001)
- `BOT_TOKEN`, `ADMIN_ID` — опционально, для Telegram-уведомления о новом заказе
- `PAYME_MERCHANT_ID`, `PAYME_KEY`, `PAYME_TEST_MODE` — настройки Payme (см. ниже)
- `CLICK_SERVICE_ID`, `CLICK_MERCHANT_ID`, `CLICK_MERCHANT_USER_ID`, `CLICK_SECRET_KEY` — настройки Click (см. ниже)

## Payme и Click

Оплата подключена как обычная merchant-интеграция: Payme/Click дергают наш
сервер вебхуками, сервер не хранит и не видит номера карт.

### Как это работает

1. Клиент оформляет заказ на сайте, форма отправляет `POST /api/orders`.
2. Если выбран Payme или Click, в ответе приходит `paymentUrl` — сайт
   сразу перенаправляет клиента туда (`window.location.href`).
3. После оплаты Payme/Click сами обращаются к нашим вебхукам, сервер
   помечает заказ как оплаченный (`paymentStatus: "paid"`), это видно в
   уведомлении админу (если оно включено).

### Настройка в личных кабинетах

В кабинете Payme (https://cabinet.payme.uz) укажите URL для вебхуков:

```
https://<ваш-домен>/payments/payme
```

В кабинете Click (https://merchant.click.uz) укажите:

```
Prepare URL:  https://<ваш-домен>/payments/click/prepare
Complete URL: https://<ваш-домен>/payments/click/complete
```

Заполните `.env` соответствующими `PAYME_*` и `CLICK_*` значениями из
кабинетов (см. `.env.example`). Пока `PAYME_TEST_MODE=true`, ссылки на
оплату ведут на `checkout.test.paycom.uz` (тестовая касса Payme).

### Важно

- Эндпоинты `/payments/payme`, `/payments/click/prepare`,
  `/payments/click/complete` должны быть доступны по HTTPS — оба провайдера
  этого требуют.
- Логика реализована по официальной документации (Payme Subscribe API,
  Click Shop API), но перед продакшеном стоит свериться с актуальными
  доками и прогнать оплату через тестовую кассу каждого провайдера.
- Данные о транзакциях хранятся рядом с заказами: `payme_transactions.json`
  и `click_transactions.json` (по аналогии с `orders.json`).

## Уведомление админу в Telegram (опционально)

Если заполнить `BOT_TOKEN` и `ADMIN_ID` в `.env`, при каждом новом заказе
на этот chat_id уйдёт одно текстовое сообщение с деталями заказа. Это не
бот — сообщение шлётся напрямую через Telegram Bot API, никаких команд и
диалогов не поддерживается. Если оставить оба поля пустыми, уведомления
просто не будут отправляться, сайт продолжит работать как обычно.

## Логи

Просмотр логов systemd:

```bash
sudo journalctl -u pizza-api -f
```

## Обновление

```bash
git pull
sudo systemctl restart pizza-api
```
