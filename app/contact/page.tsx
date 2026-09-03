import HeadphoneIcon from "@/components/icons/product/HeadphoneIcon";

const contactCards = [
  {
    title: "Customer Support",
    value: "support@nexushub.dev",
    copy: "Questions about orders, returns, shipping, or payments.",
  },
  {
    title: "Partnerships",
    value: "partners@nexushub.dev",
    copy: "Collaborations, wholesale inquiries, and brand partnerships.",
  },
  {
    title: "Call Us",
    value: "+48 22 458 91 00",
    copy: "Monday to Friday, 9:00 AM to 6:00 PM CET.",
  },
];

export default function ContactPage() {
  return (
    <main className="px-6 pb-20 pt-6 text-white lg:px-10">
      <div className="mx-auto max-w-[1360px]">
        <div className="mb-12 flex flex-wrap items-center gap-4 text-base leading-6.5">
          <span className="text-foreground-dim">Home</span>
          <span className="text-foreground-subtle">›</span>
          <span className="font-medium text-white">Contact</span>
        </div>

        <section className="relative overflow-hidden rounded-[28px] border border-border-default bg-surface-alt p-8 sm:p-10 lg:p-14">
          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-orange">
                Contact NexusHub
              </p>
              <h1 className="mt-5 text-[40px] font-medium leading-[46px] tracking-[-0.02em] text-foreground sm:text-[56px] sm:leading-[62px]">
                Fast answers for orders, gear advice, and business inquiries.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground-soft">
                Reach out when you need help with a purchase, want product
                guidance, or plan to work with NexusHub on a larger scale.
              </p>
            </div>

            <div className="rounded-3xl border border-[#3D4048] bg-surface-alt/80 p-6 backdrop-blur">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange/15 text-orange">
                <HeadphoneIcon />
              </div>
              <h2 className="mt-6 text-2xl font-medium leading-8 text-foreground">
                Support Hours
              </h2>
              <div className="mt-5 space-y-4 text-base leading-6.5 text-foreground-soft">
                <div className="flex items-center justify-between gap-4 border-b border-[#33363D] pb-4">
                  <span>Monday - Friday</span>
                  <span className="font-medium text-foreground">
                    09:00 - 18:00
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-[#33363D] pb-4">
                  <span>Saturday</span>
                  <span className="font-medium text-foreground">
                    10:00 - 14:00
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Sunday</span>
                  <span className="font-medium text-foreground">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-5 lg:grid-cols-3">
          {contactCards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-border-default bg-surface p-6 transition hover:border-input-border"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-[#8F939D]">
                {card.title}
              </p>
              <h2 className="mt-4 text-2xl font-medium leading-8 text-foreground">
                {card.value}
              </h2>
              <p className="mt-4 text-base leading-6.5 text-foreground-soft">
                {card.copy}
              </p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
