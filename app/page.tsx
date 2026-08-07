import CategoryCarousel from "@/components/category/CategoryCarousel";
import { getCategories } from "@/services/category.service";

export default async function Home() {
  const categories = await getCategories();

  return (
    <>
      <CategoryCarousel categories={categories} />
    </>
  );
}
