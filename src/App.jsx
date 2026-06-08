import { Provider } from "react-redux";
import Body from "./components/Body";
import appStore from "./utils/store";
import { createBrowserRouter, RouterProvider } from "react-router";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";
import Demo from "./components/Demo";

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        {
          path: "/",
          element: <MainContainer />,
        },
        {
          path: "watch",
          element: <WatchPage />,
        },
        {
          path: "demo",
          element: <Demo />,
        },
      ],
    },
  ]);
  return (
    <Provider store={appStore}>
      <div>
        <RouterProvider router={appRouter} />
        {/* 
  Header
  Body
    Sidebar
      MenuItems
    MainContainer
      ButtonsList
      VideoContainer
        VideoCard
  */}
      </div>
    </Provider>
  );
};

export default App;
