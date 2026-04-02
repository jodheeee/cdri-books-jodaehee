import toggleArrowIcon from "@/icons/toggle-arrow.svg";
import likeOn from "@/icons/like-on.svg";
import likeOff from "@/icons/like-off.svg";
import type { BookDocument } from "@/pages/search/modules/queries/interface";
import { useWishlistStore } from "@/stores/useWishlistStore";
import BookPrice from "./BookPrice";

interface BookItemDetailProps {
  book: BookDocument;
  onClose: () => void;
}

export default function BookItemDetail({ book, onClose }: BookItemDetailProps) {
  const { toggle, isWished } = useWishlistStore();
  const wished = isWished(book.isbn);

  return (
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
              onClick={onClose}
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
  );
}
