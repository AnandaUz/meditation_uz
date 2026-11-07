# Готовые сниппеты для сборки тестов (meditation.uz)

Использовать готовые шаблоны напрямую при поступлении команд от пользователя без предварительного поиска по проекту.

### 1. Монтирование веб-компонента `<c-anh-to_bot>`
```ts
import "@/components/c-anh-to_bot";

document.body.innerHTML = `<c-anh-to_bot data-bot-url="https://t.me/uzmeditation_bot" data-attr="meditation" btn-text="Записаться"></c-anh-to_bot>`;
const el = document.querySelector("c-anh-to_bot") as HTMLElement;
```

### 2. Монтирование видеоплеера `<c-v-player>`
```ts
import "@/components/c-v-player/c-v-player";

document.body.innerHTML = `<c-v-player data-src="/26.05.01-video.mp4" data-poster="/img-path-v2.jpg"></c-v-player>`;
const player = document.querySelector("c-v-player") as HTMLElement;
```

### 3. Проверка роутера (`render`)
```ts
import { render } from "@/router";

document.body.innerHTML = `<main id="main"></main>`;
history.pushState({}, "", "/location");
await render();
expect(document.querySelector("main")?.innerHTML).toContain("Детали встречи");
```

### 4. «реализуй тест» / «!проверь»
Запустить целевой тест:
```bash
npx vitest run --reporter=basic <target.test.ts>
```
При наличии ошибки — отладить и исправить основную программу до прохождения теста.

