import { useTranslation } from "react-i18next";
import {
  isRouteErrorResponse,
  Link,
  Outlet,
  useNavigate,
  useRouteError,
} from "react-router";
import { getFixedT } from "i18next";
import { Button } from "primereact/button";

import { ViewLayout } from "~/core/components";

// import i18nextServer from "~/config/i18next.server";
import { HttpStatusCode } from "~/core/constants/fetch";
import { MainLayout } from "~/layouts/main-layout";
import { getUserLocalePreference } from "~/layouts/utils/locales";

//import { checkLogin } from "~/modules/user/api";

export function clientLoader() {
  const { language } = getUserLocalePreference();
  const t = getFixedT(language);

  // const { pathname: nextRoute } = new URL(request.url);
  //
  // const user = session.get("user");
  //
  // // If user has no token, redirect show login page
  // if (!token) {
  //   return redirect(`/auth/login?redirect=${nextRoute}`);
  // }

  // If  there's no user in session but token, check if token is valid and set user in session
  // if (!user) {
  //   try {
  //     // Try to get user by token
  //     const freshUser = await checkLogin({ token });
  //     session.set("user", freshUser);
  //
  //     // If token is valid and user is found, set user in session
  //     const headers = new Headers();
  //     headers.append("Set-Cookie", await session.commit());
  //
  //     // Return the requested page data
  //     return json({ meta: { title: t("router:home") } }, { headers });
  //   } catch (e) {
  //     // If token is invalid, remove user object from session
  //     session.unset("user");
  //     const headers = new Headers();
  //     headers.append("Set-Cookie", await session.commit());
  //
  //     // And redirect to login page with the requested route as query param
  //     return redirect(`/auth/login?redirect=${nextRoute}`, { headers });
  //   }
  // }

  // If it has token and user in session, return the requested page data without check
  // In case the token is invalid, any request to the server will be redirected to login page
  return { meta: { title: t("router:home") } };
}

export default function Component() {
  // const { user } = useRootLoaderData();
  // const { revalidate } = useRevalidator();

  // useEffect(() => {
  //   if (!user) revalidate().then();
  // }, []);

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const { t } = useTranslation();
  const navigate = useNavigate();

  console.error(error);

  const finalErrorStatus = isRouteErrorResponse(error)
    ? error.status
    : HttpStatusCode.INTERNAL_SERVER_ERROR;

  const finalErrorStatusText = isRouteErrorResponse(error)
    ? t(`statusCodes:${error.status}.large`)
    : t("dialogs.unexpectedError");

  return (
    <MainLayout>
      <ViewLayout
        title={
          isRouteErrorResponse(error)
            ? t(`statusCodes:${error.status}.short`)
            : t("dialogs.unexpectedError")
        }
      >
        <ViewLayout.Section>
          <div className="flex h-[40vh] w-full flex-col items-center justify-center gap-6">
            <div className="flex w-[64rem] max-w-full flex-col items-center px-4 text-center">
              <span className="text-7xl font-medium sm:text-9xl">
                {finalErrorStatus}
              </span>
              <span className="sm:text-lg">{finalErrorStatusText}</span>
            </div>
            <div className="flex gap-1">
              <Button
                severity="secondary"
                icon="ph ph-arrow-left"
                onClick={() => navigate(-1)}
              />
              <Link to="/">
                <Button
                  severity="secondary"
                  label={t("actions.backToHome")}
                  icon="ph ph-house"
                />
              </Link>
            </div>
          </div>
        </ViewLayout.Section>
      </ViewLayout>
    </MainLayout>
  );
}

export const handle = {
  icon: "ph ph-house",
};

// export const meta: MetaFunction<typeof loader> = ({ data }) => {
//   return parseRouteMeta(data);
// };

export const shouldRevalidate = () => false;
