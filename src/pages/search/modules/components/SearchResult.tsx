import { useEffect } from "react";
import { useBookSearch } from "../hooks/useBookSearch";
import BookList from "../../../../components/BookList";
import EmptyResult from "../../../../components/EmptyResult";

interface SearchResultProps {
  query: string;
  onCountChange: (count: number) => void;
}

export default function SearchResult({ query, onCountChange }: SearchResultProps) {
  const { data } = useBookSearch({ query, size: 10 });

  useEffect(() => {
    onCountChange(data.meta.total_count);
  }, [data.meta.total_count, onCountChange]);

  return data.documents.length > 0 ? (
    <div className="mt-6">
      <BookList books={data.documents} />
    </div>
  ) : (
    <EmptyResult message="검색된 결과가 없습니다." />
  );
}
