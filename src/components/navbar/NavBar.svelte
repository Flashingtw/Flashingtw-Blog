<script lang="ts">
  import type { NavItemType } from "./NavTypes";
  import { onMount } from "svelte";
  import { initTheme, toggleThemeWithTransition } from "./helpers/theme";
  import LeftNavBtn from "./LeftNavBtn.svelte";
  import MenuBar from "./MenuBar.svelte";
  import RightNavBar from "./RightNavBar.svelte";
  import { t } from "@/i18n";

  interface Props {
    name: string;
    navLinks?: NavItemType[];
    clickToggleCallback?: (state: boolean) => void;
    onSearch?: () => void;
  }

  const {
    name,
    navLinks = [],
    clickToggleCallback = () => {},
    onSearch = () => {},
  }: Props = $props();

  let showNav = $state(true);
  let atTop = $state(true);
  let isDark = $state(false);

  onMount(() => {
    if (typeof window === "undefined" || typeof document === "undefined")
      return;

    // Initialize theme based on storage or system preference
    const currentTheme = initTheme(document, window);
    isDark = currentTheme === "dark";

    let lastScroll = window.scrollY;
    atTop = lastScroll <= 0;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        const current = window.scrollY;
        if (current > lastScroll) showNav = false;
        else if (current < lastScroll) showNav = true;

        lastScroll = current;
        atTop = current <= 0;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleToggleTheme = () => {
    if (typeof document === "undefined" || typeof window === "undefined")
      return;

    const next = toggleThemeWithTransition(
      document,
      window,
      isDark ? "dark" : "light",
    );
    isDark = next === "dark";
  };

  const handleSearch = () => onSearch?.();
  const randomPostLabel = t("random.title");
</script>

<nav
  id="nav"
  aria-label="主导航"
  class={`h-12.5 fixed top-0 w-full z-9 backdrop-blur-8 backdrop-saturate-180 ${atTop ? "nav-top" : "nav-bg"}`.trim()}
  style={showNav ? "" : "transform: translateY(-100%);"}
>
  <div
    class="mb-0 ml-auto mr-auto mt-0 flex flex-nowrap h-full w-[calc(100%-0.625rem)] w-85%"
  >
    <LeftNavBtn clickCallback={clickToggleCallback} />
    <MenuBar {name} {navLinks} />
    <RightNavBar>

      <li>
        <button
          type="button"
          class="nav-action text-5 border-none bg-transparent"
          onclick={handleToggleTheme}
          aria-label="Toggle theme"
        >
          <div class={isDark ? "i-ri-moon-line" : "i-ri-sun-line"}></div>
        </button>
      </li>
      <li>
        <button
          type="button"
          id="search"
          class="nav-action text-5 border-none bg-transparent"
          onclick={handleSearch}
          aria-label="Search"
        >
          <div class="i-ri-search-line"></div>
        </button>
      </li>
    </RightNavBar>
  </div>
</nav>

<style>
  #nav {
    /* 增加 backdrop-filter 的過渡，讓毛玻璃效果也能平滑出現 */
    transition: transform 0.4s ease, 
                background-color 0.4s ease, 
                box-shadow 0.4s ease, 
                color 0.4s ease, 
                backdrop-filter 0.4s ease;
    background-image: none !important; 
  }

  /* --- 狀態 1：最上層 (nav-top) --- */
  .nav-top {
    background-color: transparent !important;
    backdrop-filter: blur(10px) saturate(100%); /* 頂部不模糊 */
    color: oklch(0.3 0.05 260) !important;      /* 深色文字 */
  }

  /* --- 狀態 2：滾動後 (nav-bg) --- */
  .nav-bg {
    /* 使用 0.7 的透明度，讓它呈現「半透明深色」的質感 */
    background-color: oklch(0.22 0.02 260 / 0.7) !important;
    
    /* 開啟毛玻璃效果，這是現代網頁最愛用的「半透明質感」 */
    backdrop-filter: blur(12px) saturate(180%);
    
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    color: #ffffff !important; /* 白色文字 */
  }

  .nav-action {
    padding: 0.625rem 0.5rem 0.625rem;
    cursor: pointer;
    color: inherit;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
</style>