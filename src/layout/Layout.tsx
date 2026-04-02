import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="min-w-270">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
