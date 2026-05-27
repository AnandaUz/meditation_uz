import type { Page } from "../../types";
import html from "@pages/home/home.html?raw";
import "@/components/c-top/c-top";

export const homePage: Page = () => {
  return {
    html: html,
    pageClass: "home-page",
    init() {},
  };
};
