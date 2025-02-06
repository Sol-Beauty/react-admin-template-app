import { PROJECT_NAME } from "~/core/constants/brand";

export function parseRouteMeta({ meta }: parseRouteMetaArgs = {}) {
  if (!meta) return [];

  return [
    {
      title: meta?.title ? `${meta?.title} | ${PROJECT_NAME}` : PROJECT_NAME,
    },
  ];
}

type parseRouteMetaArgs = {
  meta?: {
    title?: string;
  };
};
