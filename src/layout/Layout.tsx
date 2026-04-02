import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="min-w-270">
      <Header />
      <main className="pb-25">
        <Outlet />
      </main>
    </div>
  );
}
