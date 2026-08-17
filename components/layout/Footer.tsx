import FooterColumn from "@/components/home/footer/FooterColumn";
import PaymentMethods from "@/components/home/footer/PaymentMethods";

const company = ["About Us", "Contact", "Partner"];

const social = ["Instagram", "Twitter", "Facebook", "LinkedIn"];

const faq = ["Account", "Deliveries", "Orders", "Payments"];

const resources = ["E-books", "Tutorials", "Course", "Blog"];

export default function Footer() {
  return (
    <footer className=" bg-[#222327] px-8 py-35 lg:px-15 lg:py-35">
      <div className="flex flex-col gap-20 lg:flex-row lg:justify-between ">
        <div>
          <h2 className="mb-6 text-[36px] font-semibold leading-[46px] tracking-[-0.01em] text-[#FCFCFC]">
            <span className="text-orange">Nexus</span>Hub
          </h2>

          <p className="mb-10 text-[16px] text-[#E7E7E7] leading-[26px] ">
            © 2023 NexusHub.
            <br />
            All rights reserved.
          </p>

          <PaymentMethods />
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-20">
          <FooterColumn title="Company" items={company} />

          <FooterColumn title="Social" items={social} />

          <FooterColumn title="FAQ" items={faq} />

          <FooterColumn title="Resources" items={resources} />
        </div>
      </div>
    </footer>
  );
}
