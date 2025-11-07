import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"

// Pages
import DefaultPage from "./App.tsx"
import Page404 from "./pages/404.tsx"
import Home from "./pages/Home.tsx"
import Shop from "./pages/Shop.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultPage></DefaultPage>,
    errorElement: <Page404 />,
    children: [
      {
        path: "*",
        element: <Page404></Page404>,
      },
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: `/shop`,
        element: <Shop></Shop>,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
