import toggleArrowIcon from "@/icons/toggle-arrow.svg";
import likeOn from "@/icons/like-on.svg";
import type { BookDocument } from "@/pages/search/modules/queries/interface";
import { useWishlistStore } from "@/stores/useWishlistStore";

interface BookItemRowProps {
  book: BookDocument;
  onOpen: () => void;
}

export default function BookItemRow({ book, onOpen }: BookItemRowProps) {
  const wished = useWishlistStore((s) => s.isWished(book.isbn));

  return (
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
          onClick={onOpen}
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
  );
}
