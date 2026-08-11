export interface AboutTimelineEvent {
  datetime: string;
  dateLabel?: string;
  title: string;
  category: string;
  result?: string;
  description: string;
  role?: string;
  learning?: string;
  href?: string;
  featured?: boolean;
  status?: string;
}

export interface AboutTimelineDisplayEvent extends AboutTimelineEvent {
  displayDate: string;
}

export interface AboutTimelineMonthGroup {
  month: string;
  label: string;
  events: AboutTimelineDisplayEvent[];
}

export interface AboutTimelineYearGroup {
  year: string;
  months: AboutTimelineMonthGroup[];
  eventCount: number;
}

const DATE_PATTERN = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/;

function parseTimelineDate(value: string) {
  const match = DATE_PATTERN.exec(value);

  if (!match) {
    throw new Error(`Invalid timeline datetime: ${value}`);
  }

  const [, year, month, day] = match;

  return {
    year,
    month,
    displayDate: day ?? "整月",
  };
}

export function buildAboutTimeline(events: AboutTimelineEvent[]): AboutTimelineYearGroup[] {
  const sortedEvents = [...events].toSorted((a, b) => b.datetime.localeCompare(a.datetime));
  const groups = new Map<string, Map<string, AboutTimelineDisplayEvent[]>>();

  sortedEvents.forEach((event) => {
    const { year, month, displayDate } = parseTimelineDate(event.datetime);
    const yearGroup = groups.get(year) ?? new Map<string, AboutTimelineDisplayEvent[]>();
    const monthGroup = yearGroup.get(month) ?? [];

    monthGroup.push({
      ...event,
      displayDate: event.dateLabel ?? displayDate,
    });
    yearGroup.set(month, monthGroup);
    groups.set(year, yearGroup);
  });

  return [...groups.entries()].map(([year, months]) => ({
    year,
    eventCount: [...months.values()].reduce((count, monthEvents) => count + monthEvents.length, 0),
    months: [...months.entries()].map(([month, monthEvents]) => ({
      month,
      label: `${Number(month)} 月`,
      events: monthEvents,
    })),
  }));
}
