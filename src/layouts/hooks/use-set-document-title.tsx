import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { UIMatch, useMatches } from "react-router";

import { PROJECT_NAME } from "~/core/constants/brand.ts";
import type { UIMatchData, UIMatchHandle } from "~/layouts/types.ts";

export function useSetDocumentTitle() {
  const { t, i18n } = useTranslation();
  const routes = useMatches();

  useEffect(() => {
    const currentRoute = routes[routes.length - 1] as UIMatch<
      UIMatchData,
      UIMatchHandle
    >;
    let title;

    if (currentRoute.data?.meta?.title) {
      title = `${currentRoute.data.meta.title} | ${PROJECT_NAME}`;
    } else if (currentRoute.handle?.title) {
      title = `${currentRoute.handle?.title} | ${PROJECT_NAME}`;
    } else if (currentRoute?.id) {
      title = `${t("router:" + currentRoute.id)} | ${PROJECT_NAME}`;
    } else {
      title = PROJECT_NAME;
    }

    document.title = title;
  }, [routes, i18n.language]);
}
