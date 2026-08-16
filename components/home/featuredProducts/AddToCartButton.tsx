import { Product } from "@/types/product";
import CartIcon from "../../icons/CartIcon";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const handleAddToCart = () => {
    console.log(product.name);
  };

  return (
    <button
      type="button"
      className="
        absolute
    left-6
    top-6
    flex
    h-8
    w-8
    items-center
    justify-center
    rounded-[6px]
    border
    border-[#383B42]
    bg-[#262626]
    text-white
    rounded-[6px]
      "
      onClick={handleAddToCart}
    >
      <CartIcon className="w-6 h-6" />
    </button>
  );
}
