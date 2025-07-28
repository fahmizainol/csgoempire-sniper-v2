import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.tsx";
import CustomLayout from "./layouts/main.tsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<CustomLayout />}>
        <Route index element={<App />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
