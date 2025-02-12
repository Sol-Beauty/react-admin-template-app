import { ReactNode } from "react";
import { Outlet } from "react-router";

import { HeaderMain } from "~/layouts/components/header-main.tsx";

export default function AuthLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="bg-surface-ground relative flex h-[100dvh] w-screen items-center justify-center">
      <HeaderMain className="animate-fade-down fixed top-0 w-full" />
      {children ?? <Outlet />}
    </div>
  );
}
