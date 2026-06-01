"use client";

import Sidebar from "@/components/ui/sidebar";
import ProtectedRoute from "@/components/ui/protected-route";
import IntegrationsWizard from "./_components/integrations-wizard";

export default function IntegrationsPage() {
  return (
    <ProtectedRoute>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 p-6 overflow-auto">
          <IntegrationsWizard />
        </div>
      </div>
    </ProtectedRoute>
  );
}
