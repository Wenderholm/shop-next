// export default function CarouselDots() {
//   return (
//     <div className="flex items-center gap-3">
//       <div className="h-2 w-2 rounded-full bg-orange"></div>

//       <div className="h-2 w-2 rounded-full bg-[#383B42]"></div>

//       <div className="h-2 w-2 rounded-full bg-[#383B42]"></div>

//       <div className="h-2 w-2 rounded-full bg-[#383B42]"></div>
//     </div>
//   );
// }

interface CarouselDotsProps {
  total: number;
  currentIndex: number;
}

export default function CarouselDots({
  total,
  currentIndex,
}: CarouselDotsProps) {
  return (
    <div className="flex items-center gap-3">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`h-3 w-3 rounded-full ${
            index === currentIndex ? "bg-orange" : "bg-[#383B42]"
          }`}
        />
      ))}
    </div>
  );
}
