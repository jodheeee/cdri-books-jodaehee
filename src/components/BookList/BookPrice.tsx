import type { BookDocument } from "@/pages/search/modules/queries/interface";

export default function BookPrice({
  book,
  className = "",
}: {
  book: BookDocument;
  className?: string;
}) {
  const hasSale = book.sale_price > 0 && book.sale_price !== book.price;

  return (
    <div className={`text-right ${className}`}>
      {hasSale && (
        <>
          <p>
            <span className="font-tiny text-text-subtitle">원가 </span>
            <span className="text-[18px] font-medium text-text-primary line-through">
              {book.price.toLocaleString()}원
            </span>
          </p>
          <p className="mt-1">
            <span className="font-tiny text-text-subtitle">할인가 </span>
            <span className="font-title3 text-text-primary">
              {book.sale_price.toLocaleString()}원
            </span>
          </p>
        </>
      )}
      {!hasSale && (
        <p>
          <span className="font-tiny text-text-subtitle">원가 </span>
          <span className="font-title3 text-text-primary">
            {book.price.toLocaleString()}원
          </span>
        </p>
      )}
      <a
        href={book.url}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center font-body2 text-white bg-primary px-[90px] py-4 rounded-lg leading-none mt-7"
      >
        구매하기
      </a>
    </div>
  );
}
