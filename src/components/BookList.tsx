import toggleArrowIcon from "../icons/toggle-arrow.svg";
import type { BookDocument } from "../pages/search/modules/queries/interface";

interface BookListProps {
  books: BookDocument[];
}

function BookItem({ book }: { book: BookDocument }) {
  return (
    <div>
      <div className="flex items-center py-[15px] px-4">
        <img
          src={book.thumbnail}
          alt={book.title}
          className="w-12 h-[68px] object-cover shrink-0"
        />
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
          <button className="flex items-center justify-center gap-[5px] font-body2 text-text-secondary bg-light-gray px-4 py-4 rounded-lg leading-none">
            상세보기
            <img src={toggleArrowIcon} alt="토글" className="w-2 h-3.5" />
          </button>
        </div>
      </div>
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
