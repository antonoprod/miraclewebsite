export type Event = {
  slug: string;
  name: string;
  date: string;
  displayDate: string;
  venue: string;
  city: string;
  description: string;
  image: string;
};

export const events: Event[] = [
  {
    slug: "miracle-calablava",
    name: "MIRACLE x CALABLAVA",
    date: "2026-08-01",
    displayDate: "01.08.2026",
    venue: "Calablava",
    city: "Valencia",
    description:
      "A summer gathering by MIRACLE and CALABLAVA around music, creativity and community.",
    image: "/events/miracle-x-calablava-01-08-2026.png",
  },
];

export const nextEvent = events[0];

export function getEventBySlug(slug: string) {
  return events.find((event) => event.slug === slug);
}
