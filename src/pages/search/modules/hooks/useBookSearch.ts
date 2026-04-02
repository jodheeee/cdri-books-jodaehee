import { useSuspenseQuery } from "@tanstack/react-query";
import { searchBooks } from "../queries";
import type { BookSearchParams } from "../queries/interface";

export function useBookSearch(params: BookSearchParams) {
  return useSuspenseQuery({
    queryKey: ["books", params],
    queryFn: () => searchBooks(params),
  });
}
