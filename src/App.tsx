import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Suspense } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import Header from "./components/header";
import routes from "./routes";

function App() {
  return (
    <PersistGate persistor={persistor} loading={<span>Loading...</span>}>
      <ReduxProvider store={store}>
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
      </ReduxProvider>
    </PersistGate>
  );
}

export default App;
