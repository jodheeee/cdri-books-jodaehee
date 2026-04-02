import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BookDocument } from "@/pages/search/modules/queries/interface";

interface WishlistState {
  books: BookDocument[];
  toggle: (book: BookDocument) => void;
  isWished: (isbn: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      books: [],
      toggle: (book) => {
        const exists = get().books.some((b) => b.isbn === book.isbn);
        set({
          books: exists
            ? get().books.filter((b) => b.isbn !== book.isbn)
            : [...get().books, book],
        });
      },
      isWished: (isbn) => get().books.some((b) => b.isbn === isbn),
    }),
    { name: "wishlist" }
  )
);
