import { NavLink } from "react-router-dom";

const MENUS = [
  { to: "/search", label: "도서 검색" },
  { to: "/wishlist", label: "내가 찜한 책" },
];

export default function Header() {
  return (
    <header className="bg-white">
      <div className="relative flex items-center py-6.75 px-10">
        <h1 className="font-title1 text-text-primary">CERTICOS BOOKS</h1>
        <nav className="absolute left-1/2 -translate-x-1/2 flex gap-14">
          {MENUS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `font-body1 text-text-primary pb-2 ${
                  isActive ? "border-b-2 border-primary" : ""
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
