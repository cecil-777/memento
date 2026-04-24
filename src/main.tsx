import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import '@/index.css'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { DashboardPage } from '@/pages/DashboardPage'
import { CapturePage } from '@/pages/CapturePage'
import { DistillPage } from '@/pages/DistillPage'
import { SettingsPage } from '@/pages/SettingsPage'
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary'
const LayoutWrapper = () => (
  <MobileLayout>
    <Outlet />
  </MobileLayout>
);
const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWrapper />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: "/", element: <DashboardPage /> },
      { path: "/capture", element: <CapturePage /> },
      { path: "/distill", element: <DistillPage /> },
      { path: "/tree", element: <div className="p-8"><h1>Knowledge Tree</h1><p className="mt-4 text-muted">A structured view of your silver items will appear here.</p></div> },
      { path: "/settings", element: <SettingsPage /> },
    ]
  },
]);
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)