import { Category } from "@/types/category";
import Image from "next/image";

interface CategoryCarouselProps {
  categories: Category[];
}

export default function CategoryCarousel({
  categories,
}: CategoryCarouselProps) {
  const category = categories[0];

  return (
    <section>
      <h2>{category.name}</h2>

      <p>{category.description}</p>

      <Image
        src={category.image}
        alt={category.name}
        width={443}
        height={853}
      />
    </section>
  );
}
