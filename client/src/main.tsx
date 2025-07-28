import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import SkinsListGrid from "./components/SkinsListGrid.tsx";

import CustomLayout from "./layouts/main.tsx";
import HomeView from "./views/HomeView.tsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<CustomLayout />}>
        <Route index element={<HomeView />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
