## видеоплеер / Video Player (`<c-v-player>`)

Нативный веб-компонент для воспроизведения вертикального видео (14:9) с превью-постером, плавным раскрытием по клику, индикатором прогресса и отправкой событий просмотра в аналитику.

### Entity Mapping

- **Logic**:
  - [client/src/components/c-v-player/c-v-player.ts](file:///d:/_sites/meditation.uz/client/src/components/c-v-player/c-v-player.ts) — Класс `CVPlayer` (`<c-v-player>`), управление состояниями `is-expanded`, `play/pause`, `onTimeUpdate` и генерация событий `vp:start`, `vp:half`, `vp:complete`.
- **View**:
  - [client/src/components/c-v-player/c-v-player.scss](file:///d:/_sites/meditation.uz/client/src/components/c-v-player/c-v-player.scss) — Стили превью `.vp-preview`, прогресс-полоски `.vp-strip`, видео `.vp-video` и анимации раскрытия.
  - [client/public/26.05.01-video.mp4](file:///d:/_sites/meditation.uz/client/public/26.05.01-video.mp4) — Видеофайл маршрута к залу медитации.
- **DB/Manager**:
  - `window.guestTrack` — Отправка метрик досмотра (`v:start`, `v:half`, `v:complete`) в трекер Ишвары.

### Lifecycle

1. **Инициализация**: При монтировании `connectedCallback()` считывает `data-src` и `data-poster`, рендерит превью и `<video preload="metadata">`.
2. **Раскрытие (`expand`)**: По клику на `.vp-preview` вычисляется высота `offsetWidth * (14 / 9)`, добавляется класс `.is-expanded`, окно плавно скроллится к плееру, через 300 мс стартует воспроизведение.
3. **Трекинг прогресса**: В `timeupdate` обновляется ширина `.vp-strip` и однократно эмитируются события `vp:start` (>0%), `vp:half` (≥50%), `vp:complete` (≥95%).
4. **Завершение**: По достижении 100% (`ratio >= 1`) плеер сворачивается в исходное состояние (удаляется `.is-expanded`).

