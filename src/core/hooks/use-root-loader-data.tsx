import { useRouteLoaderData } from "react-router";

import { type RootLoader } from "~/root";

/** Get the root loader data
 * Return root loader data as a non-nullable type because is supposed to be always available due `LayoutDefault` component only being rendered when the root loader is resolved
 * */
export function useRootLoaderData() {
  const data = useRouteLoaderData<RootLoader>("root");
  return data as NonNullable<typeof data>;
}
