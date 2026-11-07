---
name: a-worktree
description: >-
  Управление изолированными ветками через git worktree.
  Активируется при /a-worktree, фразах "создай новую ветку", "обновить из главной", "слей с основной", "закрой ветку" или при работе с git worktree.
---

# Управление git worktree (/a-worktree)

Регламент создания изолированных рабочих деревьев (worktree), их синхронизации, слияния с основной веткой и очистки.

## Ограничения

1. Директории worktree размещаются строго на уровень выше основного проекта: `../meditation-wt-<имя>`. Ветка именуется `meditation-wt-<имя>`.
2. Запрещено принудительно удалять ветку (`git branch -D`) без прямого указания пользователя.
3. При конфликтах слияния немедленно останавливать процесс, выводить список конфликтных файлов и ждать инструкций пользователя.

## Аргументы и триггеры

- `создай новую ветку <имя>` / `/a-worktree new <имя>`: создание ветки и папки worktree (`git worktree add ../meditation-wt-<имя> -b meditation-wt-<имя>`), копирование `.agents/` и `client/.env`.
- `подтяни из основной` / `/a-worktree sync [имя]`: `git -C <путь> merge main` + `npm --prefix <путь>/client run typecheck`.
- `слей с основной` / `/a-worktree merge [имя]`: коммит в worktree, переход в `main` и `git merge meditation-wt-<имя>` без удаления worktree.
- `закрой ветку` / `/a-worktree close [имя]`: слияние в `main`, затем `git worktree remove ../meditation-wt-<имя>` и `git branch -d meditation-wt-<имя>`.

