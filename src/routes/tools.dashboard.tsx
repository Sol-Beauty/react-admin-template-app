import { type MetaFunction } from "react-router";
import { getFixedT } from "i18next";

import { ViewLayout } from "~/core/components/view-layout";

import { parseRouteMeta } from "~/core/utils/router";
import { getUserLocalePreference } from "~/layouts/utils/locales";

export const handle = {
  icon: "ph ph-chart-donut",
};

export const meta: MetaFunction<typeof clientLoader> = ({ data }) => {
  return parseRouteMeta(data);
};

export async function clientLoader() {
  const { language } = getUserLocalePreference();
  const t = getFixedT(language);

  return { meta: { title: t("router:dashboard") } };
}

export default function Component() {
  return (
    <ViewLayout>
      <ViewLayout.Section>{"Dashboard"}</ViewLayout.Section>
    </ViewLayout>
  );
}
