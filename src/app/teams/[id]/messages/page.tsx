import { Metadata } from "next";
import MessagesPageClient from "./messages-page-client";

export const metadata: Metadata = {
  title: "Mensagens do Time | AgileMood",
  description: "Visualize as mensagens do seu time",
};

interface MessagesPageProps {
  params: Promise<{ id: string }>;
}

export default async function MessagesPage({ params }: MessagesPageProps) {
  const { id } = await params;
  return (
    <div>
      <MessagesPageClient teamId={parseInt(id, 10)} />
    </div>
  );
} 