export type Event = {
  slug: string;
  name: string;
  date: string;
  displayDate: string;
  venue: string;
  city: string;
  description: string;
  image: string;
  ticketUrl?: string;
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
    ticketUrl:
      "https://site.fourvenues.com/en/calablava_club/events/miracle--club-hasta-2130-pool-hasta-las-0300-01-08-2026-O3NN",
  },
];

export const nextEvent = events[0];

export function getEventBySlug(slug: string) {
  return events.find((event) => event.slug === slug);
}
