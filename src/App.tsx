import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Suspense } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import Header from "./components/header";
import Loading from "./components/loading";
import routes from "./routes";
import LanguageProvider from "./lang/provider";

function App() {
  return (
    <PersistGate persistor={persistor} loading={<Loading />}>
      <ReduxProvider store={store}>
        <LanguageProvider>
          <BrowserRouter>
            <Header />

            <main className="h-screen dark:bg-gray-700 dark:text-white">
              <Switch>
                <Suspense fallback={<Loading />}>
                  {routes.map(({ Component, ...route }, index) => (
                    <Route key={(route.path as string) ?? index} {...route}>
                      <Component />
                    </Route>
                  ))}
                </Suspense>
              </Switch>
            </main>
          </BrowserRouter>
        </LanguageProvider>
      </ReduxProvider>
    </PersistGate>
  );
}

export default App;
