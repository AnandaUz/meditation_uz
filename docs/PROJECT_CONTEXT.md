# meditation.uz: AI Context Cheatsheet & Knowledge Base

Компактная база знаний для быстрого ввода AI-ассистента в контекст проекта `meditation.uz`.

Связанная документация:
- [ARCHITECTURE.md](file:///d:/_sites/meditation.uz/ARCHITECTURE.md) — детальная архитектура системы и потоки данных.
- [.agents/glossary/index.md](file:///d:/_sites/meditation.uz/.agents/glossary/index.md) — модульный глоссарий терминов (`!роутер`, `!видеоплеер`, `!кнопкаБота`, `!аналитика`, `!шапка`, `!страницы`, `!форма`).
- [docs/ANALYSIS_REPORT.md](file:///d:/_sites/meditation.uz/docs/ANALYSIS_REPORT.md) — технический аудит и рекомендации по улучшению.

---

## 1. Назначение и стек проекта
**meditation.uz** — быстрый SPA-лендинг бесплатных коллективных медитаций и асана-классов в Ташкенте с воронкой записи через Telegram-бот (`@uzmeditation_bot`) и сквозной аналитикой.

- **Стек**: Vanilla TypeScript 6 (`erasableSyntaxOnly: true`), Vite 7, SCSS (`sass-embedded`), Native Web Components (Custom Elements).
- **Монорепозиторий**: `npm workspaces` (`client`, субмодуль `_base`).
- **Деплой**: Vercel (`client/dist`, SPA rewrite на `/index.html`).

---

## 2. Ключевые сущности и компоненты

| Сущность / Тег | Файл | Назначение |
| :--- | :--- | :--- |
| **Bootstrap (`init`)** | [`client/src/core.ts`](file:///d:/_sites/meditation.uz/client/src/core.ts) | Инициализация шапки, подвала, роутера и перехват кликов по внутренним ссылкам `<a>`. |
| **Router (`render`)** | [`client/src/router.ts`](file:///d:/_sites/meditation.uz/client/src/router.ts) | History API роутер с ленивым `import()`, обновлением `main.innerHTML`, `title`, `pageClass`, `pagerendered` и `scrollToHash()`. |
| **`<c-top>` (`CTop`)** | [`client/src/components/c-top/c-top.ts`](file:///d:/_sites/meditation.uz/client/src/components/c-top/c-top.ts) | Верхний блок с фото Ананды и плашкой-ссылкой на главную страницу. |
| **`<c-anh-to_bot>` (`CAnhToBot`)** | [`client/src/components/c-anh-to_bot.ts`](file:///d:/_sites/meditation.uz/client/src/components/c-anh-to_bot.ts) | Кнопка записи через Telegram-бот со сквозной передачей `guestID` в параметр `?start=` и вызовом `guestTrack("goalBtnClick")`. |
| **`<c-v-player>` (`CVPlayer`)** | [`client/src/components/c-v-player/c-v-player.ts`](file:///d:/_sites/meditation.uz/client/src/components/c-v-player/c-v-player.ts) | Видеоплеер с превью, плавным раскрытием (14:9), автоскроллом и событиями `vp:start`, `vp:half`, `vp:complete`. |
| **`<c-form-meet>` (`CFormMeet`)** | [`client/src/components/c-form-meet/c-form-meet.ts`](file:///d:/_sites/meditation.uz/client/src/components/c-form-meet/c-form-meet.ts) | Форма заявки на встречу с валидацией имени и контакта. |
| **Header / Footer** | [`header.ts`](file:///d:/_sites/meditation.uz/client/src/components/header.ts), [`footer.ts`](file:///d:/_sites/meditation.uz/client/src/components/footer.ts) | Глобальные `#header` и `#footer` (ссылки на ТГ-канал, автора и политику конфиденциальности). |

---

## 3. Маршруты приложения (`client/src/router.ts`)

| Маршрут | Страница / Функция | Файл | Описание |
| :--- | :--- | :--- | :--- |
| `/` | `homePage` | [`client/src/pages/home/home.ts`](file:///d:/_sites/meditation.uz/client/src/pages/home/home.ts) | Главный лендинг коллективных медитаций. |
| `/location` | `locationPage` | [`client/src/pages/location/location.ts`](file:///d:/_sites/meditation.uz/client/src/pages/location/location.ts) | Детали встречи, карта проезда («Eco Art Hotel»), видео-маршрут. |
| `/ad` | `adminPage` | [`client/src/pages/admin/admin.ts`](file:///d:/_sites/meditation.uz/client/src/pages/admin/admin.ts) | Админ-панель отключения аналитики (`off_GTM`, `off_Pixel`, `off_MyStat`) в `localStorage`. |
| `/privacy-policy` | `privacyPolicyPage` | [`client/src/pages/privacy-policy.ts`](file:///d:/_sites/meditation.uz/client/src/pages/privacy-policy.ts) | Политика конфиденциальности. |
| `*` (404) | `notFoundPage` | [`client/src/pages/notFound.ts`](file:///d:/_sites/meditation.uz/client/src/pages/notFound.ts) | Страница 404. |

---

## 4. Технические ограничения и конвенции
- **TypeScript (`erasableSyntaxOnly: true`, `strict: true`, `exactOptionalPropertyTypes: true`, `noUncheckedIndexedAccess: true`)**:
  - Запрещены `enum` и `parameter properties` в конструкторах.
  - Проверка типов: `npm --prefix client run typecheck`.
- **Импорты шаблонов**: HTML-шаблоны страниц и компонентов импортируются с суффиксом `?raw` (`import html from "./home.html?raw"`).
- **Переменные окружения** (`client/.env`):
  - `VITE_TGBOT_MEDITATION_URL=https://t.me/uzmeditation_bot`
  - `VITE_API_URL=http://localhost:1020`

