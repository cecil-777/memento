import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import '@/index.css'
import LayoutWrapper from '@/components/layout/LayoutWrapper'
import { DashboardPage } from '@/pages/DashboardPage'
import { CapturePage } from '@/pages/CapturePage'
import { DistillPage } from '@/pages/DistillPage'
import { KnowledgeTreePage } from '@/pages/KnowledgeTreePage'
import { SettingsPage } from '@/pages/SettingsPage'
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary'
import { Toaster } from 'sonner'
const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWrapper />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: "/", element: <DashboardPage /> },
      { path: "/capture", element: <CapturePage /> },
      { path: "/distill", element: <DistillPage /> },
      { path: "/tree", element: <KnowledgeTreePage /> },
      { path: "/settings", element: <SettingsPage /> },
    ]
  },
]);
declare global {
  interface Window {
    __reactRoot?: ReturnType<typeof createRoot>;
  }
}
const container = document.getElementById('root');
if (!container) {
  console.error('Fatal: Root container not found');
} else {
  if (window.__reactRoot) {
    window.__reactRoot.render(
      <React.StrictMode>
        <RouterProvider router={router} />
        <Toaster richColors position="top-center" closeButton />
      </React.StrictMode>
    );
  } else {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <RouterProvider router={router} />
        <Toaster richColors position="top-center" closeButton />
      </React.StrictMode>
    );
    window.__reactRoot = root;
  }
}