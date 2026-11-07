## аналитика / Analytics & Admin Panel

Система сквозной веб-аналитики (Ishvara Tracker, Google Tag Manager, Meta Pixel) и административная страница управления флагами отслеживания.

### Entity Mapping

- **Logic**:
  - [client/index.html](file:///d:/_sites/meditation.uz/client/index.html#L6-L60) — Подключение `tracker.js` (`trackerProjectID = 10`), инициализация GTM (`GTM-KM4SGH5C`) и Meta Pixel (`1280952990820782`) с проверкой флагов `off_GTM` и `off_Pixel`.
  - [client/src/pages/admin/admin.ts](file:///d:/_sites/meditation.uz/client/src/pages/admin/admin.ts) — Страница `/ad` (`adminPage`) для переключения флагов аналитики и ввода ID посетителя.
- **View**:
  - [client/src/pages/admin/admin.scss](file:///d:/_sites/meditation.uz/client/src/pages/admin/admin.scss) — Стили панели управления статистикой (`.admin`, `.btns`, `.btn_big.off`).
- **DB/Manager**:
  - `localStorage` — Ключи `off_GTM`, `off_Pixel`, `off_MyStat`, `good_visiter`, `guestID`.

### Lifecycle

1. **Загрузка страницы**: Скрипты в `<head>` проверяют `localStorage.getItem("off_GTM")` и `localStorage.getItem("off_Pixel")`; если флаги не равны `"true"`, загружаются GTM и Meta Pixel.
2. **Сбор событий**: При действиях пользователя компоненты вызывают `window.guestTrack(event)` (`goalBtnClick`, `btnMaps`, `v:start`, `v:half`, `v:complete`).
3. **Управление через `/ad`**: На странице `/ad` администратор переключает кнопки статуса (сохраняя `"true"`/`"false"` в `localStorage`) или выключает всю статистику кнопкой «Выключить всё».

