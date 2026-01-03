import { AppShell, MantineProvider } from '@mantine/core';
import { Text, Paper } from '@mantine/core';
import { createBrowserRouter, NavLink } from "react-router";
import { RouterProvider } from "react-router/dom";
import { convertSolar2Lunar, convertLunar2Solar } from './utils/lunar.js'
import '@mantine/core/styles.css';
import { HomePage } from './pages/HomePage.tsx';
import { AddPage } from './pages/AddPage.tsx';
import { ActionIcon } from '@mantine/core';
import { Plus } from 'lucide-react';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/add",
    element: <AddPage />

  }
])



export default function App() {

  const test = () => {
    console.log("Test");
    console.log(convertLunar2Solar(19, 1, 2024, 0, 7));

    console.log(convertLunar2Solar(25, 11, 2023, 0, 7));

    console.log(convertLunar2Solar(25, 11, 2025, 0, 7));
  }

  return (
    <MantineProvider>
      <AppShell header={{ height: 60 }} padding="md">
        <AppShell.Header>
          <div>My App</div>
          <NavLink to="/add">
            <ActionIcon variant="filled" size="lg" color="blue">
              <Plus size={18} />
            </ActionIcon>
          </NavLink>
        </AppShell.Header>
        {/* <RouterProvider router={router} /> */}
      </AppShell>

    </MantineProvider>
  )




}