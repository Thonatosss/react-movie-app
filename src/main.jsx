import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";
import { MovieDetails } from "./pages/MovieDetails.jsx";
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/details/:movieId", element: <MovieDetails /> },
  { path: "*", element: <NotFoundPage /> },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
