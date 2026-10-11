export type AboutProject = {
  name: string;
  href: string;
  image: string;
  tech: string;
  description: string;
};

export const aboutIntro = {
  name: "Flashingtw",
  grade: "高二",
  school: "大安高工-電子科",
  roles: ["競程新手", "大安電研社社長"],
  greeting: "嗨! 歡迎來到我的網站 :D",
  message: "我主要在學競程,這裡通常都在記錄我的生活及競賽經歷~",
} as const;

export const aboutProjects = [
  {
    name: "DungeonGenerator",
    href: "https://github.com/Flashingtw/DungeonGenerator-paper",
    image: "/assets/projects/minecraft.svg",
    tech: "Java · Minecraft",
    description: "一個會在 Minecraft 裡生成迷宮的插件。",
  },
  {
    name: "anonymous-ig",
    href: "https://github.com/Flashingtw/anonymous-ig",
    image: "/assets/projects/terminal.svg",
    tech: "JavaScript · Web",
    description: "大安匿名投稿網站，包含投稿與管理介面。",
  },
  {
    name: "CP-Practice",
    href: "https://github.com/Flashingtw/CP-Practice",
    image: "/assets/projects/terminal.svg",
    tech: "競程 · 演算法",
    description: "放平常練競程的程式碼，記錄在各個題庫裡慢慢練習的過程。",
  },
] satisfies AboutProject[];
