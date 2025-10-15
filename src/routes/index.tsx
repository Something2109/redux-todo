import { lazy, type ComponentType, type LazyExoticComponent } from "react";
import type { RouteProps } from "react-router-dom";

type RouteObject = RouteProps<string> & {
  path: string;
  prefix: string;
  Component: LazyExoticComponent<ComponentType<any>>; //eslint-disable-line @typescript-eslint/no-explicit-any
};

const routes: RouteObject[] = [
  {
    path: "/",
    exact: true,
    prefix: "home",
    Component: lazy(() => import("../pages/Home")),
  },
];

export default routes;
export type { RouteObject };
