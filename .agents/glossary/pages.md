## страницы / Pages (`home`, `location`, `privacy-policy`, `notFound`)

Контентные страницы SPA-приложения: главный лендинг медитаций, страница локации и расписания, политика конфиденциальности и 404.

### Entity Mapping

- **Logic**:
  - [client/src/pages/home/home.ts](file:///d:/_sites/meditation.uz/client/src/pages/home/home.ts) — Контроллер главной страницы `/` (`homePage`), подстановка `VITE_TGBOT_MEDITATION_URL` и трекинг кликов по картам `.btn-maps`.
  - [client/src/pages/location/location.ts](file:///d:/_sites/meditation.uz/client/src/pages/location/location.ts) — Контроллер страницы `/location` (`locationPage`).
  - [client/src/pages/privacy-policy.ts](file:///d:/_sites/meditation.uz/client/src/pages/privacy-policy.ts) — Контроллер страницы `/privacy-policy` (`privacyPolicyPage`).
  - [client/src/pages/notFound.ts](file:///d:/_sites/meditation.uz/client/src/pages/notFound.ts) — Контроллер страницы 404 (`notFoundPage`).
- **View**:
  - [client/src/pages/home/home.html](file:///d:/_sites/meditation.uz/client/src/pages/home/home.html) и [client/src/pages/home/home.scss](file:///d:/_sites/meditation.uz/client/src/pages/home/home.scss) — Разметка и стили лендинга.
  - [client/src/pages/location/location.html](file:///d:/_sites/meditation.uz/client/src/pages/location/location.html) и [client/src/pages/location/location.scss](file:///d:/_sites/meditation.uz/client/src/pages/location/location.scss) — Разметка и стили страницы локации.
- **DB/Manager**:
  - [client/src/router.ts](file:///d:/_sites/meditation.uz/client/src/router.ts#L5-L17) — Регистрация и ленивая подгрузка страниц по маршрутам.

### Lifecycle

1. **Подгрузка шаблона**: Модуль страницы импортирует `.html?raw` и заменяет плейсхолдеры окружения (`{{VITE_TGBOT_MEDITATION_URL}}`).
2. **Монтирование в DOM**: Роутер вставляет `html` в `<main>` и применяет `pageClass` к `document.body`.
3. **Инициализация событий (`init`)**: Навешиваются обработчики кликов по кнопкам Яндекс/Google Карт (`.btn-maps` -> `guestTrack("btnMaps")`).

