import TeamPageClient from "./team-page-client";

interface TeamPageProps {
  params: Promise<{ id: string }>;
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { id } = await params;
  return <TeamPageClient teamId={Number(id)} />;
} 