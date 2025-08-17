import RouteLayout from "./layout/RouteLayout";
import MoviesPage from "./pages/MoviesPage";
import SeriesPage from "./pages/SeriesPage";
import "./App.css";
import HomePage from "./pages/HomePage";
import { createBrowserRouter, Router, RouterProvider } from "react-router";
import Details from "./pages/Details";
import seriesLayout from "./layout/seriesLayout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: RouteLayout,
      children: [
        {
          path: "/",
          Component: HomePage,
        },
        {
          path: "movies",
          Component: MoviesPage,
        },
        {
          path: "series",
          Component: seriesLayout,
          children:[
            {
              index: true,
              Component: SeriesPage,
            },
            {
              path: ":id",
              Component: Details
            }
          ]
        },
      ],
    },
  ]);
  return (
   <RouterProvider router={router}/>
  );
}

export default App;
