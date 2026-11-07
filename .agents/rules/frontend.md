---
description: Правила клиентской разработки и архитектуры meditation.uz
globs: "client/**/*"
scope: "client/**/*"
---

# Client Directives (meditation.uz)

- **Frameworks:** Без React, Vue или Tailwind. Только нативный DOM, TypeScript, Custom Elements (Web Components) и SCSS.
- **TypeScript:** Соблюдение `erasableSyntaxOnly`, `strict`, `exactOptionalPropertyTypes` и `noUncheckedIndexedAccess`. Запрещены parameter properties (`constructor(public x: ...)` -> объявлять поля класса явно) и `enum` (использовать union types или `as const`).
- **Страницы (Pages):**
  - Каждая страница в `client/src/pages/` экспортирует функцию типа [`Page`](file:///d:/_sites/meditation.uz/client/src/types.ts#L8), возвращающую `PageResult` (`{ html, title?, init?, pageClass? }`).
  - Подключение в роутере [`client/src/router.ts`](file:///d:/_sites/meditation.uz/client/src/router.ts#L5-L17) выполнять через динамический `import()` для сохранения code-splitting.
- **Компоненты (Custom Elements):**
  - Размещать в `client/src/components/`, регистрировать через `customElements.define("c-...", ClassName)`.
  - HTML-разметку выносить в `.html` и импортировать через `?raw`.
- **Трекинг и аналитика:**
  - Вызовы `window.guestTrack` всегда проверять на существование функции перед вызовом.
  - При формировании ссылок на Telegram-бот сохранять передачу `guestID` из `localStorage` (`?start=${attr}__${guestID}`).

