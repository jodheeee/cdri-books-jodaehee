import { Suspense, useRef, useState } from "react";
import searchIcon from "@/icons/search.svg";
import BookListSkeleton from "@/components/BookList/Skeleton";
import EmptyResult from "@/components/EmptyResult";
import SearchHistory from "@/components/SearchHistory";
import { useSearchHistoryStore } from "@/stores/useSearchHistoryStore";
import SearchResult from "./modules/components/SearchResult";

export default function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [resultCount, setResultCount] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { add } = useSearchHistoryStore();

  const handleSearch = (value?: string) => {
    const searchKeyword = value ?? keyword;
    if (!searchKeyword.trim()) return;
    if (searchKeyword !== query) {
      setResultCount(0);
    }
    setKeyword(searchKeyword);
    setQuery(searchKeyword);
    add(searchKeyword);
    setShowHistory(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex justify-center">
      <div className="w-[1024px] pt-[104px]">
        <h2 className="font-title2 text-text-primary">도서 검색</h2>

        <div className="flex items-center gap-4 mt-6">
          <div className="relative">
            <div className="relative flex items-center gap-4 w-[480px] bg-light-gray rounded-full px-5 py-4 z-20">
              <img src={searchIcon} alt="검색" className="w-5 h-5" />
              <input
                ref={inputRef}
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setShowHistory(true)}
                onBlur={() => setTimeout(() => setShowHistory(false), 150)}
                placeholder="검색어를 입력하세요"
                className="font-body3 text-text-primary placeholder:text-text-subtitle bg-transparent outline-none w-full"
              />
            </div>
            {showHistory && <SearchHistory onSelect={handleSearch} />}
          </div>
          <button className="font-body2 text-text-subtitle border border-text-subtitle rounded-lg p-2.5">
            상세검색
          </button>
        </div>

        <div className="flex items-center gap-4 mt-9">
          <span className="font-body3 text-text-primary">도서 검색 결과</span>
          <span className="font-body3 text-text-primary">
            총 <span className="text-primary">{resultCount}</span>건
          </span>
        </div>

        {query ? (
          <Suspense fallback={<div className="mt-6"><BookListSkeleton /></div>}>
            <SearchResult query={query} onCountChange={setResultCount} />
          </Suspense>
        ) : (
          <EmptyResult message="검색된 결과가 없습니다." />
        )}
      </div>
    </div>
  );
}
