import { createRoot } from "react-dom/client";

import "./styles/index.css";

import { BrowserRouter, Route, Routes } from "react-router";

import Root from "./root.tsx";

const root = document.getElementById("root");

createRoot(root!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Root />} />
    </Routes>
  </BrowserRouter>,
);
