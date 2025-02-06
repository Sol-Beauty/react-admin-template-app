import { createRoot } from "react-dom/client";

import "~/config/i18n.ts";
import "~/styles/app.css";
import "~/styles/tailwind.css";
import "@phosphor-icons/web/thin/style.css";
import "@phosphor-icons/web/light/style.css";
import "@phosphor-icons/web/bold/style.css";
import "@phosphor-icons/web/regular/style.css";
import "@phosphor-icons/web/duotone/style.css";

import { createHashRouter, RouterProvider } from "react-router";

import Root, { loader as rootLoader } from "~/root.tsx";

import { MainLayout } from "~/layouts/main-layout.tsx";

const root = document.getElementById("root");

const router = createHashRouter([
  {
    id: "root",
    path: "/",
    element: <Root />,
    loader: rootLoader,
    children: [{ id: "tools", path: "tools", element: <MainLayout /> }],
  },
]);

createRoot(root!).render(<RouterProvider router={router} />);
