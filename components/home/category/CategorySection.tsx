import { Category } from "@/types/category";
import CategoryGrid from "./CategoryGrid";

interface CategorySectionProps {
  categories: Category[];
}

export default function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section className="my-5 sm:my-25 lg:mx-10">
      <h2
        className="
        mb-8 
        font-medium
        text-[28px]
        leading-10
        tracking-[-0.01em]
      text-foreground"
      >
        Category
      </h2>

      <CategoryGrid categories={categories} />
    </section>
  );
}
