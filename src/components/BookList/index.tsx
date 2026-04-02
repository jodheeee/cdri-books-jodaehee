import { useState } from "react";
import type { BookDocument } from "@/pages/search/modules/queries/interface";
import BookItemRow from "./BookItemRow";
import BookItemDetail from "./BookItemDetail";

interface BookListProps {
  books: BookDocument[];
}

function BookItem({ book }: { book: BookDocument }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {open ? (
        <BookItemDetail book={book} onClose={() => setOpen(false)} />
      ) : (
        <BookItemRow book={book} onOpen={() => setOpen(true)} />
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
