import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";

const SearchPage = lazy(() => import("./pages/search"));
const WishlistPage = lazy(() => import("./pages/wishlist"));

function App() {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="*" element={<Navigate to="/search" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
