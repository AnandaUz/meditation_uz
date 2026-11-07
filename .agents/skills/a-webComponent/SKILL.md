---
name: a-webComponent
description: Создает нативный веб-компонент на Custom Elements с файлами TS, HTML и SCSS в отдельной папке client/src/components/.
---

# Создание веб-компонента (Custom Elements)

Инструкция и сниппеты для генерации нативного веб-компонента в проекте `meditation.uz`.

## Структура папки компонента

Компонент размещается в `client/src/components/<c-name>/`:

```text
<c-name>/
├── <c-name>.ts       # Класс Custom Element, логика и регистрация customElements.define
├── <c-name>.html     # HTML-шаблон компонента (импортируется через ?raw)
└── <c-name>.scss     # Стили компонента
```

## Сниппеты базового кода

### 1. HTML-шаблон (`<c-name>.html`)
```html
<div class="<c-name>">
  {{content}}
</div>
```

### 2. Стили (`<c-name>.scss`)
```scss
@use "@styles/breakpoints";

<c-name> {
  display: block;
}
```

### 3. TypeScript логика (`<c-name>.ts`)
> **Правило:** без parameter properties в конструкторе и без `enum` (`erasableSyntaxOnly: true`).

```typescript
import "./<c-name>.scss";
import template from "./<c-name>.html?raw";

export class CComponent extends HTMLElement {
  connectedCallback(): void {
    const content = this.getAttribute("data-content") ?? "";
    this.innerHTML = template.replace("{{content}}", content);
  }
}

if (!customElements.get("<c-name>")) {
  customElements.define("<c-name>", CComponent);
}
```

