## кнопкаБота / Telegram Bot Button (`<c-anh-to_bot>`)

Конверсионный веб-компонент кнопки перехода в Telegram-бот со сквозной передачей `guestID` посетителя и трекингом целевого клика.

### Entity Mapping

- **Logic**:
  - [client/src/components/c-anh-to_bot.ts](file:///d:/_sites/meditation.uz/client/src/components/c-anh-to_bot.ts) — Класс `CAnhToBot` (`<c-anh-to_bot>`), обработка клика, трекинг цели и формирование deep-link ссылки в Telegram.
- **View**:
  - [client/src/styles/style.scss](file:///d:/_sites/meditation.uz/client/src/styles/style.scss#L777-L825) — Стили кнопки `.btn.btn-meet` и `.anh-to_bot`.
- **DB/Manager**:
  - `localStorage.getItem("guestID")` — Идентификатор гостя от трекера `https://i.esho.uz/tracker.js`.
  - [client/.env](file:///d:/_sites/meditation.uz/client/.env) — Переменная `VITE_TGBOT_MEDITATION_URL` (`https://t.me/uzmeditation_bot`).

### Lifecycle

1. **Рендер**: `connectedCallback()` считывает атрибуты `data-bot-url`, `data-attr` (по умолчанию `"f1"`), `btn-text`, `data-class` и рендерит ссылку `.btn-meet`.
2. **Клик и аналитика**: При клике вызывается `window.guestTrack("goalBtnClick")`.
3. **Сквозная склейка и редирект**: Из `localStorage` извлекается `guestID` и в новой вкладке открывается ссылка `${botUrl}?start=${attr}__${guestID}`.

