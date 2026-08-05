<script lang="ts">
  import { currentLocale, getT } from "@/i18n";

  interface Props {
    state: {
      categories: number;
      posts: number;
      tags: number;
    };
  }

  const { state }: Props = $props();
  const t = getT(currentLocale);
</script>

{#if state && (state.posts || state.categories || state.tags)}
  <nav
    aria-label={t("accessibility.siteStatistics")}
    class="state flex justify-center leading-[1.4] mt-2.5 overflow-hidden text-center whitespace-nowrap"
  >
    {#if state.posts && state.posts > 0}
      <div class="item px-[15px]">
        <a
          href="/archives/"
          class="no-underline [border-bottom:none] text-inherit"
        >
          <span class="block text-lg font-semibold text-center"
            >{state.posts}</span
          >
          <span class="text-[0.8125rem] text-inherit"
            >{t("sidebar.state.posts")}</span
          >
        </a>
      </div>
    {/if}
    {#if state.categories && state.categories > 0}
      <div class="item px-[15px]">
        <a
          href="/categories/"
          class="no-underline [border-bottom:none] text-inherit"
        >
          <span class="block text-lg font-semibold text-center"
            >{state.categories}</span
          >
          <span class="text-[0.8125rem] text-inherit"
            >{t("sidebar.state.categories")}</span
          >
        </a>
      </div>
    {/if}
    {#if state.tags && state.tags > 0}
      <div class="item px-[15px]">
        <a href="/tags/" class="no-underline [border-bottom:none] text-inherit">
          <span class="block text-lg font-semibold text-center"
            >{state.tags}</span
          >
          <span class="text-[0.8125rem] text-inherit"
            >{t("sidebar.state.tags")}</span
          >
        </a>
      </div>
    {/if}
  </nav>
{/if}

<style>
  /* :not 伪类选择器无法原子化，保留 */
  .state .item:not(:first-child) {
    border-left: 0.0625rem solid var(--grey-4);
  }
</style>
