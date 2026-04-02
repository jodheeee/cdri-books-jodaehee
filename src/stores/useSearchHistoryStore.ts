import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_HISTORY = 8;

interface SearchHistoryState {
  history: string[];
  add: (keyword: string) => void;
  remove: (keyword: string) => void;
}

export const useSearchHistoryStore = create<SearchHistoryState>()(
  persist(
    (set, get) => ({
      history: [],
      add: (keyword) => {
        const filtered = get().history.filter((k) => k !== keyword);
        set({ history: [keyword, ...filtered].slice(0, MAX_HISTORY) });
      },
      remove: (keyword) => {
        set({ history: get().history.filter((k) => k !== keyword) });
      },
    }),
    { name: "search-history" }
  )
);
