import EmptyResult from "@/components/EmptyResult";
import BookList from "@/components/BookList";
import { useWishlistStore } from "@/stores/useWishlistStore";

export default function WishlistPage() {
  const { books } = useWishlistStore();

  return (
    <div className="flex justify-center">
      <div className="w-[1024px] pt-[104px]">
        <h2 className="font-title2 text-text-primary">내가 찜한 책</h2>

        <div className="flex items-center gap-4 mt-9">
          <span className="font-body3 text-text-primary">찜한 책</span>
          <span className="font-body3 text-text-primary">
            총 <span className="text-primary">{books.length}</span>건
          </span>
        </div>

        {books.length > 0 ? (
          <div className="mt-6">
            <BookList books={books} />
          </div>
        ) : (
          <EmptyResult message="찜한 책이 없습니다." />
        )}
      </div>
    </div>
  );
}
