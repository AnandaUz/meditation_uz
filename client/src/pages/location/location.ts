import type { Page } from "../../types";
import "../home/home.scss";
import "./location.scss";

import html from "./location.html?raw";
import "@/components/c-top/c-top";
import "@/components/c-anh-to_bot";
import "@components/c-v-player/c-v-player";

export const locationPage: Page = () => {
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
    title: "адрес зала, карта проезда и расписание встреч",
    description:
      "Где проходит коллективная медитация в Ташкенте: Мирзо-Улугбекский район, 1-й проезд Олмачи, 37 (Eco Art Hotel). Схема проезда на Яндекс и Google Картах, видео-маршрут и расписание по субботам.",
  };
};
