import { useState } from "react";
import toggleArrowIcon from "@/icons/toggle-arrow.svg";
import likeOn from "@/icons/like-on.svg";
import likeOff from "@/icons/like-off.svg";
import type { BookDocument } from "@/pages/search/modules/queries/interface";
import { useWishlistStore } from "@/stores/useWishlistStore";

interface BookListProps {
  books: BookDocument[];
}

function BookPrice({ book, className = "" }: { book: BookDocument; className?: string }) {
  const hasSale = book.sale_price > 0 && book.sale_price !== book.price;

  return (
    <div className={`text-right ${className}`}>
      {hasSale && (
        <p>
          <span className="font-tiny text-text-subtitle">원가 </span>
          <span className="text-[18px] font-medium text-text-primary line-through">
            {book.price.toLocaleString()}원
          </span>
        </p>
      )}
      {hasSale && (
        <p className="mt-1">
          <span className="font-tiny text-text-subtitle">할인가 </span>
          <span className="font-title3 text-text-primary">
            {book.sale_price.toLocaleString()}원
          </span>
        </p>
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

function BookItem({ book }: { book: BookDocument }) {
  const [open, setOpen] = useState(false);
  const { toggle, isWished } = useWishlistStore();
  const wished = isWished(book.isbn);

  return (
    <div>
      {open ? (
        <div className="relative px-4 pt-[44px] pb-10">
          <div className="flex">
            <div className="relative shrink-0">
              <img
                src={book.thumbnail}
                alt={book.title}
                width={210}
                height={280}
                loading="lazy"
                decoding="async"
                className="w-[210px] h-[280px] object-cover"
              />
              <button
                onClick={() => toggle(book)}
                className="absolute top-3 right-2.5"
              >
                <img
                  src={wished ? likeOn : likeOff}
                  alt="찜"
                  className="w-5 h-[17px]"
                />
              </button>
            </div>
            <div className="ml-8 flex-1">
              <div className="flex items-start justify-between">
                <div className="flex items-baseline gap-4">
                  <p className="font-title3 text-text-primary">{book.title}</p>
                  <p className="font-body2 text-text-secondary">
                    {book.authors.join(", ")}
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-[5px] font-body2 text-text-secondary bg-light-gray px-4 py-4 rounded-lg leading-none shrink-0"
                >
                  상세보기
                  <img
                    src={toggleArrowIcon}
                    alt="토글"
                    className="w-3 h-3 align-middle transition-transform"
                  />
                </button>
              </div>
              <p className="font-body2-bold text-text-primary mt-4">책 소개</p>
              <p className="w-[360px] h-[180px] text-[10px] leading-[14px] text-text-primary mt-3 overflow-hidden">
                {book.contents}
              </p>
            </div>
          </div>
          <BookPrice book={book} className="absolute bottom-10 right-4" />
        </div>
      ) : (
        <div className="flex items-center py-[15px] px-4">
          <div className="relative shrink-0">
            <img
              src={book.thumbnail}
              alt={book.title}
              width={48}
              height={68}
              loading="lazy"
              decoding="async"
              className="w-12 h-[68px] object-cover"
            />
            {wished && (
              <img
                src={likeOn}
                alt="찜"
                className="absolute top-0 right-0 w-3 h-3"
              />
            )}
          </div>
          <div className="flex items-baseline w-[480px] ml-12">
            <p className="font-title3 text-text-primary shrink-0 max-w-[300px] truncate">{book.title}</p>
            <p className="font-body2 text-text-secondary ml-4 truncate">
              {book.authors.join(", ")}
            </p>
          </div>
          <p className="font-title3 text-text-primary ml-[22px] w-[100px] shrink-0">
            {book.sale_price > 0
              ? book.sale_price.toLocaleString()
              : book.price.toLocaleString()}
            원
          </p>
          <div className="flex items-center gap-2 ml-auto shrink-0">
            <a
              href={book.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center font-body2 text-white bg-primary px-7 py-4 rounded-lg leading-none"
            >
              구매하기
            </a>
            <button
              onClick={() => setOpen(true)}
              className="flex items-center justify-center gap-[5px] font-body2 text-text-secondary bg-light-gray px-4 py-4 rounded-lg leading-none"
            >
              상세보기
              <img
                src={toggleArrowIcon}
                alt="토글"
                className="w-3 h-3 align-middle transition-transform rotate-180"
              />
            </button>
          </div>
        </div>
      )}
      <div className="border-b border-[#D2D6DA]" />
    </div>
  );
}

export default function BookList({ books }: BookListProps) {
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.isbn} book={book} />
      ))}
    </div>
  );
}
