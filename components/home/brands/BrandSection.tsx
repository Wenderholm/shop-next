import { getBrands } from "@/services/brand.service";

import BrandList from "./BrandList";

export default async function BrandSection() {
  const brands = await getBrands();

  return (
    <section className="lg:mx-10 lg:mb-22">
      <BrandList brands={brands} />
    </section>
  );
}
