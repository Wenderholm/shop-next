import HeadphoneIcon from "@/components/icons/HeadphoneIcon";

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

const faqs = [
  {
    question: "How fast do you answer?",
    answer:
      "Most support emails get a reply within one business day. Partnership requests can take a little longer.",
  },
  {
    question: "Can I change my order after payment?",
    answer:
      "Yes, if the order has not entered fulfillment yet. Send the order number and the requested change in your message.",
  },
  {
    question: "Do you support business orders?",
    answer:
      "Yes. Use the partnerships contact and include your company name, country, and expected order volume.",
  },
];

export default function ContactPage() {
  return (
    <main className="px-6 pb-20 pt-6 text-white lg:px-10">
      <div className="mx-auto max-w-[1360px]">
        <div className="mb-12 flex flex-wrap items-center gap-4 text-[16px] leading-[26px]">
          <span className="text-[#B0B0B0]">Home</span>
          <span className="text-[#777]">›</span>
          <span className="font-medium text-white">Contact</span>
        </div>

        <section className="relative overflow-hidden rounded-[28px] border border-[#383B42] bg-[#202125] p-8 sm:p-10 lg:p-14">
          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-orange">
                Contact NexusHub
              </p>
              <h1 className="mt-5 text-[40px] font-medium leading-[46px] tracking-[-0.02em] text-[#FCFCFC] sm:text-[56px] sm:leading-[62px]">
                Fast answers for orders, gear advice, and business inquiries.
              </h1>
              <p className="mt-6 max-w-2xl text-[18px] leading-8 text-[#D4D4D4]">
                Reach out when you need help with a purchase, want product
                guidance, or plan to work with NexusHub on a larger scale.
              </p>
            </div>

            <div className="rounded-[24px] border border-[#3D4048] bg-[#202125]/80 p-6 backdrop-blur">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange/15 text-orange">
                <HeadphoneIcon />
              </div>
              <h2 className="mt-6 text-[24px] font-medium leading-8 text-[#FCFCFC]">
                Support Hours
              </h2>
              <div className="mt-5 space-y-4 text-[16px] leading-[26px] text-[#D4D4D4]">
                <div className="flex items-center justify-between gap-4 border-b border-[#33363D] pb-4">
                  <span>Monday - Friday</span>
                  <span className="font-medium text-[#FCFCFC]">
                    09:00 - 18:00
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-[#33363D] pb-4">
                  <span>Saturday</span>
                  <span className="font-medium text-[#FCFCFC]">
                    10:00 - 14:00
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Sunday</span>
                  <span className="font-medium text-[#FCFCFC]">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-5 lg:grid-cols-3">
          {contactCards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-[#383B42] bg-[#262626] p-6 transition hover:border-[#4A4F5F]"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-[#8F939D]">
                {card.title}
              </p>
              <h2 className="mt-4 text-[24px] font-medium leading-8 text-[#FCFCFC]">
                {card.value}
              </h2>
              <p className="mt-4 text-[16px] leading-[26px] text-[#D4D4D4]">
                {card.copy}
              </p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
