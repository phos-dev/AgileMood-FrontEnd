import { Suspense } from 'react';
import DashboardClient from './dashboard-client';

// Make the dynamic route param <id> typed and compliant with Next.js 15 PageProps

export default async function DashboardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <DashboardClient teamId={parseInt(id, 10)} />
    </Suspense>
  );
}