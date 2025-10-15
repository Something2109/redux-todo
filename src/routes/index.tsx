import { lazy, type ComponentType, type LazyExoticComponent } from "react";
import type { RouteProps } from "react-router-dom";

type RouteObject = RouteProps & {
  Component: LazyExoticComponent<ComponentType<any>>; //eslint-disable-line @typescript-eslint/no-explicit-any
};

const routes: RouteObject[] = [
  {
    path: "/",
    exact: true,
    Component: lazy(() => import("../pages/Home")),
  },
];

export default routes;
