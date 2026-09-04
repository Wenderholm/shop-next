interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="mx-auto w-full max-w-360 px-4 lg:px-0">{children}</div>
  );
}

// mx-auto → wyśrodkuj kontener.
// m = margin
// x = oś pozioma (left + right)
// auto = automatyczny margines
// CSS:
// margin-left: auto;
// margin-right: auto;
// Efekt: Element zostaje wyśrodkowany.

// w-full → zajmij całą dostępną szerokość.
// w-full
// w = width
// full = 100%
// CSS:
// width: 100%;
// Efekt:Kontener zajmuje całą dostępną szerokość, dopóki nie ograniczy go max-width.

// max-w-[1440px] → nie przekraczaj 1440 px.
// max = maksymalna
// w = width
// [1440px] = własna wartość
// CSS:
// max-width: 1440px;
// Efekt:Kontener nigdy nie będzie szerszy niż 1440 px.

// px-4 → na małych ekranach dodaj po 16 px odstępu z lewej i prawej.
// p = padding
// x = lewa + prawa strona
// 4 = 16 px
// CSS:
// padding-left: 16px;
// padding-right: 16px;
// Efekt:Na małych ekranach treść nie dotyka krawędzi.

// lg:px-0 → od rozdzielczości lg usuń ten padding.
// Tutaj pojawia się responsive.
// lg: = od breakpointu lg (domyślnie 1024 px)
// px-0 = usuń padding poziomy
// CSS:
// @media (min-width: 1024px) {
//   padding-left: 0;
//   padding-right: 0;
