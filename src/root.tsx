import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Outlet,
  ShouldRevalidateFunctionArgs,
  useRouteLoaderData,
} from "react-router";
import { PrimeReactProvider } from "primereact/api";
import { ConfirmDialog } from "primereact/confirmdialog";

import { LayoutProvider } from "~/layouts/context/layout-provider.tsx";
import { ToastProvider } from "~/layouts/context/toast-provider.tsx";

import { useSetDocumentTitle } from "~/layouts/hooks/use-set-document-title.tsx";
import {
  getUserLocalePreference,
  setLocaleInDocument,
} from "~/layouts/utils/locales.ts";
import {
  getUserThemePreference,
  setThemeInDocument,
} from "~/layouts/utils/themes.ts";
import {
  getUserUiScalePreference,
  setUiScaleInDocument,
} from "~/layouts/utils/ui-scale.ts";

/** Avoid unnecessary root revalidations if not needed */
export const shouldRevalidate = ({
  formMethod,
  currentUrl,
  nextUrl,
}: ShouldRevalidateFunctionArgs) => {
  if (formMethod && formMethod !== "GET") {
    return true;
  }
  return currentUrl.toString() === nextUrl.toString();
};

export function loader() {
  const user = {};
  const selectedTheme = getUserThemePreference();
  const selectedLocale = getUserLocalePreference();
  const selectedUiScale = getUserUiScalePreference();

  setThemeInDocument(selectedTheme);
  setLocaleInDocument(selectedLocale);
  setUiScaleInDocument(selectedUiScale);

  return {
    user,
    selectedLocale,
    selectedTheme,
    selectedUiScale,
  };
}

export default function Root() {
  const rootData = useRouteLoaderData("root");
  const { i18n } = useTranslation();

  useSetDocumentTitle();

  useEffect(() => {
    i18n.changeLanguage(rootData?.selectedLocale.key).then();
  }, [rootData?.selectedLocale.key]);

  return (
    <PrimeReactProvider>
      <LayoutProvider
        locale={rootData.selectedLocale}
        theme={rootData.selectedTheme}
        scale={rootData.selectedUiScale}
      >
        <ToastProvider>
          <Outlet />
        </ToastProvider>
      </LayoutProvider>
      <ConfirmDialog />
    </PrimeReactProvider>
  );
}

export type RootLoader = typeof loader;
