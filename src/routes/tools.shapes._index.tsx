import { type MetaFunction } from "react-router";
import { getFixedT } from "i18next";

import { ContentItemsProvider } from "~/core/context/content-items-provider";
import { ContentOptionsProvider } from "~/core/context/content-options-provider";
import { TheContent, ViewLayout } from "~/core/components";
import { ShapeActions } from "~/modules/shapes/components/shape-actions";
import { ShapeValueExtendedCell } from "~/modules/shapes/components/shape-value-extended-cell";
import { ShapesActions } from "~/modules/shapes/components/shapes-actions";

import { parseRouteMeta } from "~/core/utils/router";
import { getUserLocalePreference } from "~/layouts/utils/locales";
import { getShapesList } from "~/modules/shapes/api";
import {
  defaultListableShapesColumns,
  shapesFiltersConfigs,
  shapesTableColumns,
} from "~/modules/shapes/data";

export const handle = {
  icon: "ph ph-shapes",
};

export const meta: MetaFunction<typeof clientLoader> = ({ data }) => {
  return parseRouteMeta(data);
};

export function clientLoader() {
  const { language } = getUserLocalePreference();
  const t = getFixedT(language);

  return { meta: { title: t("router:shapes.index") } };
}

export default function Component() {
  return (
    <ContentOptionsProvider
      viewName="shapes"
      filtersConfig={shapesFiltersConfigs}
      columnsConfig={shapesTableColumns}
      defaultListableColumns={defaultListableShapesColumns}
    >
      <ContentItemsProvider itemsListGetter={getShapesList}>
        <ViewLayout actionsSlot={<ShapesActions />}>
          <ViewLayout.Section>
            <TheContent<Shape>
              selectable
              i18nNamespace="shapes"
              itemActionsSlot={({ item }) => (
                <ShapeActions item={item} className="flex gap-1" />
              )}
              valueExtendedCellSlot={(props) => (
                <ShapeValueExtendedCell {...props} />
              )}
            />
          </ViewLayout.Section>
        </ViewLayout>
      </ContentItemsProvider>
    </ContentOptionsProvider>
  );
}
