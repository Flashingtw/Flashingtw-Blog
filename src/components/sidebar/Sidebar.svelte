<script lang="ts">
  import type { NavItemType } from "../navbar/NavTypes";
  import type {
    PanelConfig,
    PanelType,
    QuickNavigation,
    RelatedPost,
    SidebarConfig,
    TocItem,
  } from "./SidebarTypes";
  import type { Snippet } from "svelte";
  import { onMount } from "svelte";
  import { sidebarOpen } from "../../stores/sidebarStore";
  import { encryptedTocStore } from "../../stores/encryptedTocStore";
  import { currentLocale, getT } from "@/i18n";
  import SidebarContents from "./SidebarContents.svelte";
  import { initMenuActive } from "./sidebarHelpers";
  import SidebarOverlay from "./SidebarOverlay.svelte";
  import SidebarOverview from "./SidebarOverview.svelte";
  import SidebarPanel from "./SidebarPanel.svelte";
  import SidebarQuick from "./SidebarQuick.svelte";
  import SidebarRelated from "./SidebarRelated.svelte";
  import SidebarTabs from "./SidebarTabs.svelte";

  interface Props {
    config?: SidebarConfig;
    navLinks?: NavItemType[];
    toc?: TocItem[];
    relatedPosts?: RelatedPost[];
    currentSlug?: string;
    navigation?: QuickNavigation;
    siteState: {
      categories: number;
      posts: number;
      tags: number;
    };
    children?: Snippet;
  }

  const {
    config = {
      author: "",
      description: "",
      social: {},
    },
    navLinks = [],
    toc = [],
    relatedPosts = [],
    currentSlug = "",
    navigation = {},
    siteState = {
      categories: 0,
      posts: 0,
      tags: 0,
    },
    children,
  }: Props = $props();

  const t = getT(currentLocale);

  let activePanel: PanelType = $state("overview");
  let sidebarElement: HTMLElement | null = $state(null);
  let innerElement: HTMLElement | null = $state(null);
  let isAffix = $state(false);

  // 合并静态 TOC 和加密文章解密后的 TOC
  let decryptedToc = $state<TocItem[]>([]);

  // 订阅加密 TOC 更新
  $effect(() => {
    const unsubscribe = encryptedTocStore.subscribe((newToc) => {
      if (newToc && newToc.length > 0) {
        decryptedToc = newToc;
      }
    });
    return unsubscribe;
  });

  // 最终使用的 TOC：优先使用解密后的 TOC，否则使用静态 TOC
  const effectiveToc = $derived(decryptedToc.length > 0 ? decryptedToc : toc);

  const menuSource = $derived(navLinks);

  // Determine which panels should be available
  const panels: PanelConfig[] = $derived.by(() => {
    const availablePanels: PanelConfig[] = [];

    // Contents panel (TOC) - only show if there are TOC items
    if (effectiveToc && effectiveToc.length > 0) {
      availablePanels.push({
        id: "contents",
        title: t("sidebar.panels.contents"),
        hasContent: true,
      });
    }

    // Related panel - only show if there are related posts
    if (relatedPosts && relatedPosts.length > 0) {
      availablePanels.push({
        id: "related",
        title: t("sidebar.panels.related"),
        hasContent: true,
      });
    }

    // Overview panel - always available
    availablePanels.push({
      id: "overview",
      title: t("sidebar.panels.overview"),
      hasContent: true,
    });

    return availablePanels;
  });

  // Set default active panel only once on initial render
  let initialized = false;
  $effect(() => {
    if (!initialized && panels.length > 0) {
      initialized = true;
      const hasContents = panels.find((p) => p.id === "contents");
      if (hasContents) {
        activePanel = "contents";
      }
    }
  });

  onMount(() => {
    if (typeof window === "undefined" || typeof document === "undefined")
      return;

    // Initialize menu active state
    initMenuActive();

    let affixThreshold = 0;

    const updateAffixThreshold = () => {
      if (!sidebarElement || !innerElement) {
        affixThreshold = 0;
        return;
      }

      const sidebarTopInDocument =
        sidebarElement.getBoundingClientRect().top + window.scrollY;
      const innerMarginTop = Number.parseFloat(
        window.getComputedStyle(innerElement).marginTop,
      );

      affixThreshold = Math.max(sidebarTopInDocument - innerMarginTop, 0);
    };

    // Handle scroll for affix behavior on desktop
    const handleScroll = () => {
      // Apply affix when scrolled past header and on desktop (width >= 1024px)
      const shouldAffix =
        window.scrollY > affixThreshold && window.innerWidth >= 1024;
      isAffix = shouldAffix;
    };

    const handleResize = () => {
      updateAffixThreshold();
      handleScroll();
    };

    updateAffixThreshold();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  });

  const selectPanel = (panelId: string) => {
    activePanel = panelId as PanelType;
  };
</script>

