import { createBrowserRouter, NavLink } from "react-router";
import { RouterProvider } from "react-router/dom";
import { convertSolar2Lunar, convertLunar2Solar } from "./utils/lunar.js";
import { HomePage } from "./pages/HomePage.tsx";
import { AddPage } from "./pages/AddPage.tsx";
import { SharedLayout } from "./pages/Layout.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <SharedLayout />, // Parent layout with Header
        children: [
            {
                index: true, // Matches "/"
                element: <HomePage />
            },
            {
                path: "add", // Matches "/add"
                element: <AddPage />
            }
        ]
    }
]);

export default function App() {
    return <RouterProvider router={router} />;
}
