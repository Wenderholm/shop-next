import CategoryCarousel from "@/components/home/hero/CategoryCarousel";
import CategorySection from "@/components/home/category/CategorySection";
import { getCategories } from "@/services/category.service";
import RecommendationSection from "@/components/home/featuredProducts/RecommendationSection";
import { getRecommendedProducts } from "@/services/product.service";

export default async function Home() {
  const categories = await getCategories();
  const products = await getRecommendedProducts();

  return (
    <>
      <CategoryCarousel categories={categories} />

      <CategorySection categories={categories} />

      <RecommendationSection products={products} />
    </>
  );
}
