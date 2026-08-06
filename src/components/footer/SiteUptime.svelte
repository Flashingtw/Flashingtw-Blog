<script lang="ts">
  import {
    formatSiteUptime,
    type SiteUptimeUnits,
  } from "@/toolkit/formatSiteUptime";

  interface Props {
    siteCreatedAt: string;
    prefix: string;
    units: SiteUptimeUnits;
  }

  let { siteCreatedAt, prefix, units }: Props = $props();
  let now = $state(new Date());

  const createdAt = $derived(new Date(siteCreatedAt));
  const uptime = $derived(formatSiteUptime(createdAt, now, units));

  $effect(() => {
    const intervalId = window.setInterval(() => {
      now = new Date();
    }, 1000);

    return () => window.clearInterval(intervalId);
  });
</script>

<div class="site-uptime">{prefix} {uptime}</div>
