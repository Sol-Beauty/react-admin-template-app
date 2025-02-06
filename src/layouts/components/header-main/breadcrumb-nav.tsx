import { useTranslation } from "react-i18next";
import {
  isRouteErrorResponse,
  NavLink,
  useMatches,
  useRouteError,
  type UIMatch,
} from "react-router";
import clsx from "clsx";
import { BreadCrumb } from "primereact/breadcrumb";

export function BreadcrumbNav({ className }: BreadcrumbNavProps) {
  const { t } = useTranslation();

  const matches = useMatches();
  const error = useRouteError();
  const currentRoute = matches[matches.length - 1] as UIMatch<
    unknown,
    UIMatchHandle
  >;

  const matchTemplate = (
    item: UIMatch<{ meta: { title: string } }, UIMatchHandle>,
  ) => {
    if (item?.pathname && currentRoute?.id !== item?.id) {
      return (
        <NavLink to={item.pathname} className="group flex items-center gap-2">
          <i className={clsx(item.handle?.icon, "ph-bold")} />
          <span className="group-hover:underline">
            {item.data?.meta?.title}
          </span>
        </NavLink>
      );
    }

    if (isRouteErrorResponse(error)) {
      return (
        <span className="group flex items-center gap-2">
          <i className="ph ph-x" />
          <span>{t(`statusCodes:${error.status}.short`)}</span>
        </span>
      );
    }

    return (
      <span className="group flex items-center gap-2">
        <i className={clsx(item.handle?.icon, "ph-bold")} />
        <span>{item.data?.meta?.title}</span>
      </span>
    );
  };

  // @ts-expect-error Obviously a route match doesn't have a template attrib, but we need it easily
  matches.forEach((match) => (match.template = matchTemplate));

  return (
    <BreadCrumb
      model={matches.slice(1)}
      pt={{ root: { className: "flex items-center p-0 overflow-hidden" } }}
      className={clsx(className, "border-0 bg-transparent")}
    />
  );
}

type BreadcrumbNavProps = {
  className?: string;
};

type UIMatchHandle = {
  title?: string;
  navTitle_i18n?: string;
  icon?: string;
};
