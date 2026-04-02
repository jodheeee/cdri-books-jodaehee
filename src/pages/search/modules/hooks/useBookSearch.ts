import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { searchBooks } from "../queries";

export function useBookSearch(query: string, size = 10) {
  return useSuspenseInfiniteQuery({
    queryKey: ["books", query, size],
    queryFn: ({ pageParam }) => searchBooks({ query, page: pageParam, size }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.meta.is_end ? undefined : lastPageParam + 1,
  });
}
