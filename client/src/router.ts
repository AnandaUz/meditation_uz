import type { Page, Routes } from "./types";

import { notFoundPage } from "./pages/notFound";

const routes: Routes = {
  "/": (params) => import("./pages/home/home").then((m) => m.homePage(params)),
  "/ad": (params) =>
    import("./pages/admin/admin").then((m) => m.adminPage(params)),
  "/privacy-policy": (params) =>
    import("./pages/privacy-policy").then((m) => m.privacyPolicyPage(params)),
  // "/meditation": (params) =>
  //   import("@/pages/home/home").then((m) =>
  //     m.meditationPage(params),
  //   ),
  "/location": (params) =>
    import("@pages/location/location").then((m) => m.locationPage(params)),
};

function matchRoute(
  routes: Routes,
  path: string,
): { page: Page; params: Record<string, string> } {
  // Сначала ищем точное совпадение
  if (routes[path]) {
    return { page: routes[path], params: {} };
  }

  // Затем ищем по паттерну
  for (const pattern in routes) {
    const paramNames: string[] = [];
    const regexStr = pattern.replace(/:([^/]+)/g, (_, name) => {
      paramNames.push(name);
      return "([^/]+)";
    });

    const match = path.match(new RegExp(`^${regexStr}$`));
    if (match) {
      const params: Record<string, string> = {};
      paramNames.forEach((name, i) => {
        params[name] = match[i + 1] as string;
      });
      return { page: routes[pattern] as Page, params };
    }
  }

  return { page: notFoundPage, params: {} };
}

export async function render(): Promise<void> {
  const path = window.location.pathname;
  const { page, params } = matchRoute(routes, path);

  try {
    const main = document.querySelector("main");
    if (!main) throw new Error("Элемент main не найден в DOM");

    const result = await page(params);
    const { html, title, description, noindex, init, pageClass } = result;
    main.innerHTML = html;
    document.title = title
      ? `Медитация в Ташкенте — ${title}`
      : "Медитация в Ташкенте — бесплатные коллективные медитации и йога каждую субботу";

    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute(
        "content",
        description ||
          "Медитация в Ташкенте — бесплатные коллективные встречи каждую субботу. Практика медитации для начинающих, асана-класс (йога), расслабление, внутренняя тишина и поддержка единомышленников в Ташкенте.",
      );
    }

    const robotsMeta = document.querySelector('meta[name="robots"]');
    if (robotsMeta) {
      robotsMeta.setAttribute(
        "content",
        noindex ? "noindex, nofollow" : "index, follow",
      );
    }

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      const cleanPath = path === "/" ? "/" : path.replace(/\/+$/, "");
      canonicalLink.setAttribute("href", `https://meditation.uz${cleanPath}`);
    }

    init?.();
    document.body.className = "";
    if (pageClass) {
      document.body.classList.add(pageClass);
    }

    // диспатчим событие после рендера
    window.dispatchEvent(
      new CustomEvent("pagerendered", { detail: { path, params } }),
    );
  } catch (e) {
    console.error("Ошибка роутера:", e);
  }
  scrollToHash();
}
function scrollToHash() {
  const hash = window.location.hash;
  if (!hash) return;

  // небольшая задержка на случай если DOM ещё не готов
  requestAnimationFrame(() => {
    const el = document.querySelector(hash);
    el?.scrollIntoView({ behavior: "smooth" });
  });
}
