import closeIcon from "@/icons/search-close-button.svg";
import { useSearchHistoryStore } from "@/stores/useSearchHistoryStore";

interface SearchHistoryProps {
  onSelect: (keyword: string) => void;
}

export default function SearchHistory({ onSelect }: SearchHistoryProps) {
  const { history, remove } = useSearchHistoryStore();

  if (history.length === 0) return null;

  return (
    <div className="absolute top-full left-0 w-[480px] bg-light-gray rounded-b-3xl pt-[35px] pb-5 -mt-6 z-10">
      {history.map((keyword, i) => (
        <div
          key={keyword}
          className={`flex items-center justify-between pl-[51px] pr-7 ${i > 0 ? "mt-5" : ""}`}
        >
          <button
            onClick={() => onSelect(keyword)}
            className="font-body3 text-text-subtitle"
          >
            {keyword}
          </button>
          <button onMouseDown={(e) => e.preventDefault()} onClick={() => remove(keyword)}>
            <img src={closeIcon} alt="삭제" className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
