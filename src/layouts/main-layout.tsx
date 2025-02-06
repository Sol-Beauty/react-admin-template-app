import { Outlet } from "react-router";
import clsx from "clsx";
import { Button } from "primereact/button";

import { HeaderMain } from "~/layouts/components/header-main";
import { BreadcrumbNav } from "~/layouts/components/header-main/breadcrumb-nav";
import { SidebarDrawer } from "~/layouts/components/sidebar-drawer";
import { SidebarMenu } from "~/layouts/components/sidebar-menu";

import { useOpener } from "~/core/hooks";

/** Default layout for project modules */
export function MainLayout() {
  const { isOpen, toggleOpen } = useOpener();

  return (
    <div className="flex h-[100dvh] w-full overflow-y-hidden">
      <SidebarDrawer
        visible={isOpen}
        toggleVisible={toggleOpen}
        className="border-y-0 border-l-0"
      />
      <SidebarMenu
        className={clsx(
          "p-card border-surface-200 z-50 hidden w-16 rounded-none border-r shadow-none sm:block",
        )}
        key="sidebar-menu"
      />
      <div className="flex w-full flex-col sm:w-[calc(100%-4rem)]">
        <HeaderMain
          className="p-card border-surface-200 z-10 rounded-none border-b shadow-none"
          key={"header-main"}
        >
          <Button
            icon="ph ph-sidebar text-lg"
            className="aspect-square"
            onClick={toggleOpen}
          />
          <BreadcrumbNav className="max-sm:hidden" />
        </HeaderMain>
        <main className="bg-surface-ground flex h-full flex-col overflow-x-hidden overflow-y-scroll p-4 pr-2 sm:p-6 sm:pr-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
