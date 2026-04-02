import { useCallback, useEffect } from "react";
import { useBookSearch } from "../hooks/useBookSearch";
import { useIntersectionObserver } from "../../../../hooks/useIntersectionObserver";
import BookList from "../../../../components/BookList";
import BookListSkeleton from "../../../../components/BookListSkeleton";
import EmptyResult from "../../../../components/EmptyResult";

interface SearchResultProps {
  query: string;
  onCountChange: (count: number) => void;
}

export default function SearchResult({ query, onCountChange }: SearchResultProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useBookSearch(query);

  const allBooks = data.pages.flatMap((page) => page.documents);

  useEffect(() => {
    onCountChange(data.pages[0].meta.total_count);
  }, [data.pages, onCountChange]);

  const loadMore = useCallback(() => {
    if (!isFetchingNextPage) fetchNextPage();
  }, [fetchNextPage, isFetchingNextPage]);

  const bottomRef = useIntersectionObserver(loadMore, hasNextPage);

  return allBooks.length > 0 ? (
    <div className="mt-6">
      <BookList books={allBooks} />
      {isFetchingNextPage && <BookListSkeleton count={3} />}
      <div ref={bottomRef} className="h-1" />
    </div>
  ) : (
    <EmptyResult message="검색된 결과가 없습니다." />
  );
}
