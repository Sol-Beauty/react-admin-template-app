import { useTranslation } from "react-i18next";
import type { MenuItem } from "primereact/menuitem";

/** Main menu as a hook to manage translations and other reactive states of menu */
export function useMenu(): Array<ExtendedMenuItem> {
  const { t } = useTranslation();

  return [
    {
      label: t("router:dashboard"),
      icon: "ph ph-chart-donut",
      url: "/tools/dashboard",
    },
    {
      label: t("router:shapes.index"),
      icon: "ph ph-shapes",
      url: "/tools/shapes",
    },
    {
      label: t("router:coupons.index"),
      icon: "ph ph-ticket",
      url: "/tools/coupons",
    },
  ];
}

export type ExtendedMenuItem = MenuItem & {
  permissions?: Array<string>;
  items?: Array<ExtendedMenuItem>;
};
