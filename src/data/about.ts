export type AboutProject = {
  name: string;
  href: string;
  icon: string;
  tech: string;
  description: string;
};

export const aboutIntro = {
  name: "Flashingtw",
  grade: "準高二",
  school: "大安高工電子科",
  roles: ["競程新手", "偶爾寫網頁", "大安電研社社長"],
  greeting: "嗨，歡迎來到我的小角落 :D",
  message: "我主要在學競程，也會隨手做一些網頁和小專案。想把在高中生活裡做過的東西留下來 ww",
} as const;

export const aboutProjects = [
  {
    name: "DungeonGenerator",
    href: "https://github.com/Flashingtw/DungeonGenerator-paper",
    icon: "i-ri-layout-grid-line",
    tech: "Java · Minecraft",
    description: "一個會在 Minecraft 裡生成迷宮的插件，順便讓我體驗效能問題有多可怕。",
  },
  {
    name: "CityGenerator",
    href: "https://github.com/Flashingtw/CityGenerator-Paper",
    icon: "i-ri-road-map-line",
    tech: "Java · Minecraft",
    description: "試著用道路和建築模板拼出城市。想法很大，現在還在慢慢長大中。",
  },
  {
    name: "Flashingtw Blog",
    href: "https://github.com/Flashingtw/Flashingtw-Blog",
    icon: "i-ri-window-line",
    tech: "Astro · Svelte",
    description: "就是你現在看到的網站。拿來放筆記、比賽心得，還有高中生活的各種紀錄。",
  },
] satisfies AboutProject[];
