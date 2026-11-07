## форма / Meet Form (`<c-form-meet>`)

Веб-компонент встроенной формы записи на встречу с полями имени и контакта, клиентской валидацией и резервной кнопкой перехода в Telegram-бот.

### Entity Mapping

- **Logic**:
  - [client/src/components/c-form-meet/c-form-meet.ts](file:///d:/_sites/meditation.uz/client/src/components/c-form-meet/c-form-meet.ts) — Класс `CFormMeet` (`<c-form-meet>`), подстановка текстовых атрибутов и валидация полей `.name` и `.contact`.
- **View**:
  - [client/src/components/c-form-meet/c-form-meet.html](file:///d:/_sites/meditation.uz/client/src/components/c-form-meet/c-form-meet.html) — Шаблон формы `.form-meet`, блока успешной отправки `.formMessage` и ошибки `.formError`.
  - [client/src/components/c-form-meet/c-form-meet.scss](file:///d:/_sites/meditation.uz/client/src/components/c-form-meet/c-form-meet.scss) — Стили полей ввода, состояний `.error` и сообщений.
- **DB/Manager**:
  - [client/src/components/c-anh-to_bot.ts](file:///d:/_sites/meditation.uz/client/src/components/c-anh-to_bot.ts) — Вложенная кнопка `<c-anh-to_bot>` для дублирования заявки через Telegram-бот.

### Lifecycle

1. **Рендер шаблона**: `connectedCallback()` заменяет плейсхолдеры `{{btnText}}`, `{{bottomText}}`, `{{header-text}}` из атрибутов элемента.
2. **Валидация**: При клике на `.btn_send` проверяется заполненность `.name` и `.contact`; при пустом значении выставляется класс `.error` и фокус.
3. **Обратная связь**: При успешной отправке скрывается `.body` и отображается `.formMessage` с введёнными данными и кнопкой Telegram-бота.

