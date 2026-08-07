interface ProductsHeaderProps {
  total: number;
}

export default function ProductsHeader({ total }: ProductsHeaderProps) {
  return (
    <div>
      <h1>Products znalezione </h1>
      <p>{total} products found</p>
      <p>-------------------------------------------------</p>
    </div>
  );
}
