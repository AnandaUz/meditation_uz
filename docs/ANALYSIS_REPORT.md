# Полный анализ проекта «meditation.uz»

> **Дата составления:** 2026-11-07  
> **Версия системы:** meditation.uz v0.8.0  
> **Цель документа:** Технический аудит архитектуры, кода, аналитики, SEO/UX и рекомендации по улучшению.

Связанная документация:
- [ARCHITECTURE.md](file:///d:/_sites/meditation.uz/ARCHITECTURE.md) — системная архитектура и потоки данных.
- [docs/PROJECT_CONTEXT.md](file:///d:/_sites/meditation.uz/docs/PROJECT_CONTEXT.md) — выжимка для AI-ассистента.
- [.agents/glossary/index.md](file:///d:/_sites/meditation.uz/.agents/glossary/index.md) — проектный глоссарий терминов.

---

## 1. Архитектурный и компонентный обзор

### 1.1. Суть и назначение системы
`meditation.uz` — легковесный SPA-лендинг бесплатных коллективных медитаций и асана-классов в Ташкенте, ориентированный на высокую скорость загрузки на мобильных устройствах и конверсию посетителей в подписчиков Telegram-бота `@uzmeditation_bot`.

### 1.2. Ключевые особенности реализации
1. **Zero-Dependency Runtime**: В `client/package.json` отсутствуют внешние runtime-библиотеки (`dependencies: {}`). Вся логика построена на нативных браузерных API (History API, Custom Elements, `<video>`).
2. **Ленивая маршрутизация (`router.ts`)**: Каждая страница подгружается через динамический `import()`, формируя отдельные чанки при сборке Vite.
3. **Сквозная воронка аналитики**: Собственный трекер `https://i.esho.uz/tracker.js` (`trackerProjectID = 10`) генерирует `guestID` в `localStorage`, который при клике на `<c-anh-to_bot>` передаётся в параметр запуска Telegram-бота (`?start=meditation__<guestID>`), связывая веб-сессию с пользователем в Telegram.
4. **Интерактивный видеоплеер (`<c-v-player>`)**: Кастомный элемент с превью-постером, плавным раскрытием под вертикальный формат 14:9, автоскроллом и трекингом глубины просмотра (`vp:start`, `vp:half`, `vp:complete`).

---

## 2. Выявленные технические замечания и точки внимания

1. **Опечатка и дублирование атрибутов в HTML-шаблонах**:
   - В [`client/src/pages/home/home.html`](file:///d:/_sites/meditation.uz/client/src/pages/home/home.html#L154) лишняя двойная кавычка: `<section class="al_center bl-01"">`.
   - В [`home.html`](file:///d:/_sites/meditation.uz/client/src/pages/home/home.html#L106-L114) и [`location.html`](file:///d:/_sites/meditation.uz/client/src/pages/location/location.html#L11-L19) у тегов `<a>` дважды указан атрибут `class` (`class="btn-big btn-maps" ... class="btn-maps"`).
   - В [`client/src/pages/home/home.scss`](file:///d:/_sites/meditation.uz/client/src/pages/home/home.scss#L130) опечатка в единице измерения: `font-size: 20x;` (вместо `20px`).
2. **Обработчик `.btn-maps` вешается только на первую кнопку карт**:
   - В [`home.ts`](file:///d:/_sites/meditation.uz/client/src/pages/home/home.ts#L15-L21) и [`location.ts`](file:///d:/_sites/meditation.uz/client/src/pages/location/location.ts#L16-L22) используется `document.querySelector(".btn-maps")`, который находит только первую ссылку (Яндекс Карты), тогда как клик по второй кнопке (Google Карты) не отправляет событие `guestTrack("btnMaps")`. Рекомендуется использовать `querySelectorAll(".btn-maps")`.
3. **Различие в передаче URL бота на главной странице**:
   - В первом блоке [`home.html`](file:///d:/_sites/meditation.uz/client/src/pages/home/home.html#L47) используется `data-bot-url="{{VITE_TGBOT_MEDITATION_URL}}"`, а в нижнем блоке ([строка 161](file:///d:/_sites/meditation.uz/client/src/pages/home/home.html#L161)) и в [`location.html`](file:///d:/_sites/meditation.uz/client/src/pages/location/location.html#L61) захардкожен `https://t.me/uzmeditation_bot`.
   - При этом в [`c-anh-to_bot.ts`](file:///d:/_sites/meditation.uz/client/src/components/c-anh-to_bot.ts#L4) fallback обращается к `import.meta.env.VITE_BOT_URL`, тогда как в `client/.env` переменная называется `VITE_TGBOT_MEDITATION_URL`.
4. **Неиспользуемые / черновые файлы**:
   - [`client/src/main.ts`](file:///d:/_sites/meditation.uz/client/src/main.ts) — пустой файл (точка входа — `core.ts`).
   - [`client/src/pages/home+/`](file:///d:/_sites/meditation.uz/client/src/pages/home+/home.ts) и [`client/src/pages/settings.ts`](file:///d:/_sites/meditation.uz/client/src/pages/settings.ts) — не подключены в `router.ts`.
   - В [`package.json`](file:///d:/_sites/meditation.uz/package.json#L17) указан workspace `"server"`, однако папка `server/` в репозитории отсутствует.
5. **Упоминание домена в Политике конфиденциальности**:
   - В [`privacy-policy.ts`](file:///d:/_sites/meditation.uz/client/src/pages/privacy-policy.ts#L13) указан домен `esho.uz` вместо `meditation.uz`.

---

## 3. Рекомендации по улучшению (Roadmap)

1. **Исправить трекинг всех кнопок карт (`querySelectorAll`)**:
   - В `home.ts` и `location.ts` заменить `querySelector(".btn-maps")` на `querySelectorAll(".btn-maps").forEach(...)`, чтобы учитывать клики как по Яндекс Картам, так и по Google Картам.
2. **Унифицировать переменную окружения бота**:
   - В `c-anh-to_bot.ts` использовать `import.meta.env.VITE_TGBOT_MEDITATION_URL` по умолчанию, чтобы не дублировать `data-bot-url` в каждом HTML-шаблоне.
3. **Переиспользовать `<c-top>` на главной странице**:
   - В `home.html` блок `.top` свёрстан вручную (строки 2–17), хотя для остальных страниц используется компонент `<c-top></c-top>`.
4. **Очистить опечатки в вёрстке и SCSS**:
   - Исправить `font-size: 20px` в `home.scss`, двойные атрибуты `class` на ссылках карт и лишнюю кавычку в `home.html`.
5. **Добавить OpenGraph / Telegram Preview мета-теги в `index.html`**:
   - Добавить `og:title`, `og:description`, `og:image` (`/photo-ananda2.jpg`) для красивого превью ссылки при пересылке в Telegram и Instagram.

