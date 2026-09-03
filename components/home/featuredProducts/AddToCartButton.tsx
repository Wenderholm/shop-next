import { Product } from "@/types/product";
import CartIcon from "../../icons/ui/CartIcon";
import { useCartNotification } from "@/contexts/CartNotificationContext";
import { useCart } from "@/contexts/CartContext";
interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { showNotification } = useCartNotification();
  const { addToCart } = useCart();

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const wasAdded = await addToCart(product);

    if (wasAdded) {
      showNotification();
    }
  };
  return (
    <>
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
    z-1
      "
        onClick={handleAddToCart}
      >
        <CartIcon className="w-6 h-6" />
      </button>
    </>
  );
}
