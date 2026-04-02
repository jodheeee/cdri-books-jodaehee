import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { searchBooks } from "../queries";
import type { BookSearchParams } from "../queries/interface";

export function useBookSearch(query: string, target?: string, size = 10) {
  return useSuspenseInfiniteQuery({
    queryKey: ["books", query, target, size],
    queryFn: ({ pageParam }) =>
      searchBooks({
        query,
        page: pageParam,
        size,
        target: target as BookSearchParams["target"],
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.meta.is_end ? undefined : lastPageParam + 1,
  });
}
