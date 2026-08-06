export interface SiteUptimeUnits {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  second: string;
  separator?: string;
}

export function formatSiteUptime(createdAt: Date, now: Date, units: SiteUptimeUnits): string {
  const diff = Math.max(0, now.getTime() - createdAt.getTime());
  const totalSeconds = Math.floor(diff / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);
  const totalMonths = Math.floor(totalDays / 30);
  const years = Math.floor(totalMonths / 12);

  const values = [
    [years, units.year],
    [totalMonths % 12, units.month],
    [totalDays % 30, units.day],
    [totalHours % 24, units.hour],
    [totalMinutes % 60, units.minute],
    [totalSeconds % 60, units.second],
  ] as const;

  const parts = values.filter(([value]) => value > 0).map(([value, unit]) => `${value}${unit}`);

  return parts.length > 0 ? parts.join(units.separator ?? "") : `0${units.second}`;
}
