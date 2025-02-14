import { createHashRouter, redirect, RouteObject } from "react-router";

import Root, {
  ErrorBoundary as RootErrorBoundary,
  HydrateFallback as RootHydrateFallback,
  loader as rootLoader,
  shouldRevalidate as rootShouldRevalidate,
} from "~/root.tsx";

import { HttpStatusCode } from "~/core/constants/fetch.ts";
import MainLayout, {
  ErrorBoundary as MainLayoutErrorBoundary,
  loader as mainLayoutLoader,
} from "~/layouts/main-layout.tsx";
import dashboardRoutes from "~/modules/dashboard/routes.tsx";
import shapesRoutes from "~/modules/shapes/routes.tsx";
import authRoutes from "~/modules/user/auth-routes.tsx";

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
    throw new Response(null, { status: HttpStatusCode.NOT_FOUND });
  },
};

const router = createHashRouter([
  {
    id: "root",
    path: "/",
    element: <Root />,
    loader: rootLoader,
    shouldRevalidate: rootShouldRevalidate,
    hydrateFallbackElement: <RootHydrateFallback />,
    errorElement: <RootErrorBoundary />,
    children: [
      indexCatchRoute,
      authRoutes,
      {
        id: "tools",
        path: "tools",
        handle: {
          icon: "ph-house",
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
