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

export interface AboutTimelineGroup {
  year: string;
  events: AboutTimelineDisplayEvent[];
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
    displayDate: day ? `${month}.${day}` : `${month} 月`,
  };
}

export function buildAboutTimeline(events: AboutTimelineEvent[]): AboutTimelineGroup[] {
  const sortedEvents = [...events].toSorted((a, b) => b.datetime.localeCompare(a.datetime));
  const groups = new Map<string, AboutTimelineDisplayEvent[]>();

  sortedEvents.forEach((event) => {
    const { year, displayDate } = parseTimelineDate(event.datetime);
    const group = groups.get(year) ?? [];

    group.push({
      ...event,
      displayDate: event.dateLabel ?? displayDate,
    });
    groups.set(year, group);
  });

  return [...groups.entries()].map(([year, groupEvents]) => ({
    year,
    events: groupEvents,
  }));
}