<!-- Mobile overlay backdrop -->
{#if $sidebarOpen}
  <SidebarOverlay />
{/if}

<aside
  bind:this={sidebarElement}
  id="sidebar"
  class={`${$sidebarOpen ? "on" : ""} ${isAffix ? "affix" : ""}`.trim()}
>
  <div class="inner" bind:this={innerElement}>
    <SidebarTabs {panels} {activePanel} onSelect={selectPanel} />

    <!-- Panels Container -->
    <div class="panels">
      <div class="inner">
        {#each panels as panel (panel.id)}
          <SidebarPanel
            id={panel.id}
            title={panel.title}
            isActive={activePanel === panel.id}
            class={activePanel === panel.id ? "active" : ""}
          >
            {#if panel.id === "overview"}
              <SidebarOverview
                {siteState}
                {config}
                {menuSource}
                avatarImage={children}
              />
            {:else if panel.id === "related"}
              <SidebarRelated posts={relatedPosts} {currentSlug} />
            {:else if panel.id === "contents"}
              <SidebarContents
                toc={effectiveToc}
                isActive={activePanel === "contents"}
              />
            {/if}
          </SidebarPanel>
        {/each}
      </div>
    </div>

    <!-- Quick navigation bar -->
    <SidebarQuick {navigation} isVisible={isAffix || $sidebarOpen} />
  </div>
</aside>

<!-- Mobile dimmer -->
<div 
  class="dimmer" 
  class:active={$sidebarOpen} 
  onclick={() => $sidebarOpen = false}
  onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') $sidebarOpen = false; }}
  role="button"
  tabindex="0"
  aria-label="關閉側邊欄"
></div>

<style>
  /* Sidebar container */
  #sidebar {
    position: static;
    overflow: visible;
    width: 100%;
    top: 0;
    bottom: 0;
  }

  #sidebar::-webkit-scrollbar {
    display: none;
  }

  #sidebar {
    scrollbar-width: none;
  }

  /* Tablet/Mobile styles */
  @media (max-width: 1023px) {
    #sidebar {
      display: none;
      position: fixed;
      right: 0;
      background: var(--grey-1);
      box-shadow: var(--shadow-sidebar-mobile);
      z-index: var(--z-sidebar);
      width: 280px;
      height: 100%;
    }

    #sidebar.on {
      display: block;
    }
  }

  /* Affix styles */
  /* Sidebar inner */
  #sidebar > .inner {
    margin-top: 3.5rem;
    position: relative;
    width: 15rem;
    color: var(--grey-6);
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;
    z-index: var(--z-content);
  }

  #sidebar.affix > .inner {
    position: fixed;
    width: 15rem;
    top: 0;
  }

  #sidebar.affix .panels {
    height: 100vh;
  }

  /* Panels */
  .panels {
    padding: 4.6875rem 0 2rem;
    width: 100%;
    overflow: hidden;
    min-height: 100vh;
  }

  .panels > .inner {
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    width: auto;
    height: 100%;
  }

  @media (max-width: 1023px) {
    #sidebar > .inner {
    width: 100%;
    height: 100%; /* 確保高度為 100%，撐滿側邊欄 */
    display: flex;
    flex-direction: column; /* 改為垂直排列 */
    flex-wrap: nowrap; /* 覆蓋原本預設的 wrap，防止元素被擠到下一行 */
  }
  .panels {
    flex: 1; /* 自動填滿頂部標籤與底部按鈕之間的剩餘空間 */
    min-height: 0; /* 覆蓋全域的 100vh 限制 */
    height: auto; 
    padding: 4.6875rem 0 0; /* 底部 padding 可以設為 0，因為底部已經有按鈕列 */
    display: flex;
    flex-direction: column;
  }
  .panels > .inner {
    margin-top: 0;
    flex: 1; 
    height: 100%;
    overflow-y: auto; /* 當內容過多時，自動產生垂直捲軸 */
    -webkit-overflow-scrolling: touch; /* 讓 iOS 設備上的滑動體驗更順暢 */
    overscroll-behavior: contain;
  }

  }

  .panels > .inner::-webkit-scrollbar {
    display: none;
  }

  /* Dimmer overlay for mobile */
  .dimmer {
    display: none;
  }

  @media (max-width: 1023px) {
    .dimmer {
      background: black;
      height: 100%;
      left: 100%;
      opacity: 0;
      top: 0;
      width: 100%;
      z-index: var(--z-sidebar-overlay);
      transition: opacity 1s;
    }

    .dimmer.active {
      position: fixed;
      display: block;
      opacity: 0.3;
      transform: translateX(-100%);
    }
  }

  /* Dark theme */
  :global([data-theme="dark"]) #sidebar {
    background-color: var(--grey-1);
  }

  /* iPad landscape mode */
  @media screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape),
    screen and (min-width: 768px) and (max-width: 1366px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2),
    screen and (min-width: 768px) and (max-width: 1440px) and (-webkit-min-device-pixel-ratio: 1) {
    #sidebar {
      overflow: visible;
    }
  }
</style>
