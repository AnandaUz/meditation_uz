import type { Page } from "../../types";
import "./home.scss";
import html from "./home.html?raw";
import "@/components/c-top/c-top";
import "@/components/c-anh-to_bot";
import "@/components/c-v-player/c-v-player";

export const homePage: Page = () => {
  return {
    html: html.replaceAll(
      "{{VITE_TGBOT_MEDITATION_URL}}",
      import.meta.env.VITE_TGBOT_MEDITATION_URL ||
        "https://t.me/uzmeditation_bot",
    ),
    init() {
      document.querySelectorAll(".btn-maps").forEach((btn) => {
        btn.addEventListener("click", () => {
          const track = (window as any).guestTrack;
          if (track) {
            track("btnMaps");
          }
        });
      });
    },
    title: "бесплатные коллективные медитации и йога каждую субботу",
    description:
      "Медитация в Ташкенте — бесплатные коллективные практики медитации и асана-класс (йога) каждую субботу в 9:20. Обучение медитации для начинающих, снятие стресса и общение с единомышленниками.",
  };
};
