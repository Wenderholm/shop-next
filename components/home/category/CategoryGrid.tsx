import { Category } from "@/types/category";
import CategoryCard from "./CategoryCard";

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 gap-[65px] sm:grid-cols-2 lg:grid-cols-5 ">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
