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
    <main className="px-4 pb-16 pt-4 text-white sm:px-6 sm:pb-20 sm:pt-6 lg:px-10">
      <div className="mx-auto max-w-340">
        <div className="mb-8 flex flex-wrap items-center gap-3 text-sm leading-6 sm:mb-12 sm:gap-4 sm:text-base sm:leading-6.5">
          <span className="text-foreground-dim">Home</span>
          <span className="text-foreground-subtle">›</span>
          <span className="font-medium text-white">Contact</span>
        </div>

        <section className="relative overflow-hidden rounded-[28px] border border-border-default bg-surface-alt p-5 sm:p-10 lg:p-14">
          <div className="relative grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:gap-10">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-orange sm:text-sm sm:tracking-[0.28em]">
                Contact NexusHub
              </p>
              <h1 className="mt-4 text-[30px] font-medium leading-9 tracking-[-0.02em] text-foreground sm:mt-5 sm:text-[40px] sm:leading-11.5 lg:text-[56px] lg:leading-15.5">
                Fast answers for orders, gear advice, and business inquiries.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-foreground-soft sm:mt-6 sm:text-lg sm:leading-8">
                Reach out when you need help with a purchase, want product
                guidance, or plan to work with NexusHub on a larger scale.
              </p>
            </div>

            <div className="rounded-3xl border border-[#3D4048] bg-surface-alt/80 p-5 backdrop-blur sm:p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange/15 text-orange sm:h-16 sm:w-16">
                <HeadphoneIcon />
              </div>
              <h2 className="mt-5 text-xl font-medium leading-7 text-foreground sm:mt-6 sm:text-2xl sm:leading-8">
                Support Hours
              </h2>
              <div className="mt-5 space-y-4 text-sm leading-6 text-foreground-soft sm:text-base sm:leading-6.5">
                <div className="flex flex-col gap-1 border-b border-[#33363D] pb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <span>Monday - Friday</span>
                  <span className="font-medium text-foreground">
                    09:00 - 18:00
                  </span>
                </div>
                <div className="flex flex-col gap-1 border-b border-[#33363D] pb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <span>Saturday</span>
                  <span className="font-medium text-foreground">
                    10:00 - 14:00
                  </span>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <span>Sunday</span>
                  <span className="font-medium text-foreground">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid w-full min-w-0 gap-4 sm:mt-12 sm:gap-5 lg:grid-cols-3">
          {contactCards.map((card) => (
            <article
              key={card.title}
              className="min-w-0 w-full rounded-2xl border border-border-default bg-surface p-5 transition hover:border-input-border sm:p-6"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-[#8F939D] sm:text-sm sm:tracking-[0.2em]">
                {card.title}
              </p>
              <h2 className="mt-3 w-full wrap-break-word text-[16px] font-medium leading-7 text-foreground sm:mt-4 sm:text-2xl sm:leading-8">
                {card.value}
              </h2>
              <p className="mt-3 text-sm leading-6 text-foreground-soft sm:mt-4 sm:text-base sm:leading-6.5">
                {card.copy}
              </p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
