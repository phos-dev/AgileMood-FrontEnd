import { Metadata } from "next";
import ManageEmotionsClient from "./manage-emotions-client";

export const metadata: Metadata = {
  title: "Gerenciar Emoções do Time | AgileMood",
  description: "Selecione as emoções que serão utilizadas pelo seu time",
};

export default async function ManageEmotionsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ManageEmotionsClient teamId={parseInt(id)} />;
} 