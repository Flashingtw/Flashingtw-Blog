export type AboutLink = {
  label: string;
  href: string;
  icon: string;
};

export type AboutProject = {
  name: string;
  href: string;
  icon: string;
  meta: string;
  description: string;
  highlights?: string[];
  featured?: boolean;
  tone?: "blue" | "orange" | "purple" | "green";
};

export const aboutOverview = {
  eyebrow: "HELLO, WORLD :D",
  title: "嗨，我是 Flashingtw。",
  lead: {
    highlight: "從 APCS 實作 0 分開始，",
    text: "還在慢慢把不會的東西補起來。",
  },
  introduction:
    "我是大安高工電子科學生，也是大安電研社社長。現在主要用 C++ 學演算法與競技程式設計，偶爾用 Java 把奇怪的生成想法做成 Minecraft 插件。這裡記錄我做過的專案、參加過的比賽，還有一路撞牆留下來的筆記。",
  tags: [
    { label: "競技程式設計", icon: "i-ri-code-s-slash-line" },
    { label: "大安電研社社長", icon: "i-ri-group-line" },
    { label: "Minecraft 開發", icon: "i-ri-hammer-line" },
  ],
  links: [
    { label: "GitHub", href: "https://github.com/Flashingtw/", icon: "i-ri-github-fill" },
    { label: "看時間線", href: "#about-timeline", icon: "i-ri-time-line" },
  ] satisfies AboutLink[],
  progress: {
    from: "2025.10",
    to: "NOW",
    label: "APCS 實作",
    value: "0 分 → 4 級",
    note: "不是突然變強，只是每次 WA 之後又多弄懂了一點。",
  },
  focus: {
    title: "現在的主線任務",
    description: "先把正在做的事做好，技能樹之後再慢慢點 ww",
    items: [
      {
        title: "競技程式設計",
        description: "持續練演算法、資料結構與正式賽事的臨場能力。",
        icon: "i-ri-code-box-line",
      },
      {
        title: "社團與交流",
        description: "帶領大安電研社，一起寫題、做東西和交流技術。",
        icon: "i-ri-group-line",
      },
      {
        title: "把想法做出來",
        description: "用 Java 做 Minecraft 生成插件，順便跟效能問題互毆。",
        icon: "i-ri-hammer-line",
      },
    ],
  },
} as const;

export const aboutProjects = [
  {
    name: "DungeonGenerator",
    href: "https://github.com/Flashingtw/DungeonGenerator-paper",
    icon: "i-ri-layout-grid-line",
    meta: "JAVA · PAPER · PROCEDURAL GENERATION",
    description:
      "把 DFS、Kruskal 和 Prim 搬進 Minecraft，做成真的能在伺服器裡運作的迷宮生成插件。迷宮算完只是開始，真正的 Boss 是效能 ww",
    highlights: ["3 種 perfect-maze 演算法", "非同步拓撲計算", "逐 Tick 建造"],
    featured: true,
    tone: "blue",
  },
  {
    name: "CityGenerator",
    href: "https://github.com/Flashingtw/CityGenerator-Paper",
    icon: "i-ri-road-map-line",
    meta: "JAVA · PROCEDURAL GENERATION",
    description:
      "用道路、路口和 `.schem` 模板慢慢拼出城市，把「隨機生成一座城」拆成真的可以跑的小問題。",
    tone: "orange",
  },
  {
    name: "APCS 中級入門",
    href: "/posts/apcs/apcs-mid/",
    icon: "i-ri-book-open-line",
    meta: "ARTICLE · C++",
    description: "把自己從零開始踩過的坑整理成教學，希望下一個人可以少 WA 幾次。",
    tone: "purple",
  },
  {
    name: "CP Practice",
    href: "https://github.com/Flashingtw/CP-Practice",
    icon: "i-ri-code-s-slash-line",
    meta: "PRACTICE · C++",
    description: "競程練習和解題紀錄。看起來可能很亂，但那就是正在升級的證據 :D",
    tone: "green",
  },
] satisfies AboutProject[];
