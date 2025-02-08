import { createHashRouter, redirect, RouteObject } from "react-router";

import Root, {
  loader as rootLoader,
  shouldRevalidate as rootShouldRevalidate,
} from "~/root.tsx";

import MainLayout, {
  ErrorBoundary as MainLayoutErrorBoundary,
  loader as mainLayoutLoader,
} from "~/layouts/main-layout.tsx";
import dashboardRoutes from "~/modules/dashboard/routes.tsx";
import shapesRoutes from "~/modules/shapes/routes.tsx";

const indexCatchRoute: RouteObject = {
  id: "index",
  path: "/",
  index: true,
  loader: () => redirect("/tools"),
};

const toolsCatchRoute: RouteObject = {
  id: "tools.index",
  path: "",
  index: true,
  loader: () => redirect("/tools/dashboard"),
};

const fallbackRoute: RouteObject = {
  id: "tools.$",
  path: "*",
  handle: {
    title: "Error",
  },
  loader: () => {
    throw new Response(null, { status: 404 });
  },
};

const router = createHashRouter([
  {
    id: "root",
    path: "/",
    element: <Root />,
    loader: rootLoader,
    shouldRevalidate: rootShouldRevalidate,
    children: [
      indexCatchRoute,
      {
        id: "tools",
        path: "tools",
        handle: {
          icon: "ph ph-house",
        },
        element: <MainLayout />,
        errorElement: <MainLayoutErrorBoundary />,
        loader: mainLayoutLoader,
        children: [
          toolsCatchRoute,
          fallbackRoute,
          dashboardRoutes,
          shapesRoutes,
        ],
      },
    ],
  },
]);

export default router;
