import bookImage from "../images/icon_book.png";

export default function EmptyResult({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center pt-[120px]">
      <img src={bookImage} alt={message} className="w-20 h-20" />
      <p className="font-body3 text-text-subtitle mt-6">{message}</p>
    </div>
  );
}
