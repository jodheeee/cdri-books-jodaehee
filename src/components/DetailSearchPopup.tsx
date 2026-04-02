import { useState } from "react";
import popupCloseIcon from "@/icons/popup-close-button.svg";
import toggleArrowIcon from "@/icons/toggle-arrow.svg";

const TARGETS = [
  { value: "title", label: "제목" },
  { value: "person", label: "저자명" },
  { value: "publisher", label: "출판사" },
] as const;

type Target = (typeof TARGETS)[number]["value"];

interface DetailSearchPopupProps {
  onSearch: (target: Target, keyword: string) => void;
  onClose: () => void;
}

export default function DetailSearchPopup({ onSearch, onClose }: DetailSearchPopupProps) {
  const [target, setTarget] = useState<Target>("title");
  const [keyword, setKeyword] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedLabel = TARGETS.find((t) => t.value === target)!.label;

  const handleSubmit = () => {
    if (!keyword.trim()) return;
    onSearch(target, keyword);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div
      className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[360px] rounded-lg bg-white pt-9 pb-9 px-6 z-30"
      style={{ boxShadow: "0px 4px 14px 6px #97979726", height: 160 }}
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3"
      >
        <img src={popupCloseIcon} alt="닫기" className="w-[11px] h-[11px]" />
      </button>

      <div className="flex items-end gap-1">
        <div className="relative w-[100px]">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center justify-between w-full text-[14px] font-bold text-text-primary border-b border-gray pl-2 pb-1.5"
          >
            {selectedLabel}
            <img
              src={toggleArrowIcon}
              alt="토글"
              className={`w-2.5 h-2.5 transition-transform ${dropdownOpen ? "" : "rotate-180"}`}
            />
          </button>
          {dropdownOpen && (
            <div
              className="absolute top-full left-0 w-full bg-white rounded-lg py-1 z-40"
              style={{ boxShadow: "0px 0px 4px 0px #00000040" }}
            >
              {TARGETS.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => {
                    setTarget(value);
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left pl-2 py-1 text-[14px] font-medium text-text-subtitle"
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="검색어 입력"
          className="flex-1 font-body2 text-text-primary placeholder:text-text-subtitle bg-transparent outline-none border-b border-primary pb-2 pl-2.5"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full font-body2 text-white bg-primary py-2.5 rounded-lg mt-4 leading-none"
      >
        검색하기
      </button>
    </div>
  );
}
