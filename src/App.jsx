import RouteLayout from "./components/RouteLayout";
import MoviesPage from "./pages/MoviesPage";
import SeriesPage from "./pages/SeriesPage";
import "./App.css";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import { createBrowserRouter, Router, RouterProvider } from "react-router";

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
          Component: SeriesPage,
        },
      ],
    },
  ]);
  return (
   <RouterProvider router={router}/>
  );
}

export default App;
