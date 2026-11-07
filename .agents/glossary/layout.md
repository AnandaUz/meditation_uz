## шапка / Layout (`<c-top>`, Header, Footer)

Структурные компоненты каркаса сайта: верхний герой-блок с фотографией и брендингом, глобальная шапка и подвал.

### Entity Mapping

- **Logic**:
  - [client/src/components/c-top/c-top.ts](file:///d:/_sites/meditation.uz/client/src/components/c-top/c-top.ts) — Веб-компонент `CTop` (`<c-top>`) для внутренних страниц и лендинга.
  - [client/src/components/header.ts](file:///d:/_sites/meditation.uz/client/src/components/header.ts) — Функция `renderHeader()` для контейнера `#header`.
  - [client/src/components/footer.ts](file:///d:/_sites/meditation.uz/client/src/components/footer.ts) — Функция `renderFooter()` для контейнера `#footer`.
- **View**:
  - [client/src/components/c-top/c-top.scss](file:///d:/_sites/meditation.uz/client/src/components/c-top/c-top.scss) — Стили `.top`, круглой маски фото (`clip-path: circle(...)`) и плашки `.name`.
  - [client/src/styles/style.scss](file:///d:/_sites/meditation.uz/client/src/styles/style.scss#L77-L137) — Стили `.main-container`, `header`, `footer`.
- **DB/Manager**:
  - [client/src/core.ts](file:///d:/_sites/meditation.uz/client/src/core.ts#L8-L13) — Монтирование `renderHeader()` и `renderFooter()` при старте приложения.

### Lifecycle

1. **Глобальная инициализация**: `core.ts` однократно рендерит `#header` и `#footer` при загрузке SPA.
2. **Монтирование `<c-top>`**: При рендере страницы тег `<c-top>` (или инлайн-блок `.top` на главной) отображает круглое фото `/photo-ananda2.jpg` с `fetchpriority="high"` и ссылку на `/`.
3. **Адаптация**: На планшетах и десктопах (`@include breakpoints.tablet`) позиционирование фото и заголовка перестраивается под ширину `800px`.

