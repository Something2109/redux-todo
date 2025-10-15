import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/header";
import routes from "./routes";
import { Suspense } from "react";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main className="h-screen dark:bg-gray-700 dark:text-white">
        <Switch>
          <Suspense fallback={<div>Loading...</div>}>
            {routes.map(({ Component, ...route }, index) => (
              <Route key={(route.path as string) ?? index} {...route}>
                <Component />
              </Route>
            ))}
          </Suspense>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
