## роутер / Router & Core

Клиентское SPA-ядро на базе History API для ленивой загрузки страниц, перехвата навигации по ссылкам и управления жизненным циклом рендера.

### Entity Mapping

- **Logic**:
  - [client/src/core.ts](file:///d:/_sites/meditation.uz/client/src/core.ts) — Инициализация приложения (`init`), перехват кликов по внутренним ссылкам `<a>` и подписка на `popstate`.
  - [client/src/router.ts](file:///d:/_sites/meditation.uz/client/src/router.ts) — Таблица маршрутов `routes`, сопоставление `matchRoute()`, функция `render()` и скролл к якорю `scrollToHash()`.
  - [client/src/types.ts](file:///d:/_sites/meditation.uz/client/src/types.ts) — Типы `PageResult`, `Page`, `Routes`.
- **View**:
  - [client/index.html](file:///d:/_sites/meditation.uz/client/index.html) — Корневой каркас `.main-container` со слотами `#header`, `#main`, `#footer`.
- **DB/Manager**:
  - [vercel.json](file:///d:/_sites/meditation.uz/vercel.json) — Серверный rewrite `/(.*) -> /index.html` для поддержки SPA-маршрутов.

### Lifecycle

1. **Bootstrap**: `core.ts` рендерит шапку и подвал, затем вызывает `render()` для текущего `window.location.pathname`.
2. **Matching & Lazy Load**: `matchRoute()` находит совпадение в `routes` (или возвращает `notFoundPage`) и динамически импортирует модуль страницы.
3. **DOM Mount**: `render()` записывает `html` в `<main>`, обновляет `document.title` и классы `document.body`, вызывает `init?.()`.
4. **Post-Render**: Диспатчится глобальное событие `pagerendered` и выполняется плавный скролл к `window.location.hash`.

